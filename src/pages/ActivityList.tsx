import { useAppContext } from '@/context/context';
import { Archive } from 'lucide-react';
import { getActivityFeed } from '@/lib/helpers/call-list.helpers';
import toast from 'react-hot-toast';
import { CallTypes } from '@/interfaces/call.interface';
import CallListSkeleton from '@/components/skeletons/CallListSkeleton';
import CallsList from '@/components/calls/CallsListComponent';

const ActivityList = () => {
    const { callsList, fetchAllCalls, fetchCallsListLoading } = useAppContext();

    const activityFeed = getActivityFeed(callsList);

    const isActivityEmpty = Object.keys(activityFeed).length === 0;

    const archiveAllCalls = async () => {
        toast.loading('Archiving all calls...');

        const resArray = await Promise.all(
            Object.keys(activityFeed)
                .map((callType) => {
                    return activityFeed[callType as CallTypes];
                })
                .flat(3)
                .map((call) => {
                    return fetch(
                        `${import.meta.env.VITE_API_URL}/activities/${call.id}`,
                        {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ is_archived: true }),
                        },
                    );
                }),
        );

        const someUpdatesFailed = resArray.some((res) => {
            return !res.ok;
        });
        toast.remove();

        if (someUpdatesFailed) {
            toast.error('Some updates failed, please try again');
        } else {
            toast.success('All calls archived');
        }

        fetchAllCalls();
    };

    return (
        <>
            <div className="w-full flex justify-between items-center p-4">
                <h1 className="text-2xl font-bold">Activity</h1>
                {!isActivityEmpty && !fetchCallsListLoading && (
                    <button
                        className="flex items-center gap-2.5 rounded-md border w-max px-2.5 py-1 shadow-sm"
                        onClick={archiveAllCalls}
                    >
                        <div>
                            <Archive size={16} />
                        </div>
                        <span>Archive all calls</span>
                    </button>
                )}
            </div>
            {isActivityEmpty ? (
                fetchCallsListLoading ? (
                    <CallListSkeleton />
                ) : (
                    <div className="flex w-full justify-center mt-16 text-gray-600 text-xl">
                        No Calls Found
                    </div>
                )
            ) : (
                <CallsList callsListByType={activityFeed} />
            )}
        </>
    );
};

export default ActivityList;
