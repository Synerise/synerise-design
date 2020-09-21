import { ButtonProps } from 'antd/lib/button';
import { JustifyContentProperty } from 'csstype';
import * as React from 'react';

export type Props = Omit<ButtonProps, 'type'> & {
  /**
   * Defines the type of the button. It affects the button color
   *
   * @default secondary
   */
  type?:
    | string
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'tertiary-white'
    | 'ghost-primary'
    | 'ghost'
    | 'ghost-white'
    | 'custom-color'
    | 'custom-color-ghost';
  /**
   * Defines the type of the button content. It affects content inside the button
   *
   * @default simple
   */
  mode?: 'single-icon' | 'split' | 'two-icons' |'label-icon' | 'icon-label' | string;
  /**
   * Defines color of `custom-color` button.
   *
   * @default red
   */
  color?:
    | string
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
    | 'violet';
  /**
   * Defines shape of the button.
   */
  groupVariant?: string | 'left-rounded' | 'squared' | 'right-rounded';
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
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export type ButtonSubComponents ={
  Expander: React.ElementType;
  Creator: React.ElementType;
  Cruds: React.ElementType;
}