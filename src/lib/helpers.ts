import { CallTypes } from './../interfaces/call.interface';
import { ICallDetail, IGroupedByCallType } from '@/interfaces/call.interface';

/**
 * Group an array of call details by call type.
 * @param calls - An array of call details.
 * @returns An object where keys are unique call type values, and values are arrays containing call details with that call type.
 */
export const getCallsListByType = (
    calls: ICallDetail[],
): IGroupedByCallType => {
    const sortedListByDate = getCallsListSortedByDate(calls);
    return sortedListByDate.reduce((acc, call) => {
        const callType = call.call_type as CallTypes;

        // If call type is missing or undefined, skip this iteration
        if (!callType) return acc;

        // If the call type is not yet a key in the accumulator, initialize it as an empty array
        if (!acc[callType]) {
            acc[callType] = [];
        }

        // Push the current call details to the corresponding call type array
        acc[callType].push(call);

        return acc;
    }, {} as IGroupedByCallType); // Initialize the accumulator with an empty object
};

export const getCallsListSortedByDate = (calls: ICallDetail[]) => {
    return calls.sort(
        (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
};

export const getActivityFeed = (calls: ICallDetail[]) => {
    return getCallsListByType(calls.filter((call) => !call.is_archived));
};

export const getArchiveData = (calls: ICallDetail[]) => {
    return getCallsListByType(calls.filter((call) => call.is_archived));
};
