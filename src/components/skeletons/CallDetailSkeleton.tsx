import { Fragment } from 'react';
import { Skeleton } from '../ui/skeleton';

const CallDetailSkeleton = () => {
    return (
        <div className="mt-8 px-2 flex flex-col gap-6">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="w-32 h-8 rounded-full" />
            <div className="grid grid-cols-5 gap-y-6">
                {Array.from({ length: 7 }).map((_, index) => {
                    return (
                        <Fragment key={index}>
                            <Skeleton className="col-span-2 w-3/5 h-4" />
                            <Skeleton className="col-span-3 w-3/5 h-4" />
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default CallDetailSkeleton;
