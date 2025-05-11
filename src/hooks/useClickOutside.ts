import { useEffect, useRef } from 'react';

type Handler = () => void;

export const useClickOutside = (handler: Handler) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [handler]);

  return ref;
};
