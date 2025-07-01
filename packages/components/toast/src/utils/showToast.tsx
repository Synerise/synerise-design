import React from 'react';
import toast from 'react-hot-toast';

import { Toast } from '../Toast';
import {
  type ShowToastProps,
  type ToastCustomisationOptions,
  type ToastType,
} from '../Toast.types';

export const showToast = (
  type: ToastType,
  props: ShowToastProps,
  options?: ToastCustomisationOptions,
) => {
  return toast.custom(<Toast {...props} type={type} />, options);
};
