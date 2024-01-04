import {
    getActivityFeed,
    getArchiveData,
    getCallsListByType,
    getCallsListSortedByDate,
    groupCallsByDate,
} from '../../lib/helpers/call-list.helpers';
import { describe, it, expect } from 'vitest';
import {
    ICallDetail,
    ICallDetailWithMissingKeys,
} from '@/interfaces/call.interface';

const testCalls: ICallDetailWithMissingKeys[] | ICallDetail[] = [
    {
        direction: 'outbound',
        from: 100000,
        to: 200000,
        via: 30000000,
        duration: 0,
        call_type: 'missed',
        is_archived: false,
        id: '6393bb5469073dc45849ca7a',
        created_at: '2022-12-09T22:48:52.789Z',
    },
    {
        direction: 'inbound',
        from: 100001,
        to: 200002,
        via: 30000003,
        duration: 10,
        is_archived: false,
        call_type: 'answered',
        id: '6393bb7b69073dc45849ca7c',
        created_at: '2022-12-09T22:49:31.911Z',
    },
    {
        direction: 'inbound',
        from: 1231,
        to: 12321,
        via: 12312,
        duration: 21312,
        is_archived: false,
        call_type: 'missed',
        id: '639a1043328500b1a0fa9c01',
        created_at: '2022-12-14T18:04:51.894Z',
    },
    {
        direction: 'inbound',
        from: 100001,
        to: 200001,
        via: 30000001,
        duration: 0,
        is_archived: true,
        call_type: 'missed',
        id: '639737ac587edc08100c026f',
        created_at: '2022-12-12T14:16:12.721Z',
    },
    {
        direction: 'inbound',
        from: 100002,
        to: 200002,
        via: 30000002,
        duration: 20,
        is_archived: true,
        call_type: 'voicemail',
        id: '63973961362d5c09cd79364a',
        created_at: '2022-12-12T14:23:29.409Z',
    },
    {
        direction: 'inbound',
        from: 100003,
        to: 200003,
        via: 30000003,
        duration: 100,
        is_archived: false,
        call_type: 'answered',
        id: '639746e963147b03c894f521',
        created_at: '2022-12-12T15:21:13.564Z',
    },
    {
        direction: 'inbound',
        from: 100004,
        to: 200004,
        via: 30000004,
        duration: 1,
        is_archived: false,
        call_type: 'voicemail',
        id: '639747acb585e7e5526eb46a',
        created_at: '2022-12-12T15:24:28.091Z',
    },
    {
        direction: 'inbound',
        from: 100005,
        to: 200005,
        via: 30000005,
        duration: 2,
        is_archived: false,
        call_type: 'voicemail',
        id: '63974a811f096c984321fe0b',
        created_at: '2022-12-12T15:36:33.277Z',
    },

    {
        direction: 'inbound',
        from: 1234,
        to: 1234,
        via: 1234,
        duration: 21312,
        is_archived: false,
        call_type: 'missed',
        id: '639a10a9328500b1a0fa9c04',
        created_at: '2022-12-14T18:06:33.291Z',
    },

    {
        direction: 'inbound',
        from: 1234,
        to: 1234,
        via: 1234,
        duration: 21312,
        is_archived: false,
        call_type: 'missed',
        id: '639a177121da466572fd6bd8',
        created_at: '2022-12-14T18:35:29.422Z',
    },
    {
        direction: 'outbound',
        from: 1234,
        to: 1234,
        via: 1234,
        duration: 21312,
        is_archived: false,
        call_type: 'missed',
        id: '639a178921da466572fd6bdb',
        created_at: '2022-12-14T18:35:53.057Z',
    },
    {
        direction: 'outbound',
        from: 1234,
        to: 1234,
        via: 1234,
        duration: 21312,
        is_archived: false,
        call_type: 'missed',
        id: '639a178f21da466572fd6bdd',
        created_at: '2022-12-14T18:35:59.854Z',
    },
    {
        direction: 'outbound',
        from: 306306306,
        to: 890,
        via: 600,
        duration: 231,
        is_archived: false,
        call_type: 'missed',
        id: '64cd75ec11a82c708838361e',
        created_at: '2023-08-04T22:04:28.098Z',
    },
];

