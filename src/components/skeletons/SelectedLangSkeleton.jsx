const SelectedLangSkeleton = () => {
  return (
    <ul
      className={`w-30 h-44 rounded-xl p-1 absolute top-10 right-0 z-10 bg-white flex flex-col gap-1 overflow-y-scroll overflow-x-hidden`}
    >
      {/* {expanded && */}
      {Array.from({ length: 6 }).map((_, idx) => (
        <li
          key={idx}
          className='bg-gray-500/50 h-10 w-full rounded-md animate-pulse'
        >
          <button type='button' className='w-full p-2' />
        </li>
      ))}
    </ul>
  );
};

export default SelectedLangSkeleton;
