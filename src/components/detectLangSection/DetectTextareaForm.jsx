import { useDispatch, useSelector } from 'react-redux';
import {
  setTextareaInput,
  textTranslate,
} from '../../store/slices/languagesSlice';
import soundIcon from '../../assets/image/sound_max_fill.svg';
import copyIcon from '../../assets/image/Copy.svg';
import sortAlpaIcon from '../../assets/image/Sort_alfa.svg';
// import DetectedTextareaSkeleton from '../skeletons/DetectedTextareaSkeleton';
import { motion, AnimatePresence } from 'motion/react';
import { speakText } from '../../utils/speakText';
import { useClipboard } from '../../hooks/useClipboard';

const DetectTextareaForm = () => {
  const { copy, copied } = useClipboard();
  const {
    textareaInput,
    textareaLength,
    selectedLanguageCode,
    translateDefaultLangCode,
    translateData,
    // isLoading,
  } = useSelector((state) => state.langs);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // if (!textareaLength) return;
      if (!textareaInput.trim()) return;
      dispatch(
        textTranslate({
          detectCode: selectedLanguageCode,
          translateCode: translateDefaultLangCode,
          textareaInput: textareaInput,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Speak text
  const handleDetectedSpeakText = () => {
    if (!textareaInput.trim()) return;
    speakText(
      textareaInput,
      translateData?.detectedLanguage?.language || 'auto'
    );
  };

  // Copy text
  const handleCopyText = () => {
    copy(textareaInput);
  };

  const DetectActionBtns = [
    {
      icon: soundIcon,
      alt: 'sound icon',
      title: 'Listen',
      action: handleDetectedSpeakText,
    },
    {
      icon: copyIcon,
      alt: 'copy icon',
      title: 'Copy',
      action: handleCopyText,
    },
  ];

  // if (isLoading) return <DetectedTextareaSkeleton />;
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <textarea
        name='detect-language'
        id='detect-language'
        maxLength={500}
        value={textareaInput}
        onChange={(e) => dispatch(setTextareaInput(e.target.value))}
        placeholder='Enter text to translate...'
        className='w-full min-h-24 max-h-24 bg-transparent text-white text-sm font-bold tracking-wider outline-none border-none mt-4 resize-none placeholder:text-white/30 caret-sky-600'
      ></textarea>
      {/* textarea length */}
      <motion.p
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: 'easeInOut' }}
        className='text-white/50 text-xs font-bold tracking-wider text-right'
      >
        {textareaLength}/500
      </motion.p>
      {/* icons and translate button */}
      <div className='flex justify-between items-center'>
        {/* Icons */}
        <div className='flex gap-4'>
          <AnimatePresence mode='popLayout'>
            {DetectActionBtns.map((icon, idx) => (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.2 }}
                key={`${icon.title}`}
                type='button'
                onClick={icon.action}
                className='border-1 border-white/10 p-1 rounded-md hover:bg-white/10 cursor-pointer'
              >
                {icon.title === 'Copy' && copied ? (
                  <span className='size-5'>✔️</span>
                ) : (
                  <img src={icon.icon} alt={icon.alt} className='size-5' />
                )}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
        {/* Translate button */}
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeInOut' }}
          type='submit'
          disabled={textareaInput.trim().length === 0}
          className={`flex flex-row-reverse gap-2 items-center justify-center bg-sky-600 text-white border-1 border-white text-sm font-bold tracking-wider px-4 py-2 rounded-xl cursor-pointer hover:bg-sky-700  disabled:bg-sky-600/50 disabled:text-white/30 disabled:cursor-not-allowed`}
        >
          Translate
          <span>
            {textareaInput.trim().length === 0 ? (
              '🚫​'
            ) : (
              <img src={sortAlpaIcon} alt='sort alpa icon' className='size-5' />
            )}
          </span>
        </motion.button>
      </div>
    </form>
  );
};

export default DetectTextareaForm;
