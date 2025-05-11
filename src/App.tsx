import Loader from './components/Loader';
import { useInitiateUser } from './hooks/useInitiateUser';
import { useUserQuery } from './hooks/useUserQuery';
import { useUserStore } from './store/userStore';
import Home from './ui/Home';
import Login from './ui/Login';

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
