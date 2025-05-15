import AuthForm from '@/components/AuthForm';
import { TEXTS } from '@/misc/texts';

const { TITLE } = TEXTS.LOGIN;

const Login = () => {
  return (
    <div className="bg-primary flex min-h-screen flex-col items-center justify-center p-4">
      <div className="bg-lighter w-[380px] rounded-[12px] p-[20px] shadow-2xl">
        <h1 className="text-primary mb-8 text-center text-2xl font-bold">
          {TITLE}
        </h1>
        <AuthForm />
      </div>
    </div>
  );
};

export default Login;
