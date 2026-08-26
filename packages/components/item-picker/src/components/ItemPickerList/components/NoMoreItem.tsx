import React, { type ReactNode } from 'react';

import InlineAlert from '@synerise/ds-inline-alert';

export const NoMoreItem = ({ label }: { label: ReactNode }) => {
  return <InlineAlert type="info" message={label} />;
};
