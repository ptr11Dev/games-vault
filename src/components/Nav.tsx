import { useState } from 'react';

import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/store/userStore';

import AddGameModal from './AddGameModal/AddGameModal';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <header className="mb-8 flex items-center justify-between rounded-lg bg-gray-800/50 p-4 shadow-lg">
      {/* Logout button */}
      <button
        onClick={handleLogout}
        aria-label="Logout"
        className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-600 px-3 py-1.5 text-sm text-gray-400 transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
      >
        <span>Sign out</span>
        <LogOut size={16} />
      </button>
      {/* Username */}
      <span className="animated-username animate-glow bg-gradient-to-r from-[#6EFB5D] to-[#0A481E] bg-clip-text text-lg font-medium tracking-widest text-transparent">
        {user?.email?.toUpperCase().replace(/@.*$/, '')}
      </span>
      {/* Add game button */}
      <button
        className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        onClick={() => setIsOpen(true)}
      >
        Add Game
      </button>
      {/* Add game modal */}
      {isOpen && <AddGameModal onClose={() => setIsOpen(false)} />}
    </header>
  );
};

export default Nav;
