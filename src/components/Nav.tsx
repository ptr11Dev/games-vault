import { useEffect, useState } from 'react';

import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '@/lib/supabase';
import { TEXTS } from '@/misc/texts';
import { useUserStore } from '@/store/userStore';

import AddGameModal from './AddGameModal/AddGameModal';

const { ADD_GAME_BUTTON, SIGN_OUT } = TEXTS.NAV;

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setSession = useUserStore((state) => state.setSession);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    navigate('/');
  };

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  useEffect(() => {
    handleThemeChange(currentTheme);
  }, []);

  return (
    <header className="bg-lighter mb-8 flex items-center justify-between rounded-lg p-4 shadow-lg">
      <div className="flex items-center gap-4">
        {/* Logout button */}
        <button
          onClick={handleLogout}
          aria-label="Logout"
          className="border-theme text-secondary flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
        >
          <span>{SIGN_OUT}</span>
          <LogOut size={16} />
        </button>
        {/* Theme selector */}
        <select
          value={currentTheme}
          onChange={(e) => handleThemeChange(e.target.value)}
          className="border-theme bg-lighter text-secondary rounded-md border px-3 py-1.5 text-sm"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="cyberpunk">Cyberpunk</option>
          <option value="forest">Forest</option>
        </select>
      </div>
      {/* Username */}
      <span
        className="animated-username animate-glow bg-gradient-to-r text-lg font-medium tracking-widest text-transparent"
        style={{
          backgroundImage: `linear-gradient(to right, var(--username-gradient-from), var(--username-gradient-to))`,
        }}
      >
        {user?.email?.toUpperCase().replace(/@.*$/, '')}
      </span>
      {/* Add game button */}
      <button
        className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        onClick={() => setIsOpen(true)}
      >
        {ADD_GAME_BUTTON}
      </button>
      {/* Add game modal */}
      {isOpen && <AddGameModal onClose={() => setIsOpen(false)} />}
    </header>
  );
};

export default Nav;
