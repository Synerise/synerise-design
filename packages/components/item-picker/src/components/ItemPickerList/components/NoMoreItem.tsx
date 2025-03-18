import React, { ReactNode } from 'react';
import Alert from '@synerise/ds-alert';

export const NoMoreItem = ({ label }: { label: ReactNode }) => {
  return <Alert.InlineAlert type="info" message={label} />;
};
