import type { ReactNode } from 'react';
import type { ButtonProps } from '@synerise/ds-button';
import type { TooltipProps } from '@synerise/ds-tooltip';
import type { BadgeProps } from '@synerise/ds-badge';
import { WithHTMLAttributes } from '@synerise/ds-utils';

export type ToolbarProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    children: ReactNode;
  }
>;

export type ToolbarLabelProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    children: ReactNode;
  }
>;

export type ToolbarGroupProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    children: ReactNode;
    isCompact?: boolean;
  }
>;

export type ToolbarButtonProps = Omit<ButtonProps, 'type'> & {
  type?: 'ghost-primary' | 'ghost' | 'custom-color-ghost';
  tooltipProps?: TooltipProps;
  badgeProps?: BadgeProps;
};
