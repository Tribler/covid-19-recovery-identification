import {useCallback} from 'react';
import {useSetDraft} from '../Store';
import {Base64} from 'js-base64';


/**
 * Hook used to change the darkmode to true in the store.
 */
export const useToggleAttester = () => {
  const setDraft = useSetDraft();
  return useCallback((jwt) => {
    setDraft((draft) => {
      draft.attester = getJwtPayload(jwt);
    });
  }, [setDraft]);
};

const getJwtPayload = (jwt: string) => {
  const base64Url = jwt.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const payload = JSON.parse((Base64.decode(base64)));
  const is_attester = (payload.is_attester == 'true');
  return is_attester;
};
