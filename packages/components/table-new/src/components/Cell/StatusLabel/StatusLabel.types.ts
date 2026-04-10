import { type ReactNode } from 'react';

import { type Color, type Status } from '@synerise/ds-badge/dist/Badge.types';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type BaseStatusLabelProps = {
  status?: Status;
  label: ReactNode;
  customColor?: Color;
  disabled?: boolean;
};

export type StatusLabelProps = WithHTMLAttributes<
  HTMLDivElement,
  BaseStatusLabelProps
>;

/**
 *  @deprecated
 */
export type Props = StatusLabelProps;
