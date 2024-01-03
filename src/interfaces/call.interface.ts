export interface ICallDetail {
    direction: string;
    from: number;
    to: number;
    via: number;
    duration: number;
    call_type: string;
    is_archived: boolean;
    id: string;
    created_at: string;
}
export type CallTypes = 'missed' | 'voicemail' | 'answered';

export type IGroupedByCallType = {
    [callType in CallTypes]: ICallDetail[];
};
