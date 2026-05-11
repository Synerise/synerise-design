import type {
  ForwardRefExoticComponent,
  MouseEvent,
  ReactNode,
  RefAttributes,
} from 'react';
import { type StyledComponent } from 'styled-components';

import type { TagProps } from '@synerise/ds-tag';
import type { TooltipProps } from '@synerise/ds-tooltip';
import type { LiteralStringUnion } from '@synerise/ds-utils';

import type { BaseButtonProps } from './BaseButton.types';

export const ButtonMode: Record<string, ButtonMode> = {
  SINGLE_ICON: 'single-icon',
  SPLIT: 'split',
  TWO_ICONS: 'two-icons',
  LABEL_ICON: 'label-icon',
  ICON_LABEL: 'icon-label',
};

export type ButtonMode =
  | 'single-icon'
  | 'split'
  | 'two-icons'
  | 'label-icon'
  | 'icon-label';

export type ButtonType = LiteralStringUnion<
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'tertiary-white'
  | 'ghost-primary'
  | 'ghost'
  | 'ghost-white'
  | 'custom-color'
  | 'custom-color-ghost'
  | 'danger'
  | 'success'
  | 'warning'
>;

export type ButtonProps = Omit<BaseButtonProps, 'type'> & {
  /**
   * Defines the type of the button. It affects the button color
   *
   * @default secondary
   */
  type?: ButtonType;
  /**
   * Defines the type of the button content. It affects content inside the button
   *
   * @default simple
   */
  mode?: LiteralStringUnion<ButtonMode>;
  /**
   * Defines color of `custom-color` button.
   *
   * @default red
   */
  color?: LiteralStringUnion<
    | 'blue'
    | 'grey'
    | 'red'
    | 'green'
    | 'yellow'
    | 'pink'
    | 'mars'
    | 'orange'
    | 'fern'
    | 'cyan'
    | 'purple'
    | 'violet'
  >;
  /**
   * Defines shape of the button.
   */
  groupVariant?: LiteralStringUnion<
    'left-rounded' | 'squared' | 'right-rounded'
  >;
  /**
   * Set the loading status of button
   * @default false
   */
  loading?: boolean | { delay?: number };
  /**
   * Icon element rendered inside the button label.
   * Placed before text in `icon-label` / `single-icon` modes, after text in `label-icon` mode.
   */
  icon?: ReactNode;
  /**
   * Sets the handler to handle `click` event
   */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  /** Overrides the icon color on secondary, tertiary, and ghost variants */
  iconColor?: LiteralStringUnion<
    | 'blue'
    | 'grey'
    | 'red'
    | 'green'
    | 'yellow'
    | 'pink'
    | 'mars'
    | 'orange'
    | 'fern'
    | 'cyan'
    | 'purple'
    | 'violet'
  >;
  /** Applies red error styling to the button */
  error?: boolean;
  /** Disables hover and focus visual changes while keeping the button visually enabled */
  readOnly?: boolean;
  /** Renders a pill tag after the button label */
  tagProps?: TagProps;
  /** Wraps the button label in a tooltip */
  tooltipProps?: TooltipProps;
};

/** @deprecated - use ButtonProps instead */
export type Props = ButtonProps;

export type StyledButton<CustomProps extends object = object> = StyledComponent<
  ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement>>,
  object,
  CustomProps,
  never
>;
