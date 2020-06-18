import { useState, useCallback } from 'react'
import { createContainer } from "react-tracked";
import produce, { Draft } from "immer";
import { AsyncStorage } from 'react-native';

/*
The store contains all data types and functions related to the global state of the React app, it defines what the global state contains and what the initial value is
*/

type State = {
    loggedIn: boolean
    ID: string
    attester: boolean
    serverURL: string
    darkMode: Promise<boolean> | undefined
    jwt: string
}

type Certificate = {
    creatorID: string
    holderID: string
    type: string
    hash?: string //only available once the data has been double attested
}

type OutstandingRequest = {
    creatorID: string
    type: string
}
const getDarkMode = async () => {
    try {
      const value = await AsyncStorage.getItem('darkmode_enabled');
      if (value === "true") {
          return true
      } else if (value === "false") {
          return false
      }
      else return false
    } catch (error) {
      return false
    }
  };
var defaultState: State = {
    loggedIn: true,
    attester: true,
    ID: "0",
    serverURL: "http://localhost:8085",
    darkMode: getDarkMode(),
    jwt: ""
}

// TODO ask if this is still necessary?
const attributeTypeMap = [{ value: "" }, { value: "covid-19-immunity" }] //this relates the numerical value used in the backend to the text used in the frontend

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

export { Certificate, State, OutstandingRequest, attributeTypeMap };
export { Provider, useTrackedState, useSetDraft };
