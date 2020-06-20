import { useCallback } from "react";
import { useSetDraft } from "../Store";

/**
 * Hook used to change the loggedIn status to true in the store.
 */
export const useToggleLogin = () => {
    const setDraft = useSetDraft();
    return useCallback(() => {
        setDraft((draft) => {
            draft.loggedIn = true;
        });
    }, [setDraft]);
};

export const useToggleLogout = () => {
    const setDraft = useSetDraft();
    return useCallback(() => {
        setDraft((draft) => {
            draft.loggedIn = false;
        });
    }, [setDraft]);
};
