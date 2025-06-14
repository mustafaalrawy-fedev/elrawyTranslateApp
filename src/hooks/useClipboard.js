import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToast } from '../store/slices/toastSlice';

export const useClipboard = () => {
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();

  const copy = async (text) => {
    if (!text.trim()) {
      dispatch(
        setToast({
          message: 'Please enter a valid text',
          type: 'error',
          pos: 'topLeft',
        })
      );
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      dispatch(
        setToast({
          message: 'Copied to clipboard',
          type: 'info',
          pos: 'bottomLeft',
        })
      );
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      dispatch(
        setToast({
          message: 'Failed to copy',
          type: 'warning',
          pos: 'bottomLeft',
        })
      );
      console.log(error);
    }
  };

  return { copy, copied };
};
