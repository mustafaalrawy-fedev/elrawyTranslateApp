import SelectedLanguage from '../SelectedLanguage';
import TranslateTextareaSkeleton from '../skeletons/TranslateTextareaSkeleton';
import RandomSelectIcon from '../../assets/image/Horizontal_top_left_main.svg';
import { setRandomSelectionLang } from '../../store/slices/languagesSlice';
import { useDispatch } from 'react-redux';
import { lazy, Suspense } from 'react';
import { motion } from 'motion/react';
const TranslateTextarea = lazy(() => import('./translateTextarea'));

const TranslateLanguage = () => {
  // const {} useSelector((state) => state.langs);
  const dispatch = useDispatch();
  const handleRandomLangSelection = () => {
    dispatch(setRandomSelectionLang());
  };
  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.3, ease: 'easeIn' }}
      className='bg-gray-900/80 w-full h-64 rounded-xl p-5  border-b-1 border-white/20 pb-3'
    >
      <div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex items-center  border-b-1 border-white/20 pb-3'
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className='ml-auto flex gap-10'
        >
          <SelectedLanguage translateLang={true} />
          {/* Random Select Langs */}
          <button
            type='button'
            onClick={handleRandomLangSelection}
            className='border-1 border-white/10 p-1 rounded-md hover:bg-white/10 cursor-pointer'
          >
            <img src={RandomSelectIcon} alt='Random Icon' />
          </button>
        </motion.div>
      </div>
      <Suspense fallback={<TranslateTextareaSkeleton />}>
        <TranslateTextarea />
      </Suspense>
    </motion.aside>
  );
};

export default TranslateLanguage;
