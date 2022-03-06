import { useCallback, useEffect, useRef, useState } from 'react';
import useAxyz from './useAxyz';

interface Options {
  skip?: boolean;
}
const useCheckEntitlement = (entitlement: string, { skip }: Options) => {
  const axys = useAxyz();

  const [loading, setLoading] = useState(true);
  const complete = useRef(false);
  const error = useRef<Error | undefined>(undefined);
  const [entitled, setEntitled] = useState(false);

  useEffect(() => {
    const performCheck = async () => {
      setLoading(true);
      const { isEntitled, error: e } = await axys.checkEntitlementByValue(entitlement);
      complete.current = true;
      error.current = e;
      setEntitled(!!isEntitled);
      setLoading(false);
    };

    if (!skip && !complete.current) {
      performCheck();
    }
  });

  const refetch = useCallback(() => {
    setLoading(true);
    complete.current = false;
  }, []);

  return { entitled, loading, refetch, error };
};

export default useCheckEntitlement;
