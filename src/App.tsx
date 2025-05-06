import { useEffect } from 'react';

import { useUserQuery } from './hooks/useUserQuery';
import Home from './pages/Home';
import Login from './pages/Login';
import { useUserStore } from './store/userStore';

const App = () => {
  const { data: userInstance, isLoading } = useUserQuery();
  const setUser = useUserStore((state) => state.setUser);
  const setSession = useUserStore((state) => state.setSession);
  const session = useUserStore((state) => state.session);

  useEffect(() => {
    if (userInstance?.session) {
      setUser(userInstance.session.user);
      setSession(userInstance.session);
    } else {
      setUser(null);
      setSession(null);
    }
  }, [userInstance, setUser, setSession]);

  if (isLoading) {
    return <div>Loading user info...</div>;
  }

  return session ? <Home /> : <Login />;
};

export default App;
