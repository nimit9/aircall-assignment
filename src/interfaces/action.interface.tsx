import { ICallDetail } from './call.interface';

export type FetchAllCallsAction = {
    type: 'FETCH_ALL_CALLS';
    payload: {
        calls: ICallDetail[];
    };
};

export type Action = FetchAllCallsAction;
