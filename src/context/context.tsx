import { ICallDetail, IGroupedByCallType } from '@/interfaces/call.interface';
import { ReactNode, createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';
import { FETCH_ALL_CALLS } from './action';
import { getActivityFeed, getArchiveData } from '@/lib/helpers';

export interface IState {
    activityFeed: IGroupedByCallType;
    archive: IGroupedByCallType;
}

interface IAppContextValue extends IState {
    fetchAllCalls: () => void;
}

interface IAppProviderProps {
    children: ReactNode;
}

const initialState: IState = {
    activityFeed: {} as IGroupedByCallType,
    archive: {} as IGroupedByCallType,
};

const AppContext = createContext<IAppContextValue | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context)
        throw new Error('useAppContext must be used with AppProvider');
    return context;
};

export const AppProvider = ({ children }: IAppProviderProps) => {
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
    });

    const fetchAllCalls = async () => {
        const apiUrl = 'https://cerulean-marlin-wig.cyclic.app/activities';
        const response = await fetch(apiUrl);

        const data: ICallDetail[] = await response.json();

        dispatch({
            type: FETCH_ALL_CALLS,
            payload: {
                activityFeed: getActivityFeed(data),
                archive: getArchiveData(data),
            },
        });
    };

    const contextValue: IAppContextValue = {
        ...state,
        fetchAllCalls,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
