import {useCallback} from 'react';
import {useSetDraft} from '../Store';

export const useToggleLight = () => {
  const setDraft = useSetDraft();
  return useCallback(() => {
    setDraft((draft) => {
      draft.darkMode = false;
    });
  }, [setDraft]);
};
