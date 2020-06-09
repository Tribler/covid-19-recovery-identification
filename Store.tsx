import { useState } from 'react'
import { createContainer } from "react-tracked";
import UpdateID from "./network/UpdateID"

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
    hash?:string //only available once the data has been double attested
}

type OutstandingRequest = {
    creatorID: string
    type: string
}

var defaultState: State = {
    loggedIn: true,
    attester: true,
    ID: "0",
    serverURL: "http://localhost:8085"
}

UpdateID(defaultState)

const useValue = () => useState(defaultState);

const { Provider, useTrackedState } = createContainer(useValue);

export { Certificate, State, OutstandingRequest };
export { Provider, useTrackedState };
