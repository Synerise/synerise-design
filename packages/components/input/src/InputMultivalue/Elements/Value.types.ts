import type React from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type ValueProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    disabled?: boolean;
    key?: string;
    onRemoveClick: () => void;
    value: React.ReactText;
    focused?: boolean;
  }
>;
