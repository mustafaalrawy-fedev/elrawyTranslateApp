import { motion } from 'motion/react';

const ProgressBar = ({ progress }) => {
  return (
    <div className='w-20 h-1 bg-gray-200 rounded-full overflow-hidden'>
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 3, ease: [0.6, 0.05, -0.01, 0.9] }}
        className={`h-full bg-indigo-600 rounded-full`}
      />
    </div>
  );
};

export default ProgressBar;
