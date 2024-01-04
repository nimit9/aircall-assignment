import { formatDate, formatTime } from '../../lib/helpers/date.helpers';
import {
    getCallDetailsInfoList,
    getCallDuration,
} from '../../lib/helpers/call-detail.helper';
import { describe, it, expect } from 'vitest';

import CALL_DETAIL from '../mockData/CallDetail.json';

describe('getCallDuration function', () => {
    it('should return "0s" when the duration is 0', () => {
        const result = getCallDuration(0);
        expect(result).toBe('0s');
    });

    it('should correctly format duration when it is in seconds', () => {
        const testCases = [
            { duration: 65, expected: '1m 5s' },
            { duration: 3600, expected: '1h' },
            { duration: 3665, expected: '1h 1m 5s' },
        ];

        testCases.forEach(({ duration, expected }) => {
            const result = getCallDuration(duration);
            expect(result).toBe(expected);
        });
    });
});

// Make sure to import the relevant functions

describe('getCallDetailsInfoList function', () => {
    it('should return null if callDetails is null', () => {
        const result = getCallDetailsInfoList(null);
        expect(result).toBeNull();
    });

    it('should return an array of label-value pairs when callDetails is provided', () => {
        const result = getCallDetailsInfoList(CALL_DETAIL);

        // Assuming format functions are correct, you can use them to check the formatted values
        expect(result).toEqual([
            { label: 'From', value: 9158 },
            { label: 'To', value: 7865 },
            { label: 'Via', value: 1234 },
            { label: 'Call Duration', value: getCallDuration(120) },
            {
                label: 'Date',
                value: formatDate(new Date(CALL_DETAIL.created_at)),
            },
            {
                label: 'Time',
                value: formatTime(new Date(CALL_DETAIL.created_at)),
            },
            { label: 'Call Type', value: 'Outgoing' }, // Assuming 'outgoing' becomes 'Outgoing'
        ]);
    });
});
