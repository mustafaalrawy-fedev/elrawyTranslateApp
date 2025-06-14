import SelectedLanguage from '../SelectedLanguage';
import { lazy, Suspense } from 'react';
import DetectedTextareaSkeleton from '../skeletons/DetectedTextareaSkeleton';
import { motion } from 'motion/react';
const DetectTextareaForm = lazy(() => import('./DetectTextareaForm'));

const DetectLanguage = () => {
  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.3, ease: 'easeIn' }}
      className='bg-gray-800/80 w-full h-64 rounded-xl p-5'
    >
      <div className='flex items-center border-b-1 border-white/20 pb-3'>
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className='text-white/50 text-md font-bold tracking-wider'
        >
          Detect Language
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className='ml-auto'
        >
          {/* <SelectorLang /> */}
          <SelectedLanguage />
        </motion.div>
      </div>
      {/* textarea */}
      <Suspense fallback={<DetectedTextareaSkeleton />}>
        <DetectTextareaForm />
      </Suspense>
    </motion.aside>
  );
};

export default DetectLanguage;
