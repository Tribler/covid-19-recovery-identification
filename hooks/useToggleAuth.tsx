import {useCallback} from 'react';
import {useSetDraft} from '../Store';

/**
 * Hook used to change the loggedIn status to true in the store.
 * @return {Function} a function that sets the loggedIn boolean to true
 */
export const useToggleLogin = () => {
  const setDraft = useSetDraft();
  return useCallback(() => {
    setDraft((draft) => {
      draft.loggedIn = true;
    });
  }, [setDraft]);
};

/**
 * Hook used to change the Lo status to true in the store.
 * @return {Function} a function that sets the loggedIn boolean to false
 */
export const useToggleLogout = () => {
  const setDraft = useSetDraft();
  return useCallback(() => {
    setDraft((draft) => {
      draft.loggedIn = false;
    });
  }, [setDraft]);
};
