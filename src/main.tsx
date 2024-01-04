import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ActivityList from './pages/ActivityList.tsx';
import ArchivePage from './pages/Archive.tsx';
import { AppProvider } from './context/context.tsx';
import { CallDetails } from './pages/CallDetails.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AppProvider>
                <App />
            </AppProvider>
        ),
        children: [
            {
                path: '/',
                element: <ActivityList />,
            },
            {
                path: '/archive',
                element: <ArchivePage />,
            },
            {
                path: '/call-detail/:callId',
                element: <CallDetails />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />,
);
