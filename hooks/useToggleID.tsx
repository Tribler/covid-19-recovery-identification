import {useCallback} from 'react';
import {useSetDraft} from '../Store';

/**
 * Hook used to change the ID in the store.
 */
export const useToggleID = () => {
  const setDraft = useSetDraft();
  return useCallback((ID: string) => {
    setDraft((draft) => {
      draft.ID = ID;
    });
  }, [setDraft]);
};
