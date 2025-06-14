export const speakText = (text, langCode = 'en') => {
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();

  // Try to find a matching voice by language code
  const selectedVoice = voices.find((voice) =>
    voice.lang.toLowerCase().startsWith(langCode.toLowerCase())
  );

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.lang = selectedVoice?.lang || langCode;
  window.speechSynthesis.speak(utterance);
};
