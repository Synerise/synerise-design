import React, { ReactNode } from 'react';

import { Loader } from '../ItemPickerList.styles';

export const LoadingItem = ({ label }: { label: ReactNode }) => {
  return <Loader size="M" label={label} />;
};
