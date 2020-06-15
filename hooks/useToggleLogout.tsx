import { useCallback } from "react";
import { useSetDraft } from "../Store";

/**
 * Hook used to change the loggedIn status to false in the store.
 */
export const useToggleLogout = () => {
    const setDraft = useSetDraft();
    return useCallback(() => {
        setDraft((draft) => {
            draft.loggedIn = false;
        });
    }, [setDraft]);
};