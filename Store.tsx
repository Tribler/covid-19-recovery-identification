import { useState, useCallback } from 'react'
import { createContainer } from "react-tracked";
import UpdateID from "./network/UpdateID";
import produce, { Draft } from "immer";

/*
The store contains all data types and functions related to the global state of the React app, it defines what the global state contains and what the initial value is
*/

type State = {
    loggedIn: boolean
    ID: string
    attester: boolean
    serverURL: string
    darkMode: boolean
}

type Certificate = {
    creatorID: string
    holderID: string
    type: string
}

type OutstandingRequest = {
    creatorID: string
    type: string
}

var defaultState: State = {
    loggedIn: true,
    attester: true,
    ID: "0",
    serverURL: "http://localhost:8085",
    darkMode: false
}

UpdateID(defaultState)

const useValue = () => useState(defaultState);

const { Provider, useTrackedState, useUpdate } = createContainer(useValue);

const useSetDraft = () => {
    const setState = useUpdate();
    return useCallback(
        (draftUpdater: (draft: Draft<State>) => void) => {
            setState(produce(draftUpdater));
        },
        [setState]
    );
};

export { Certificate, State, OutstandingRequest };
export { Provider, useTrackedState, useSetDraft };
