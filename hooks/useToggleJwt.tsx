import { useCallback } from 'react';
import { useSetDraft } from '../Store';

/**
 * Hook used to change the JWT in the store.
 * @return {Function} a call back to toggle JWT value
 */
export const useToggleJwt = () => {
  const setDraft = useSetDraft();

  return useCallback((jwt: string) => {
    setDraft((draft) => {
      draft.jwt = jwt;
    });
  }, [setDraft]);
};
