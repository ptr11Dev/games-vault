import AuthForm from '@/components/AuthForm';

const Login = () => {
  return (
    <div className="bg-primary flex min-h-screen flex-col items-center justify-center p-4">
      <div className="bg-primary-lighter w-[380px] rounded-[12px] p-[20px] shadow-2xl">
        <h1 className="text-text-primary mb-8 text-center text-2xl font-bold">
          Welcome Back
        </h1>
        <AuthForm />
      </div>
    </div>
  );
};

export default Login;
