import type { ReactNode } from 'react';
import type { InputProps } from '@synerise/ds-input';
import type { TooltipProps } from '@synerise/ds-tooltip';
import type { WithHTMLAttributes } from '@synerise/ds-utils';

export type SearchBarProps = WithHTMLAttributes<
  HTMLDivElement,
  Pick<InputProps, 'handleInputRef'> & {
    onSearchChange: (value: string) => void;
    onClearInput?: () => void;
    placeholder: ReactNode;
    className?: string;
    clearTooltip?: ReactNode;
    value: string;
    iconLeft?: ReactNode;
    autofocus?: boolean;
    autofocusDelay?: number;
    disabled?: boolean;
    borderRadius?: boolean;
    clearTooltipProps?: Partial<TooltipProps>;
  }
>;
