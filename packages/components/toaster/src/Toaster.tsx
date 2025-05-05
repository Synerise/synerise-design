import React from 'react';
import { Toaster as BaseToaster } from 'react-hot-toast';

import { useToaster } from './hooks/useToaster';

export const Toaster = () => {
  const { options } = useToaster();
  return <BaseToaster {...options} />;
};
