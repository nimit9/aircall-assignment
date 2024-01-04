import { ICallDetail } from '@/interfaces/call.interface';
import { ReactNode, createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';
import {
    FETCH_ALL_CALLS,
    SET_ALL_CALLS_LOADING,
    TOGGLE_DARK_MODE,
} from './action';
import toast from 'react-hot-toast';
import { IState } from '@/interfaces/context.interface';

interface IAppContextValue extends IState {
    fetchAllCalls: () => void;
    toggleDarkMode: (darkMode?: boolean) => void;
}

interface IAppProviderProps {
    children: ReactNode;
}

const initialState: IState = {
    callsList: [] as ICallDetail[],
    darkMode: false,
    fetchCallsListLoading: false,
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
        dispatch({
            type: SET_ALL_CALLS_LOADING,
            payload: { loading: true },
        });
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/activities`;
            const response = await fetch(apiUrl);

            const data: ICallDetail[] = await response.json();

            dispatch({
                type: FETCH_ALL_CALLS,
                payload: {
                    callsList: data,
                },
            });
        } catch (error) {
            toast.error('Error while fetching calls list');
        } finally {
            dispatch({
                type: SET_ALL_CALLS_LOADING,
                payload: { loading: false },
            });
        }
    };

    const toggleDarkMode = async (darkMode?: boolean) => {
        dispatch({
            type: TOGGLE_DARK_MODE,
            ...(darkMode !== undefined && { payload: { darkMode } }),
        });
    };

    const contextValue: IAppContextValue = {
        ...state,
        fetchAllCalls,
        toggleDarkMode,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
