import { ReactNode } from 'react';
import { WithHTMLAttributes } from '@synerise/ds-utils';
import { Color, Status } from '@synerise/ds-badge/dist/Badge.types';

export type StatusLabelProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    status?: Status;
    label: ReactNode;
    customColor?: Color;
  }
>;

/**
 *  @deprecated
 */
export type Props = StatusLabelProps;
