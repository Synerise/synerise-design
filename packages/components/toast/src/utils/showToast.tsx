import React from 'react';
import toast from 'react-hot-toast';
import { Toast } from '../Toast';
import { ShowToastProps, ToastCustomisationOptions, ToastType } from '../Toast.types';

export const showToast = (type: ToastType, props: ShowToastProps, options?: ToastCustomisationOptions) => {
  return toast.custom(<Toast {...props} type={type} />, options);
};
