import { ICallDetail } from '@/interfaces/call.interface';
import { formatDate, formatTime } from './date.helpers';

/**
 * Convert a call duration in seconds to a formatted string (hours, minutes, seconds).
 * @param duration - The duration of the call in seconds.
 * @returns A string representation of the formatted call duration.
 */
export const getCallDuration = (duration: number) => {
    if (duration === 0) {
        return '0s';
    }
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    const hoursStr = hours > 0 ? `${hours}h ` : '';
    const minutesStr = minutes > 0 ? `${minutes}m ` : '';
    const secondsStr = seconds > 0 ? `${seconds}s` : '';

    return (hoursStr + minutesStr + secondsStr).trim();
};

/**
 * Generate an array of label-value pairs containing information about a call.
 * @param callDetails - The call details to be presented.
 * @returns An array of objects, each containing a label and its corresponding value for a specific aspect of the call.
 */
export const getCallDetailsInfoList = (callDetails: ICallDetail | null) => {
    if (!callDetails) return null;

    const { from, to, duration, via, call_type, created_at } = callDetails;

    return [
        {
            label: 'From',
            value: from,
        },
        {
            label: 'To',
            value: to,
        },
        {
            label: 'Via',
            value: via,
        },
        {
            label: 'Call Duration',
            value: getCallDuration(duration),
        },
        {
            label: 'Date',
            value: formatDate(new Date(created_at)),
        },
        {
            label: 'Time',
            value: formatTime(new Date(created_at)),
        },
        {
            label: 'Call Type',
            value: call_type.charAt(0).toUpperCase() + call_type.slice(1),
        },
    ];
};
