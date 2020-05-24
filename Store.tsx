import { useState } from 'react'
import { createContainer } from "react-tracked";

import UpdateID from "./network/UpdateID"


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

var defaultState: State = {
    loggedIn: true,
    attester: true,
    ID: "0",
    serverURL: "http://localhost:14411" // TODO Check correct port.
}

UpdateID(defaultState)

const useValue = () => useState(defaultState);

const { Provider, useTrackedState } = createContainer(useValue);

export { Certificate, State };
export { Provider, useTrackedState };
