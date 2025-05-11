import Loader from './components/Loader';
import useInitiateUser from './hooks/useInitiateUser';
import { useUserQuery } from './hooks/useUserQuery';
import Home from './pages/Home';
import Login from './pages/Login';
import { useUserStore } from './store/userStore';

const App = () => {
  const session = useUserStore((state) => state.session);

  const { data: userInstance, isLoading } = useUserQuery();
  useInitiateUser(userInstance ?? null);

  if (isLoading) {
    return <Loader />;
  }

  return session ? <Home /> : <Login />;
};

export default App;
