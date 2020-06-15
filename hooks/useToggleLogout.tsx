import { useCallback } from "react";
import { useSetDraft } from "../Store";

export const useToggleLogout = () => {
    const setDraft = useSetDraft();
    return useCallback(() => {
        setDraft((draft) => {
            draft.loggedIn = false;
        });
    }, [setDraft]);
};