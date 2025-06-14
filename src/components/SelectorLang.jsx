import { useEffect, memo, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLanguages,
  setSelectedLanguage,
} from '../store/slices/languagesSlice';
import expandIcon from '../assets/image/Expand_down.svg';

const LanguageButton = memo(({ name, code, selectedLanguage, onSelect }) => {
  const buttonClasses = useMemo(
    () =>
      `p-2 rounded-md hover:bg-gray-600/50 hover:text-white ${
        selectedLanguage === name ? 'text-white bg-gray-600/50' : ''
      }`,
    [selectedLanguage, name]
  );

  return (
    <li className='text-white/50 text-sm font-bold tracking-wider'>
      <button
        type='button'
        className={buttonClasses}
        onClick={() => onSelect(name)}
      >
        {name}
      </button>
    </li>
  );
});

LanguageButton.displayName = 'LanguageButton';

const SelectorLang = () => {
  const [expanded, setExpanded] = useState(false);
  const { languages, selectedLanguage } = useSelector((state) => state.langs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLanguages());
  }, [dispatch]);

  const handleLanguageSelect = useMemo(
    () => (name) => dispatch(setSelectedLanguage(name)),
    [dispatch]
  );

  const commonClasses = 'text-white/50 text-sm font-bold tracking-wider';
  const thirdLanguage = languages[2];
  const remainingLanguages = languages.slice(2);

  const mainLanguages = useMemo(
    () =>
      languages
        .slice(0, 2)
        .map((lang) => (
          <LanguageButton
            key={lang.code}
            {...lang}
            selectedLanguage={selectedLanguage}
            onSelect={handleLanguageSelect}
          />
        )),
    [languages, selectedLanguage, handleLanguageSelect]
  );

  return (
    <ul className='flex gap-3 ml-10 items-center'>
      {mainLanguages}
      {thirdLanguage && (
        <li className={`${commonClasses} relative`}>
          <button
            type='button'
            className='flex items-center gap-1 p-2 rounded-md hover:bg-gray-600/50 hover:text-white'
            onClick={() => {
              setExpanded(!expanded);
              handleLanguageSelect(thirdLanguage.name);
            }}
          >
            {thirdLanguage.name}
            <img src={expandIcon} alt='expand icon' />
          </button>
          {expanded && (
            <ul className='absolute top-full left-0 bg-gray-600/50 rounded-md h-40 overflow-x-hidden overflow-y-scroll'>
              {remainingLanguages.map((lang) => (
                <LanguageButton
                  key={lang.code}
                  {...lang}
                  selectedLanguage={selectedLanguage}
                  onSelect={handleLanguageSelect}
                />
              ))}
            </ul>
          )}
        </li>
      )}
    </ul>
  );
};

export default memo(SelectorLang);
