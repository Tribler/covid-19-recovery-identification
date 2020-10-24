import {useCallback} from 'react';
import {useSetDraft} from '../Store';
import {AsyncStorage} from 'react-native';

/**
 * Hook used to change the darkmode to true in the store.
 */

const saveDarkMode = async () => {
  try {
    await AsyncStorage.setItem('darkmode_enabled', 'true');
  } catch (error) {
    console.log('Error saving data');
    console.error(error);
  }
};

const saveLightMode = async () => {
  try {
    await AsyncStorage.setItem('darkmode_enabled', 'false');
  } catch (error) {
    console.log('Error saving data');
    console.error(error);
  }
};

export const useToggleDark = () => {
  const setDraft = useSetDraft();
  return useCallback(() => {
    setDraft((draft) => {
      draft.darkMode = true;
    });
    saveDarkMode();
  }, [setDraft]);
};

export const useToggleLight = () => {
  const setDraft = useSetDraft();
  return useCallback(() => {
    setDraft((draft) => {
      draft.darkMode = false;
    });
    saveLightMode();
  }, [setDraft]);
};
