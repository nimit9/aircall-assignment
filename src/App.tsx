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
        <div className="md:m-auto md:w-[700px] md:min-h-screen md:border">
            {!location.pathname.includes('/call-detail') && <Header />}
            <Toaster
                position="bottom-center"
                containerStyle={{ position: 'absolute', bottom: '40px' }}
                reverseOrder={true}
            />
            <Outlet />
        </div>
    );
}

export default App;
