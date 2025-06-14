const DetectedTextareaSkeleton = () => {
  const mainStyle = 'bg-gray-500/50 rounded-lg animate-pulse';
  return (
    <form className='flex flex-col gap-2'>
      <div className={`w-full min-h-24 max-h-24 mt-4 ${mainStyle}`}></div>
      {/* textarea length */}
      <p className='text-white/50 text-xs font-bold tracking-wider text-right'>
        0/500
      </p>
      {/* icons and translate button */}
      <div className='flex justify-between items-center'>
        {/* Icons */}
        <div className='flex gap-4'>
          <div className={`${mainStyle} size-8`} />

          <div className={`${mainStyle} size-8`} />
        </div>
        {/* Translate button */}
        <div
          className={`border-1 border-white w-32 h-10  px-4 py-2 ${mainStyle}`}
        />
      </div>
    </form>
  );
};

export default DetectedTextareaSkeleton;
