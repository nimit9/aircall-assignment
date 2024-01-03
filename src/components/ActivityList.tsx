import { useAppContext } from '@/context/context';
import React, { useEffect } from 'react';

const ActivityList = () => {
    const { calls, fetchAllCalls } = useAppContext();

    return <div>{JSON.stringify(calls)}</div>;
};

export default ActivityList;
