import { useCallback } from "react";
import { useSetDraft } from "../Store";

export const useToggleLogin = () => {
    const setDraft = useSetDraft();
    return useCallback(() => {
        setDraft((draft) => {
            draft.loggedIn = true;
        });
    }, [setDraft]);
};

