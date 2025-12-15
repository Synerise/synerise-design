import type { ButtonProps as AntdButtonProps } from 'antd/lib/button';
import type { JustifyContentProperty } from 'csstype';
import type {
  ForwardRefExoticComponent,
  MouseEvent,
  RefAttributes,
} from 'react';
import { type StyledComponent } from 'styled-components';

import type { TagProps } from '@synerise/ds-tag';
import type { TooltipProps } from '@synerise/ds-tooltip';
import type { LiteralStringUnion } from '@synerise/ds-utils';

export enum ButtonMode {
  SINGLE_ICON = 'single-icon',
  SPLIT = 'split',
  TWO_ICONS = 'two-icons',
  LABEL_ICON = 'label-icon',
  ICON_LABEL = 'icon-label',
}

type ButtonModes = `${ButtonMode}`;

export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'tertiary-white'
  | 'ghost-primary'
  | 'ghost'
  | 'ghost-white'
  | 'custom-color'
  | 'custom-color-ghost';

export type ButtonProps = Omit<AntdButtonProps, 'type' | 'ghost'> & {
  /**
   * Defines the type of the button. It affects the button color
   *
   * @default secondary
   */
  type?: LiteralStringUnion<ButtonType>;
  /**
   * Defines the type of the button content. It affects content inside the button
   *
   * @default simple
   */
  mode?: LiteralStringUnion<ButtonModes>;
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
   * Defines justify of content in button.
   */
  justifyContent?: JustifyContentProperty;
  /**
   * Set the loading status of button
   * @default false
   */
  loading?: boolean | { delay?: number };
  /**
   * Sets the handler to handle `click` event
   */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
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
  error?: boolean;
  readOnly?: boolean;
  tagProps?: TagProps;
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
