import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useUserQuery } from './hooks/useUserQuery';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const App = () => {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useUserQuery();

  console.log('User:', data?.session.user.id);

  useEffect(() => {
    if (!isLoading && isError) {
      navigate('/');
    }
  }, [isError, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const session = data?.session ?? null;

  return session ? <Dashboard /> : <Login />;
};

export default App;
