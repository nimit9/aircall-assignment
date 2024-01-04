import { formatDate, formatTime } from '../../lib/helpers/date.helpers';
import { describe, it, expect } from 'vitest';

describe('formatDate function', () => {
    it('should format the date correctly', () => {
        const testDate = new Date('2022-01-15T12:30:45.678Z');

        const expectedResult = 'January 15, 2022';

        const result = formatDate(testDate);

        expect(result).toBe(expectedResult);
    });
});

describe('formatTime function', () => {
    it('should format the time correctly', () => {
        const testDate = new Date('2022-01-15T12:30:45.678Z');

        const expectedResult = '6:00 PM';

        const result = formatTime(testDate);

        expect(result).toBe(expectedResult);
    });
});
