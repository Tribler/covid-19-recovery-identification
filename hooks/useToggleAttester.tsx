import {useCallback} from 'react';
import {useSetDraft} from '../Store';
import {Base64} from 'js-base64';

/**
 * Hook used to change whether the current user is an attester or not.
 * @return {Function} a call back to toggle attester value
 */
export const useToggleAttester = () => {
  const setDraft = useSetDraft();
  return useCallback(
      (jwt) => {
        setDraft((draft) => {
          draft.attester = getJwtPayload(jwt);
        });
      },
      [setDraft],
  );
};

const getJwtPayload = (jwt: string) => {
  const base64Url = jwt.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const payload = JSON.parse(Base64.decode(base64));
  const isAttester = payload.is_attester == 'true';
  return isAttester;
};
