import { useState } from 'react'
import { createContainer } from "react-tracked";

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
    serverURL: "localhost:8085" // TODO Check correct port.
}

const useValue = () => useState(defaultState);

const { Provider, useTrackedState } = createContainer(useValue);

export { Certificate, State };
export { Provider, useTrackedState };
