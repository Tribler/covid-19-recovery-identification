import { useCallback } from "react";
import { useSetDraft } from "../Store";
import { useToggleAttester } from "./useToggleAttester";

/**
 * Hook used to change the JWT in the store.
 */
export const useToggleJwt = () => {
    const setDraft = useSetDraft();
    const updateAttester = useToggleAttester()

    return useCallback((jwt: string) => {
        setDraft((draft) => {
            draft.jwt = jwt;
            updateAttester(jwt)
        });
    }, [setDraft]);
};
