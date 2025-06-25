import { supabase } from '@/lib/supabase';

const AuthForm = () => {
  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleLogin}
        className="flex cursor-pointer items-center justify-center gap-3 rounded border border-gray-600 bg-[#1a1a1a] px-5 py-2 text-sm font-medium text-gray-200 shadow transition hover:bg-[#2a2a2a]"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="h-5 w-5"
        />
        Zaloguj się przez Google
      </button>
    </div>
  );
};

export default AuthForm;
