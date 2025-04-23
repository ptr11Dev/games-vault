import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import { supabase } from '@/lib/supabase';

const AuthForm = () => {
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: 'rgb(99 102 241)',
            },
            borderWidths: {
              buttonBorderWidth: '0px',
              inputBorderWidth: '1px',
            },
            radii: {
              borderRadiusButton: '8px',
              buttonBorderRadius: '8px',
              inputBorderRadius: '8px',
            },
          },
        },
        className: {
          container: 'w-full space-y-4',
          divider: 'bg-border my-4',
          input: 'bg-primary-lighter border-border w-full px-4 py-2',
          label: 'text-text-secondary block mb-1',
          loader: 'text-accent',
          anchor:
            'text-accent hover:text-accent-lighter transition-colors duration-200',
        },
        style: {
          input: { color: 'white' },
        },
      }}
      providers={['google']}
      redirectTo={`${window.location.origin}/dashboard`}
    />
  );
};

export default AuthForm;
