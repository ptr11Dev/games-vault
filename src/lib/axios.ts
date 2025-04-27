import axios from 'axios';

import { supabase } from '@/lib/supabase';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

axiosInstance.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
});
