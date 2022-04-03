import { CheckEntitlementsResult } from '@axyzsdk/js';
import { useCallback, useEffect, useRef, useState } from 'react';
import useAxyz from './useAxyz';

interface Options {
  skip?: boolean;
}

interface EntitlementState extends CheckEntitlementsResult {
  loading: boolean;
}

const defaultEntitlementState: EntitlementState = {
  loading: true,
  errors: [],
  entitlements: [],
  isEntitled: false,
  isEntitledByNFT: false,
  isEntitledByMint: false,
  matchedNFTs: [],
};

const useCheckEntitlements = (entitlementsToCheck: string[], { skip }: Options = {}) => {
  const axyz = useAxyz();

  const isComputing = useRef(false);
  const complete = useRef(false);

  const [entitlement, setEntitlement] = useState(defaultEntitlementState);

  const setLoading = useCallback(() => {
    setEntitlement((currEntitlement) => ({
      ...currEntitlement,
      loading: true,
    }));
  }, []);

  useEffect(() => {
    const performCheck = async () => {
      setLoading();
      isComputing.current = true;

      const { isEntitled, errors, isEntitledByNFT, isEntitledByMint, matchedNFTs, entitlements } =
        await axyz.checkEntitlements(entitlementsToCheck);
      complete.current = true;
      isComputing.current = false;
      setEntitlement({
        entitlements,
        isEntitled,
        errors,
        isEntitledByNFT,
        isEntitledByMint,
        matchedNFTs,
        loading: false,
      });
    };

    if (!skip && !complete.current && !isComputing.current) {
      performCheck();
    }
  }, [axyz, setLoading, skip, entitlementsToCheck]);

  const refetch = useCallback(() => {
    setLoading();
    complete.current = false;
  }, [setLoading]);

  return { ...entitlement, refetch };
};

export default useCheckEntitlements;
