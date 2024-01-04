import { ICallDetail } from '@/interfaces/call.interface';

import { MoveDownLeft, MoveUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ArchiveButton from '../ArchiveButton';
import { formatTime } from '@/lib/helpers/date.helpers';

const CallCard = ({
    callDetails: { id, direction, from, is_archived, created_at, call_type },
}: {
    callDetails: ICallDetail;
}) => {
    const { pathname } = useLocation();
    return (
        //Goes to call detail page and sends the current call type and pathname as state
        <Link to={`/call-detail/${id}`} state={{ call_type, pathname }}>
            <div className="w-full rounded-md flex items-center px-4 py-3 shadow-sm border gap-6">
                {direction === 'outbound' ? (
                    <MoveUpRight
                        size={20}
                        data-testid="outbound-call-card-icon"
                    />
                ) : (
                    <MoveDownLeft size={20} />
                )}

                <div className="flex-1 flex flex-col">
                    <span>{from.toString()}</span>
                    <span className="text-gray-600 text-sm">
                        {formatTime(new Date(created_at))}
                    </span>
                </div>

                <ArchiveButton is_archived={is_archived} callId={id} />
            </div>
        </Link>
    );
};

export default CallCard;
