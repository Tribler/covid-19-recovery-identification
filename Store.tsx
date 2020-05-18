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
    holderID: string //the question mark makes this property optional, 
    type: string
}

const defaultState: State = {
    loggedIn: false,
    attester: true,
    ID: "0",
    serverURL: "localhost:14411"
}

const useValue = () => useState(defaultState);

const { Provider, useTrackedState } = createContainer(
    useValue
);

export { Certificate, State };
export { Provider, useTrackedState };
