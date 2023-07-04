import { ToastContent, ToastOptions, toast } from 'react-toastify';

export const useNotify = (options?: ToastOptions) => {
  const toastConfig: ToastOptions = {
    ...options,
    position: options?.position || toast.POSITION.TOP_RIGHT,
    theme: 'colored'
  };

  return {
    success: (message: ToastContent) => toast.success(message, toastConfig),
    warning: (message: ToastContent) => toast.warning(message, toastConfig),
    error: (message: ToastContent) => toast.error(message, toastConfig)
  };
};
