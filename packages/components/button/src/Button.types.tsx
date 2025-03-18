import type { ElementType, MouseEvent } from 'react';
import type { ButtonProps as AntdButtonProps } from 'antd/lib/button';
import type { JustifyContentProperty } from 'csstype';
import type { LiteralStringUnion } from '@synerise/ds-utils';
import type { TagProps } from '@synerise/ds-tag';

export type ButtonProps = Omit<AntdButtonProps, 'type'> & {
  /**
   * Defines the type of the button. It affects the button color
   *
   * @default secondary
   */
  type?: LiteralStringUnion<
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'tertiary-white'
    | 'ghost-primary'
    | 'ghost'
    | 'ghost-white'
    | 'custom-color'
    | 'custom-color-ghost'
  >;
  /**
   * Defines the type of the button content. It affects content inside the button
   *
   * @default simple
   */
  mode?: LiteralStringUnion<'single-icon' | 'split' | 'two-icons' | 'label-icon' | 'icon-label'>;
  /**
   * Defines color of `custom-color` button.
   *
   * @default red
   */
  color?: LiteralStringUnion<
    'blue' | 'grey' | 'red' | 'green' | 'yellow' | 'pink' | 'mars' | 'orange' | 'fern' | 'cyan' | 'purple' | 'violet'
  >;
  /**
   * Defines shape of the button.
   */
  groupVariant?: LiteralStringUnion<'left-rounded' | 'squared' | 'right-rounded'>;
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
    'blue' | 'grey' | 'red' | 'green' | 'yellow' | 'pink' | 'mars' | 'orange' | 'fern' | 'cyan' | 'purple' | 'violet'
  >;
  error?: boolean;
  activated?: boolean;
  readOnly?: boolean;
  tagProps?: TagProps;
};

// @deprecated - use ButtonProps instead
export type Props = ButtonProps;

export type ButtonSubComponents = {
  Expander: ElementType;
  Creator: ElementType;
};