describe('getCallsListSortedByDate function', () => {
    it('should sort an array of call details by date in descending order', () => {
        // Create a test array of call details with known dates
        const testCalls = [
            {
                direction: 'outbound',
                from: 100000,
                to: 200000,
                via: 30000000,
                duration: 0,
                call_type: 'missed',
                is_archived: false,
                id: '6393bb5469073dc45849ca7a',
                created_at: '2022-12-09T22:48:52.789Z',
            },
            {
                direction: 'inbound',
                from: 100001,
                to: 200002,
                via: 30000003,
                duration: 10,
                is_archived: false,
                call_type: 'answered',
                id: '6393bb7b69073dc45849ca7c',
                created_at: '2022-12-09T22:49:31.911Z',
            },
            {
                direction: 'inbound',
                from: 100001,
                to: 200001,
                via: 30000001,
                duration: 0,
                is_archived: true,
                call_type: 'missed',
                id: '639737ac587edc08100c026f',
                created_at: '2022-12-12T14:16:12.721Z',
            },
        ];

        // Expected result based on the descending order of dates
        const expectedResult = [
            {
                direction: 'inbound',
                from: 100001,
                to: 200001,
                via: 30000001,
                duration: 0,
                is_archived: true,
                call_type: 'missed',
                id: '639737ac587edc08100c026f',
                created_at: '2022-12-12T14:16:12.721Z',
            },
            {
                direction: 'inbound',
                from: 100001,
                to: 200002,
                via: 30000003,
                duration: 10,
                is_archived: false,
                call_type: 'answered',
                id: '6393bb7b69073dc45849ca7c',
                created_at: '2022-12-09T22:49:31.911Z',
            },
            {
                direction: 'outbound',
                from: 100000,
                to: 200000,
                via: 30000000,
                duration: 0,
                call_type: 'missed',
                is_archived: false,
                id: '6393bb5469073dc45849ca7a',
                created_at: '2022-12-09T22:48:52.789Z',
            },
        ];

        const result = getCallsListSortedByDate(testCalls);

        expect(result).toEqual(expectedResult);
    });
});

describe('getCallsListByType function', () => {
    it('should group an array of call details by call type', () => {
        const result = getCallsListByType(testCalls);

        expect(result).toHaveProperty('missed');
        expect(result).toHaveProperty('voicemail');
        expect(result).toHaveProperty('answered');
        expect(result.answered.length).toEqual(2);
        expect(result.missed.length).toEqual(8);
        expect(result.voicemail.length).toEqual(3);
    });
    it('should filter out call detail when it does not have call_type', () => {
        let filtertedTestCall = [...testCalls];
        delete filtertedTestCall[0].call_type;
        const result = getCallsListByType(filtertedTestCall);

        expect(result).toHaveProperty('missed');
        expect(result).toHaveProperty('voicemail');
        expect(result).toHaveProperty('answered');
        expect(result.answered.length).toEqual(2);
        expect(result.missed.length).toEqual(7);
        expect(result.voicemail.length).toEqual(3);
    });
});

describe('groupCallsByDate function', () => {
    it('should group an array of call details by date', () => {
        const result = groupCallsByDate(testCalls as ICallDetail[]);

        expect(Object.keys(result)).toEqual([
            'December 10, 2022',
            'December 14, 2022',
            'December 12, 2022',
            'December 15, 2022',
            'August 5, 2023',
        ]);
    });
});
describe('getActivityList function', () => {
    it('should group an array of call details by date', () => {
        const result = getActivityFeed(testCalls);

        expect(result).toHaveProperty('missed');
        expect(result).toHaveProperty('voicemail');
        expect(result).toHaveProperty('answered');

        expect(
            result.answered.every((call) => call.is_archived === false),
        ).toBe(true);
        expect(
            result.voicemail.every((call) => call.is_archived === false),
        ).toBe(true);
        expect(result.missed.every((call) => call.is_archived === false)).toBe(
            true,
        );
    });
});
describe('getArchive function', () => {
    it('should group an array of call details by date', () => {
        const result = getArchiveData(testCalls);

        expect(result).toHaveProperty('missed');
        expect(result).toHaveProperty('voicemail');

        expect(result.voicemail.every((call) => call.is_archived)).toBe(true);
        expect(result.missed.every((call) => call.is_archived)).toBe(true);
    });
});
