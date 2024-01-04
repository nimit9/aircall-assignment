import { useAppContext } from '@/context/context';
import { Archive, ArchiveRestore } from 'lucide-react';
import { MouseEvent } from 'react';
import toast from 'react-hot-toast';

const ArchiveButton = ({
    is_archived,
    callId,
}: {
    is_archived: boolean;
    callId: string;
}) => {
    const { fetchAllCalls } = useAppContext();
    const archiveCall = async (
        e: MouseEvent<HTMLButtonElement>,
        is_archived: boolean,
    ) => {
        e.preventDefault();
        toast.loading(is_archived ? 'Unarchiving...' : 'Archiving...');
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/activities/${callId}`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_archived: !is_archived }),
            },
        );
        toast.remove();
        if (res.ok) {
            toast.success(
                is_archived
                    ? 'Successfully unarchived'
                    : 'Successfully archived',
            );
            fetchAllCalls();
        } else {
            toast.error('Something went wrong! Please try again later');
        }
    };
    return (
        <button onClick={(e) => archiveCall(e, is_archived)}>
            {is_archived ? <ArchiveRestore size={20} /> : <Archive size={20} />}
        </button>
    );
};

export default ArchiveButton;
