import { ICallDetail } from './call.interface';

export interface IState {
    callsList: ICallDetail[];
    darkMode: boolean;
    fetchCallsListLoading: boolean;
}
