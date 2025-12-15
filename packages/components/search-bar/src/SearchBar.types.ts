import type {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from 'react';
import { type StyledComponent } from 'styled-components';

import type { InputProps } from '@synerise/ds-input';
import type { TooltipProps } from '@synerise/ds-tooltip';
import type { WithHTMLAttributes } from '@synerise/ds-utils';

export type SearchBarProps = WithHTMLAttributes<
  HTMLDivElement,
  Partial<Pick<InputProps, 'handleInputRef'>> & {
    onSearchChange: (value: string) => void;
    onClearInput?: () => void;
    placeholder: ReactNode;
    clearTooltip?: ReactNode;
    value: string;
    iconLeft?: ReactNode;
    autofocus?: boolean;
    autofocusDelay?: number;
    disabled?: boolean;
    borderRadius?: boolean;
    clearTooltipProps?: Partial<TooltipProps>;
    valuePrefix?: ReactNode;
  }
>;

export type StyledSearchBar<CustomProps extends object = object> =
  StyledComponent<
    ForwardRefExoticComponent<SearchBarProps & RefAttributes<HTMLDivElement>>,
    object,
    CustomProps,
    never
  >;
