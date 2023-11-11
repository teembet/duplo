// Toast.js

import React from 'react';
import { ToastBar } from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import { useResponsive } from 'ahooks';
import { useToast } from '@/contexts/ToastContext';
import { ToastProps } from './types';


const Toast = ({ children }: ToastProps) => {
  const { toast } = useToast();
  const responsive = useResponsive();
  const isMobile = !responsive['lg'];

  const showToast = (type: 'success' | 'error' | 'loading', message: string) => {
    const toastOptions: any = {
      duration: 8000,
      style: {
        fontFamily: "'Hero New', sans-serif",
        fontSize: 'calc(var(--fluid-0) * 0.9)',
        fontWeight: 400,
      },
      loading: {
        icon: <CircularProgress size={22} />,
      },
    };

    if (type === 'success') {
      toastOptions.iconTheme = {
        primary: 'var(--green-dark)',
        secondary: 'white',
      };
      toastOptions.style = {
        background: 'var(--green-fainter)',
        color: 'black',
      };
    } else if (type === 'error') {
      toastOptions.iconTheme = {
        primary: 'var(--red-main)',
        secondary: 'white',
      };
      toastOptions.style = {
        background: 'var(--red-fainter)',
        color: 'var(--red-dark)',
      };
    }

    toast(message, toastOptions);
  };

  return (
    <>
      {children}
      {toast((t: any) => (
        <ToastBar
          toast={t}
          style={{
            maxWidth: 450,
          }}
        >
          {({ icon, message }: any) => (
            <>
              {!isMobile && <>{icon}</>}
              {message}
              <button
                className="text-black !text-opacity-40 hover:!text-opacity-100 !transition-all !duration-200 !ease-in-out !self-stretch !border-l !border-l-black !border-opacity-10 !pl-2 !text-[length:inherit]"
                onClick={() => toast.dismiss(t.id)}
              >
                Dismiss
              </button>
            </>
          )}
        </ToastBar>
      ))}
    </>
  );
};

export default Toast;
