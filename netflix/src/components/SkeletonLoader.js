import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="w-48 pr-2 flex-shrink-0">
            <div 
                className="skeleton-shimmer rounded"
                style={{
                    width: '100%',
                    aspectRatio: '2 / 3',
                    borderRadius: '4px',
                }}
            />
        </div>
    );
};

const SkeletonRow = () => {
    return (
        <div className="px-8 mb-4">
            {/* Title placeholder */}
            <div 
                className="skeleton-shimmer rounded mb-3"
                style={{ width: '200px', height: '28px' }}
            />
            {/* Cards row */}
            <div className="flex overflow-hidden gap-2">
                {[...Array(8)].map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    );
};

export { SkeletonCard, SkeletonRow };
export default SkeletonRow;
