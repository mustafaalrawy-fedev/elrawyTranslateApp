// components/Toast.js
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearToast } from '../store/slices/toastSlice';

const toastColors = {
  success: {
    bg: 'bg-green-600',
    icon: <CheckCircle className='w-5 h-5 text-white' />,
  },
  error: {
    bg: 'bg-red-600',
    icon: <XCircle className='w-5 h-5 text-white' />,
  },
  info: {
    bg: 'bg-blue-600',
    icon: <Info className='w-5 h-5 text-white' />,
  },
  warning: {
    bg: 'bg-yellow-500 text-black',
    icon: <AlertTriangle className='w-5 h-5 text-black' />,
  },
};

const positions = {
  topRight: 'top-6 right-6',
  topLeft: 'top-6 left-6',
  bottomRight: 'bottom-6 right-6',
  bottomLeft: 'bottom-6 left-6',
};

const Toast = ({ message, type = 'info', pos = 'topRight' }) => {
  const config = toastColors[type] || toastColors.info;
  const isVisible = !!message;
  //   const position = positions['topRight'];
  const position = positions[pos];

  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(clearToast());
      }, 1500);
    }
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`fixed ${position}  z-50 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 ${config.bg} text-white font-semibold`}
        >
          <div>{config.icon}</div>
          <p className='text-sm'>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
