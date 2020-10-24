import {useState, useCallback} from 'react';
import {createContainer} from 'react-tracked';
import {produce, Draft} from 'immer'; // eslint-disable-line no-unused-vars
import {AsyncStorage} from 'react-native';

/*
The store contains all data types and functions related to the global state of the React app,
it defines what the global state contains and what the initial value is
*/

type State = {
  registered: boolean;
  loggedIn: boolean;
  ID: string;
  attester: boolean;
  serverURL: string;
  darkMode: boolean;
  jwt: string;
};

type Certificate = {
  creatorID: string;
  holderID: string;
  type: string;
  hash?: string; // only available once the data has been double attested
};

type OutstandingRequest = {
  creatorID: string;
  type: string;
};

let darkmode = false;
AsyncStorage.getItem('darkmode_enabled', (_error, result) => {
  darkmode = result === 'true';
});

let registered = false;
AsyncStorage.getItem('registered', (_error, result) => {
  registered = result === 'true';
});

const defaultState: State = {
  registered: registered,
  loggedIn: false,
  attester: false,
  ID: '0',
  serverURL: 'http://localhost:8085',
  darkMode: darkmode,
  jwt: '',
};

// attributeTypeMap relates the numerical value used in the backend to the text used in the frontend
const attributeTypeMap = [{value: 'COVID-19 Immunity Certificate'}];

const useValue = () => useState(defaultState);

const {Provider, useTrackedState, useUpdate} = createContainer(useValue);

const useSetDraft = () => {
  const setState = useUpdate();
  return useCallback(
      (draftUpdater: (draft: Draft<State>) => void) => {
        setState(produce(draftUpdater));
      },
      [setState],
  );
};

export {Certificate, State, OutstandingRequest, attributeTypeMap};
export {Provider, useTrackedState, useSetDraft};
