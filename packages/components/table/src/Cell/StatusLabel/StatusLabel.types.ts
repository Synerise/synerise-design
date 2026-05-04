import { type ReactNode } from 'react';

import {
  type BadgeColor as Color,
  type BadgeStatus as Status,
} from '@synerise/ds-badge';
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
