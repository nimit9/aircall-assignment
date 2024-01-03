import { ICallDetail, IGroupedByCallType } from './call.interface';

export type FetchAllCallsAction = {
    type: 'FETCH_ALL_CALLS';
    payload: {
        activityFeed: IGroupedByCallType;
        archive: IGroupedByCallType;
    };
};

export type Action = FetchAllCallsAction;
