import { useDispatch, useSelector } from 'react-redux';
import {
  getLanguages,
  // setSelectedLanguage,
  setTranslateLang,
} from '../store/slices/languagesSlice';
import expandIcon from '../assets/image/Expand_down.svg';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
// import SelectedLangSkeleton from './skeletons/SelectedLangSkeleton';

const SelectedLanguage = ({ translateLang = false }) => {
  const [expanded, setExpanded] = useState(false);
  const {
    languages,
    selectedLanguage,
    translateDefaultLang,
    // isLoading
  } = useSelector((state) => state.langs);
  const dispatch = useDispatch();

  const handleLanguage = (lang, code) => {
    // if (translateLang) {
    dispatch(setTranslateLang({ lang, code }));
    // } else {
    //   dispatch(setSelectedLanguage({ lang, code }));
    // }
    setExpanded(false);
  };

  useEffect(() => {
    dispatch(getLanguages());
  }, [dispatch]);

  return (
    <main className={`${translateLang ? 'relative' : ''} ml-auto`}>
      <button
        className='text-white text-md font-bold cursor-pointer'
        onClick={() => setExpanded(!expanded)}
      >
        {translateLang ? translateDefaultLang : selectedLanguage}
        {translateLang ? (
          <img
            src={expandIcon}
            alt='expand icon'
            className={`${
              expanded ? 'rotate-180' : 'rotate-0'
            } inline-block ml-2`}
          />
        ) : null}
      </button>
      {/* Loading Skeleton */}
      {/* {isLoading && translateLang ? <SelectedLangSkeleton /> : null} */}
      {/* Dropdown Of Languages */}
      {translateLang ? (
        <ul
          className={`${
            expanded ? 'scale-100' : 'scale-0'
          } h-44 rounded-xl p-1 absolute top-10 right-0 z-10 bg-white flex flex-col overflow-y-scroll overflow-x-hidden`}
        >
          {/* {expanded && */}
          <AnimatePresence mode='popLayout'>
            {expanded &&
              languages.map((lang, idx) => (
                <motion.li
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  // viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: idx * 0.02 }}
                  key={lang.code}
                  className=' text-gray-700 text-md capitalize font-bold '
                >
                  <button
                    type='button'
                    className='w-full p-2 hover:bg-sky-500 hover:text-white rounded cursor-pointer'
                    onClick={() => handleLanguage(lang.name, lang.code)}
                  >
                    {lang.name}
                  </button>
                </motion.li>
              ))}
          </AnimatePresence>
        </ul>
      ) : null}
    </main>
  );
};

export default SelectedLanguage;
