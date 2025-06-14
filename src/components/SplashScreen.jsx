import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import { motion } from 'motion/react';
// import logo from '../assets/image/logo.svg';

const SplashScreen = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return loading ? (
    <section className='absolute w-screen h-screen flex flex-col justify-center items-center gap-10'>
      <motion.main
        initial={{ opacity: 0, scale: 0.5, y: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        eyit={{ opacity: 0, scale: 0.5, y: 30 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
      >
        {/* icon */}
        {/* <img src={logo} alt='logo' className='w-50 h-50 object-contain' /> */}
        <h1 className='text-4xl font-bold tracking-widest text-white'>
          Translate App
        </h1>
      </motion.main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] }}
      >
        <ProgressBar progress={100} />
      </motion.div>
    </section>
  ) : (
    <>{children}</>
  );
};

export default SplashScreen;
