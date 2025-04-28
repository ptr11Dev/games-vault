import { useState } from 'react';

import AddGameModal from './AddGameModal';

const AddGameButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        onClick={() => setIsOpen(true)}
      >
        Add Game
      </button>
      {isOpen && <AddGameModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default AddGameButton;
