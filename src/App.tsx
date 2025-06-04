import Loader from './components/Loader';
import { useUserQuery } from './hooks/query/useUserQuery';
import { useInitiateUser } from './hooks/useInitiateUser';
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
