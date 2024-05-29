import type { ReactNode } from 'react';
import type { TagProps } from '@synerise/ds-tags';
import type { TooltipProps } from '@synerise/ds-tooltip';

type CardSelectTagProps = Omit<TagProps, 'shape' | 'removable' | 'asPill' | 'onRemove' | 'image' | 'texts'>;

export type CardSelectProps = {
  icon?: ReactNode;
  raised?: boolean;
  description?: ReactNode;
  title?: ReactNode;
  value?: boolean;
  disabled?: boolean;
  tickVisible?: boolean;
  size?: 'small' | 'medium';
  className?: string;
  iconSize?: number;
  tickSize?: number;
  stretchToFit?: boolean;
  customTickVisible?: boolean;
  customTickVisibleComponent?: ReactNode;
  tagProps?: CardSelectTagProps;
  tagTooltipProps?: TooltipProps;
  theme: { [k: string]: string };
  onChange?: (value: boolean) => void;
  onClick?: () => void;
  elementsPosition?: string | 'left' | 'center' | 'right';
  error?: boolean;
};
