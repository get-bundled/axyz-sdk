import { useEffect, useRef } from 'react';

const useUnloading = () => {
  const isUnloading = useRef(false);

  // If the window is closing or reloading, ignore disconnect and error events from the adapter
  useEffect(() => {
    const listener = () => {
      isUnloading.current = true;
    };

    window.addEventListener('beforeunload', listener);

    return () => {
      window.removeEventListener('beforeunload', listener);
    };
  }, [isUnloading]);

  return isUnloading;
};

export default useUnloading;
