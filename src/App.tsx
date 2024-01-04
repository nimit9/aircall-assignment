import { Outlet, useLocation } from 'react-router-dom';
import { useAppContext } from './context/context';
import { useEffect } from 'react';
import Header from './components/header/Header';
import { Toaster } from 'react-hot-toast';
import { useDarkMode } from './hooks/useDarkMode';

function App() {
    const location = useLocation();

    const { fetchAllCalls } = useAppContext();

    useEffect(() => {
        fetchAllCalls();
    }, []);

    useDarkMode();

    return (
        <>
            {!location.pathname.includes('/call-detail') && <Header />}
            <Toaster
                position="bottom-center"
                containerStyle={{ position: 'absolute', bottom: '40px' }}
                reverseOrder={true}
            />
            <Outlet />
        </>
    );
}

export default App;
