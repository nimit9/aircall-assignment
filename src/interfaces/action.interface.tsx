import { ICallDetail } from './call.interface';

export type FetchAllCallsAction = {
    type: 'FETCH_ALL_CALLS';
    payload: {
        callsList: ICallDetail[];
    };
};
export type ToggleDarkModeAction = {
    type: 'TOGGLE_DARK_MODE';
    payload?: {
        darkMode: boolean;
    };
};
export type SetAllCallsLoading = {
    type: 'SET_ALL_CALLS_LOADING';
    payload: {
        loading: boolean;
    };
};

export type Action =
    | FetchAllCallsAction
    | ToggleDarkModeAction
    | SetAllCallsLoading;
