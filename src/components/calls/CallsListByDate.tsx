import { ICallDetail } from '@/interfaces/call.interface';
import { groupCallsByDate } from '@/lib/helpers/call-list.helpers';

import CallsCard from './CallsCard';

const CallsListByDate = ({ callList }: { callList: ICallDetail[] }) => {
    if (!callList) {
        return (
            <div className="flex w-full justify-center mt-16 text-gray-600 text-xl">
                No Calls Found
            </div>
        );
    }

    const listByDate = groupCallsByDate(callList);

    return (
        <div className="flex flex-col gap-4 my-4">
            {Object.entries(listByDate).map(([dateString, callsList]) => {
                return (
                    <div className="flex flex-col gap-2" key={dateString}>
                        <span className="text-gray-600 text-sm">
                            {dateString}
                        </span>
                        <div className="flex flex-col gap-4">
                            {callsList.map((callDetails) => {
                                return (
                                    <CallsCard
                                        callDetails={callDetails}
                                        key={callDetails.id}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CallsListByDate;
