import { useCallback } from "react";
import { useSetDraft } from "../Store";

export const useToggleJwt = () => {
    const setDraft = useSetDraft();
    return useCallback((jwt: string) => {
        setDraft((draft) => {
            draft.jwt = jwt;
        });
    }, [setDraft]);
};
