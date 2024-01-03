import { Action, FetchAllCallsAction } from '@/interfaces/action.interface';
import { IState } from './context';

const handlers: Record<string, (state: IState, action: Action) => IState> = {
    FETCH_ALL_CALLS: (
        state: IState,
        { payload: { activityFeed, archive } }: FetchAllCallsAction,
    ): IState => {
        return {
            ...state,
            activityFeed,
            archive,
        };
    },
};

export const reducer = (state: IState, action: Action): IState =>
    handlers[action.type] ? handlers[action.type](state, action) : state;
