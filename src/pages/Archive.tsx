import { useAppContext } from '@/context/context';
import { ArchiveRestore } from 'lucide-react';
import { getArchiveData } from '@/lib/helpers/call-list.helpers';
import toast from 'react-hot-toast';
import CallListSkeleton from '@/components/skeletons/CallListSkeleton';
import CallsList from '@/components/calls/CallsListComponent';

const ArchivePage = () => {
    const { callsList, fetchAllCalls, fetchCallsListLoading } = useAppContext();

    const archive = getArchiveData(callsList);

    const isActivityEmpty = Object.keys(archive).length === 0;

    const unarchiveAllCalls = async () => {
        toast.loading('Unarchiving all calls...');

        const res = await fetch(`${import.meta.env.VITE_API_URL}/reset`, {
            method: 'PATCH',
        });

        toast.remove();

        if (!res.ok) {
            toast.error('Could not unarchive all calls, please try again');
        } else {
            toast.success('All calls unarchived');
        }

        fetchAllCalls();
    };

    return (
        <>
            <div className="w-full flex justify-between items-center p-4">
                <h1 className="text-2xl font-bold">Archive</h1>
                {!isActivityEmpty && (
                    <button
                        className="flex items-center gap-2.5 rounded-md border w-max px-2.5 py-1 shadow-sm"
                        onClick={unarchiveAllCalls}
                    >
                        <div>
                            <ArchiveRestore size={16} />
                        </div>
                        <span>Unarchive all calls</span>
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
                <CallsList callsListByType={archive} />
            )}
        </>
    );
};

export default ArchivePage;
