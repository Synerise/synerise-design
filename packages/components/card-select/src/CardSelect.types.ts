import type { Key, ReactNode } from 'react';

import type { TagProps } from '@synerise/ds-tag';
import type { TooltipProps } from '@synerise/ds-tooltip';

type CardSelectTagProps = Omit<
  TagProps,
  'shape' | 'removable' | 'asPill' | 'onRemove' | 'image' | 'texts'
>;

export type CardSelectAlignType = 'left' | 'center' | 'right';
export type CardSelectSizeType = 'small' | 'medium';

export type CardSelectProps = {
  icon?: ReactNode;
  key?: Key;
  raised?: boolean;
  description?: ReactNode;
  title?: ReactNode;
  value?: boolean;
  disabled?: boolean;
  tickVisible?: boolean;
  size?: CardSelectSizeType;
  className?: string;
  iconSize?: number;
  tickSize?: number;
  stretchToFit?: boolean;
  customTickVisible?: boolean;
  customTickVisibleComponent?: ReactNode;
  tagProps?: CardSelectTagProps;
  tagTooltipProps?: TooltipProps;
  infoTooltipProps?: TooltipProps;
  /** @deprecated */
  theme?: { [k: string]: string };
  onChange?: (value: boolean) => void;
  onClick?: () => void;
  elementsPosition?: CardSelectAlignType;
  error?: boolean;
};
