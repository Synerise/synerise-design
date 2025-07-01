import React, { type ReactNode } from 'react';

import Alert from '@synerise/ds-alert';

type ErrorItemProps = {
  label: ReactNode;
};

export const ErrorItem = ({ label }: ErrorItemProps) => {
  return <Alert.InlineAlert type="alert" message={label} />;
};
