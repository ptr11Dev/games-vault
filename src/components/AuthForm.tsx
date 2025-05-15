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
          divider: 'bg-theme my-4',
          input: 'bg-lighter border-theme w-full px-4 py-2',
          label: 'text-secondary block mb-1',
          loader: 'text-blue-600',
          anchor:
            'text-blue-600 hover:text-blue-300 transition-colors duration-200',
        },
        style: {
          input: { color: 'var(--text-primary)' },
        },
      }}
      providers={['google']}
    />
  );
};

export default AuthForm;
