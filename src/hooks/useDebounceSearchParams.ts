import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

export const useDebounceSearchParams = (delay: number = 500) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedParams, setDebouncedParams] = useState(searchParams);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedParams(searchParams);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [searchParams, delay]);

  return { searchParams, setSearchParams, debouncedParams };
};
