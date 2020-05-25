import { useState } from 'react'
import { createContainer } from "react-tracked";

/*
The store contains all data types and functions related to the global state of the React app, it defines what the global state contains and what the initial value is
*/
type State = {
    loggedIn: boolean
    ID: string
    attester: boolean
    serverURL: string
}

type Certificate = {
    creatorID: string
    holderID: string
    type: string
}

const defaultState: State = {
    loggedIn: true,
    attester: true,
    ID: "0",
    serverURL: "localhost:14411" // TODO Check correct port.
}

const useValue = () => useState(defaultState);

const { Provider, useTrackedState } = createContainer(useValue);

export { Certificate, State };
export { Provider, useTrackedState };
