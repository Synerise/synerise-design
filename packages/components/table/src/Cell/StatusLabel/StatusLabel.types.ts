import { type ReactNode } from 'react';

import { type Color, type Status } from '@synerise/ds-badge/dist/Badge.types';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type StatusLabelProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    status?: Status;
    label: ReactNode;
    customColor?: Color;
    disabled?: boolean;
  }
>;

/**
 *  @deprecated
 */
export type Props = StatusLabelProps;
