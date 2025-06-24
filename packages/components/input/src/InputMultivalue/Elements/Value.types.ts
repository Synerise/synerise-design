import { WithHTMLAttributes } from '@synerise/ds-utils';
import React from 'react';

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
