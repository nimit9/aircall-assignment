import { Action } from '@/interfaces/action.interface';

import {
    FETCH_ALL_CALLS,
    SET_ALL_CALLS_LOADING,
    TOGGLE_DARK_MODE,
} from './action';
import { IState } from '@/interfaces/context.interface';

export const reducer = (state: IState, action: Action): IState => {
    switch (action.type) {
        case FETCH_ALL_CALLS:
            return {
                ...state,
                callsList: action.payload.callsList,
            };

        case TOGGLE_DARK_MODE:
            return {
                ...state,
                darkMode: action.payload
                    ? action.payload.darkMode
                    : !state.darkMode,
            };
        case SET_ALL_CALLS_LOADING:
            return {
                ...state,
                fetchCallsListLoading: action.payload.loading,
            };

        default:
            return state;
    }
};
