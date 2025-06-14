import { useSelector } from 'react-redux';
import './App.css';
import logo from './assets/image/logo.svg';
import BackgroundImage from './components/BackgroundImage';
import DetectLanguage from './components/detectLangSection/DetectLanguage';
import SplashScreen from './components/SplashScreen';
import Toast from './components/Toast';
import TranslateLanguage from './components/translateLangSection/TranslateLanguage';

function App() {
  const { toast } = useSelector((state) => state.toast);

  return (
    <>
      <section className='w-full h-screen relative bg-[#020308]'>
        <BackgroundImage />
        <SplashScreen>
          <div className='absolute inset-0  flex flex-col items-center justify-center gap-5'>
            {/* logo */}
            <main>
              <img src={logo} alt='Logo' />
            </main>
            <article className='w-full px-5 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-2 justify-center items-center'>
              {/* detect language */}
              <DetectLanguage />
              {/* translate language */}

              <TranslateLanguage />
            </article>
          </div>
          <Toast {...toast} />
        </SplashScreen>
      </section>
    </>
  );
}

export default App;
