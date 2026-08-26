import React, { type ReactNode } from 'react';

import InlineAlert from '@synerise/ds-inline-alert';

type ErrorItemProps = {
  label: ReactNode;
};

export const ErrorItem = ({ label }: ErrorItemProps) => {
  return <InlineAlert type="alert" message={label} />;
};
