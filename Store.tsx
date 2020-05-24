import { useState } from 'react'
import { createContainer } from "react-tracked";

import GetID from "./network/GetID"


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
    ID: GetID(),
    serverURL: "localhost:14411" // TODO Check correct port.
}

const useValue = () => useState(defaultState);

const { Provider, useTrackedState } = createContainer(useValue);

export { Certificate, State };
export { Provider, useTrackedState };
