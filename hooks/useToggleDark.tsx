import { useCallback } from "react";
import { useSetDraft } from "../Store";

export const useToggleDark = () => {
    const setDraft = useSetDraft();
    return useCallback(() => {
        setDraft((draft) => {
            draft.darkMode = !draft.darkMode;
        });
    }, [setDraft]);
};