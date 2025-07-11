import axios from 'axios';

import { supabase } from '@/lib/supabase';

export const axiosInstance = axios.create({
  baseURL: window.location.href.includes('localhost')
    ? 'http://localhost:3001'
    : import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
