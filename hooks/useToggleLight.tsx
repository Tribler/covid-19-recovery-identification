import { useCallback } from "react";
import { useSetDraft } from "../Store";

/**
 * Hook used to change the darkmode  to false in the store.
 */
export const useToggleLight = () => {
    const setDraft = useSetDraft();
    return useCallback(() => {
        setDraft((draft) => {
            draft.darkMode = false;
        });
    }, [setDraft]);
};