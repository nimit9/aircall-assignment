import { ICallDetail } from '@/interfaces/call.interface';
import { getCallDetailsInfoList } from '@/lib/helpers/call-detail.helper';
import { ArrowLeft, MoveDownLeft, MoveUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useParams } from 'react-router-dom';
import CallDetailSkeleton from '@/components/skeletons/CallDetailSkeleton';

const CallDetailsInfoRow = ({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) => {
    return (
        <>
            <span className="col-span-2 font-semibold">{label}</span>
            <span className="col-span-3 text-lg">{value}</span>
        </>
    );
};

const CallDetailsDirection = ({ direction }: { direction: string }) => {
    const iconProps = {
        size: 20,
        strokeWidth: 1,
    };
    return (
        <div className="flex items-center gap-1.5 text-sm border px-2.5 py-1.5 w-max rounded-full">
            {direction === 'outbound' ? (
                <>
                    <MoveUpRight {...iconProps} />
                    <span>Outbound Call</span>
                </>
            ) : (
                <>
                    <MoveDownLeft {...iconProps} />
                    <span>Inbound Call</span>
                </>
            )}
        </div>
    );
};

export const CallDetails = () => {
    const params = useParams();
    const { state } = useLocation();

    // Fetching the call details from call Id
    const [callDetails, setCallDetails] = useState<ICallDetail | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchCallDetails = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/activities/${params.callId}`,
            );
            const data = await res.json();
            setCallDetails(data);
        } catch (err) {
            toast.error('Could not fetch call details');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCallDetails();
    }, []);

    // Making the obect to display the call details Info List
    const callDetailsInfoList = getCallDetailsInfoList(callDetails);

    return (
        <div className="w-full p-4">
            <div className="w-full flex justify-between items-center">
                <Link
                    to={state.pathname}
                    state={{ call_type: state.call_type }}
                >
                    <ArrowLeft size={32} />
                </Link>
            </div>
            {loading ? (
                <CallDetailSkeleton />
            ) : (
                callDetails && (
                    <div className="mt-8 px-2 flex flex-col gap-4">
                        {callDetails.is_archived && (
                            <span className="text-sm text-gray-400">
                                ARCHIVED
                            </span>
                        )}
                        <CallDetailsDirection
                            direction={callDetails.direction}
                        />

                        <div className="grid grid-cols-5 gap-y-2">
                            {callDetailsInfoList?.map((details) => {
                                return (
                                    <CallDetailsInfoRow
                                        {...details}
                                        key={details.label}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )
            )}
        </div>
    );
};
