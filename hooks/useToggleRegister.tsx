import { useCallback } from 'react';
import { useSetDraft } from '../Store';
import { AsyncStorage } from 'react-native';

/**
 * Hook used to change the registered value to true in the store.
 */

const saveRegistered = async () => {
  try {
    await AsyncStorage.setItem('registered', 'true');
  } catch (error) {
    console.log('Error saving data');
    console.error(error);
  }
};

export const useToggleRegister = () => {
  const setDraft = useSetDraft();
  return useCallback(() => {
    setDraft((draft) => {
      draft.registered = true;
    });
    saveRegistered();
  }, [setDraft]);
};
