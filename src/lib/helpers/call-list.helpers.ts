import {
    CallTypes,
    ICallDetail,
    IGroupedByCallType,
    IGroupedByDate,
} from '@/interfaces/call.interface';
import { formatDate } from './date.helpers';

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

        if (!callType || !call.from) return acc;

        if (!acc[callType]) {
            acc[callType] = [];
        }

        acc[callType].push(call);

        return acc;
    }, {} as IGroupedByCallType);
};

/**
 * Group an array of call details by date.
 * @param calls - An array of call details.
 * @returns An object where keys are formatted dates, and values are arrays containing call details for that date.
 */
export const groupCallsByDate = (calls: ICallDetail[]) => {
    return calls.reduce((acc, call) => {
        const formattedDate = formatDate(new Date(call.created_at));

        // If the call type is not yet a key in the accumulator, initialize it as an empty array
        if (!acc[formattedDate]) {
            acc[formattedDate] = [];
        }

        // Push the current call details to the corresponding call type array
        acc[formattedDate].push(call);

        return acc;
    }, {} as IGroupedByDate); // Initialize the accumulator with an empty object
};

/**
 * Sort an array of call details by date in descending order.
 * @param calls - An array of call details.
 * @returns A new array of call details sorted by date in descending order.
 */
export const getCallsListSortedByDate = (calls: ICallDetail[]) => {
    return calls.sort(
        (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
};

/**
 * Filter and group an array of call details by call type, excluding archived calls.
 * @param calls - An array of call details.
 * @returns An object where keys are unique call type values, and values are arrays containing call details with that call type.
 */
export const getActivityFeed = (calls: ICallDetail[]) => {
    return getCallsListByType(calls.filter((call) => !call.is_archived));
};

/**
 * Filter and group an array of call details by call type, including only archived calls.
 * @param calls - An array of call details.
 * @returns An object where keys are unique call type values, and values are arrays containing call details with that call type.
 */
export const getArchiveData = (calls: ICallDetail[]) => {
    return getCallsListByType(calls.filter((call) => call.is_archived));
};
