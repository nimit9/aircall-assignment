import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import CallsListByDate from './CallsListByDate';

import { CallTypes, IGroupedByCallType } from '@/interfaces/call.interface';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, PhoneMissedIcon, Voicemail } from 'lucide-react';

const CallsList = ({
    callsListByType,
}: {
    callsListByType: IGroupedByCallType;
}) => {
    /* 
    Checking if state is present when navigating from call details,
    and setting active tab accordingly 
    */
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state;
    useEffect(() => {
        navigate(location.pathname, { replace: true });
    }, []);

    const activityTypeList = [
        {
            value: 'answered',
            icon: <Phone size={16} />,
        },
        {
            value: 'voicemail',
            icon: <Voicemail />,
        },
        {
            value: 'missed',
            icon: <PhoneMissedIcon size={16} />,
        },
    ];

    return (
        <div className="flex w-full items-center justify-center px-4 py-2">
            <Tabs
                defaultValue={state?.call_type || 'answered'}
                className="w-full"
            >
                <TabsList className="w-full">
                    {activityTypeList.map(({ value, icon }) => (
                        <TabsTrigger
                            value={value}
                            className="w-full capitalize"
                            key={value}
                        >
                            <div className="flex gap-2 items-center">
                                {icon}
                                <span>{value}</span>
                            </div>
                        </TabsTrigger>
                    ))}
                </TabsList>
                {activityTypeList.map(({ value }) => (
                    <TabsContent value={value} key={value}>
                        <CallsListByDate
                            callList={callsListByType[value as CallTypes]}
                        />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default CallsList;
