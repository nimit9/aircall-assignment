import { useAppContext } from '@/context/context';
import { useEffect } from 'react';

const ActivityList = () => {
    const { archive, fetchAllCalls } = useAppContext();

    useEffect(() => {
        fetchAllCalls();
    }, []);

    return <div>{JSON.stringify(archive)}</div>;
};

export default ActivityList;
