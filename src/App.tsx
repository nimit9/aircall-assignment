import './App.css';
import ActivityList from './components/ActivityList';
import { AppProvider } from './context/context';

function App() {
    return (
        <>
            <AppProvider>
                <ActivityList />
            </AppProvider>
        </>
    );
}

export default App;
