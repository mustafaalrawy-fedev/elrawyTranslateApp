import React from 'react';

const TranslateTextareaSkeleton = () => {
  const mainStyle = 'bg-gray-500/50 rounded-lg animate-pulse';
  return (
    <div className='flex flex-col gap-2'>
      <div className={`w-full min-h-24 max-h-24 mt-4 ${mainStyle}`} />
      <div className='flex gap-4 mt-6'>
        <div className={`${mainStyle} size-8`} />

        <div className={`${mainStyle} size-8`} />
      </div>
    </div>
  );
};

export default TranslateTextareaSkeleton;
