import { Skeleton } from '../ui/skeleton';

const CallListSkeleton = () => {
    return (
        <div className="w-full px-4 py-2">
            <Skeleton className="w-full h-10" />
            <div className="flex flex-col gap-4 my-4">
                <div className="flex flex-col gap-2">
                    <Skeleton className="w-1/3 h-4" />
                    <div className="flex flex-col gap-4">
                        <Skeleton className="w-full h-20" />
                        <Skeleton className="w-full h-20" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Skeleton className="w-1/3 h-4" />
                    <Skeleton className="w-full h-20" />
                </div>
                <div className="flex flex-col gap-2">
                    <Skeleton className="w-1/3 h-4" />
                    <Skeleton className="w-full h-20" />
                </div>
            </div>
        </div>
    );
};

export default CallListSkeleton;
