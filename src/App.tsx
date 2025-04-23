import { useEffect } from 'react';

import { Session } from '@supabase/supabase-js';
import { Outlet, useNavigate } from 'react-router-dom';

import { useUserQuery } from './hooks/useUserQuery';

type AppContextType = {
  session: Session | null;
};

const App = () => {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useUserQuery();

  console.log('User:', data?.session.user.id);

  useEffect(() => {
    if (!isLoading && (isError || !data)) {
      navigate('/');
    }
  }, [isError, data, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Outlet
      context={{ session: data?.session ?? null } satisfies AppContextType}
    />
  );
};

export default App;
