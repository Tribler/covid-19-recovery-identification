import { useState } from 'react'
import { createContainer } from "react-tracked";


type State = {
    loggedIn: boolean
    ID: number
    attester:boolean
}

const defaultState : State = {
    loggedIn: true,
    attester: true,
    ID: 0
} 

const useValue = () => useState(defaultState);

const { Provider, useTrackedState} = createContainer(
    useValue
);

export { Provider, useTrackedState};
