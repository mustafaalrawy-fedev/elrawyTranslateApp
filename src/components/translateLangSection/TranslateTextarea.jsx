import soundIcon from '../../assets/image/sound_max_fill.svg';
import copyIcon from '../../assets/image/Copy.svg';
import { useSelector } from 'react-redux';
import TranslateTextareaSkeleton from '../skeletons/TranslateTextareaSkeleton';
import { AnimatePresence, motion } from 'motion/react';
import { speakText } from '../../utils/speakText';
import { useClipboard } from '../../hooks/useClipboard';

const TranslateTextarea = () => {
  const { translateData, translateDefaultLangCode, isLoading } = useSelector(
    (state) => state.langs
  );
  const { copy, copied } = useClipboard();

  const handleTranslateSpeakText = () => {
    speakText(
      translateData?.translatedText,
      translateDefaultLangCode || 'auto'
    );
  };

  const handleTranslateCopyText = () => {
    copy(translateData?.translatedText || '');
  };

  const translateActionBtns = [
    {
      icon: soundIcon,
      alt: 'sound icon',
      title: 'Listen',
      action: handleTranslateSpeakText,
    },
    {
      icon: copyIcon,
      alt: 'copy icon',
      title: 'Copy',
      action: handleTranslateCopyText,
    },
  ];

  if (isLoading) return <TranslateTextareaSkeleton />;
  return (
    <div className='flex flex-col gap-2'>
      <textarea
        name='detect-language'
        id='detect-language'
        maxLength={500}
        value={translateData?.translatedText}
        disabled={true}
        placeholder='Select Language to Translate!.....'
        className='placeholder:tracking-widest w-full min-h-24 max-h-24 bg-transparent text-white text-sm font-bold tracking-wider outline-none border-none mt-4 resize-none placeholder:text-white/30 caret-sky-600'
      ></textarea>
      <div className='flex gap-4 mt-6'>
        <AnimatePresence mode='popLayout'>
          {translateActionBtns.map((icon, idx) => (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.4 }}
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
    </div>
  );
};

export default TranslateTextarea;
