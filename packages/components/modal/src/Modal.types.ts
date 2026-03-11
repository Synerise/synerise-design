import { type ModalProps as AntdModalProps } from 'antd/lib/modal';
import type { CSSProperties, ComponentType, ReactNode } from 'react';

import { type ButtonProps } from '@synerise/ds-button';
import { type TabsProps } from '@synerise/ds-tabs';

/*
 * @deprecated use `ModalProps`
 */
export type Props = ModalProps;

export type ModalProps = {
  /**
   * @deprecated - this prop will be removed soon
   */
  description?: ReactNode;
  /** Content rendered below the modal header */
  headerBottomBar?: ReactNode;
  /** Actions rendered in the top-right area of the header */
  headerActions?: ReactNode;
  /** Props forwarded to the Tabs component rendered in the header */
  headerTabProps?: TabsProps;
  /** Predefined modal width */
  size?:
    | 'small'
    | 'medium'
    | 'large'
    | 'extraLarge'
    | 'fullSize'
    | 'fullScreen';
  /** Background color of the modal body */
  bodyBackground?: 'white' | 'grey';
  /** Renders a minimal modal without header and footer chrome */
  blank?: boolean;
  /** Custom styles applied to the title container */
  titleContainerStyle?: CSSProperties;
  /** Localised button labels */
  texts?: {
    okButton?: ReactNode;
    cancelButton?: ReactNode;
  };
  children?: ReactNode;
  /** Constrains modal height to a percentage of the viewport and wraps children in a scrollbar. Pass `true` for 80 vh or a number for a custom value. */
  maxViewportHeight?: true | number;
  /** When `true`, disables the automatic scrollbar wrapping applied by `maxViewportHeight` */
  disableScrollbar?: boolean;
} & AntdModalProps &
  ModalFooterBuilder;

/*
 * @deprecated use `ModalProps`
 */
export type ModalFooterBuilder = {
  prefix?: ReactNode;
  infix?: ReactNode;
  suffix?: ReactNode;
  okButton?: ReactNode;
  cancelButton?: ReactNode;
  /*
   * @deprecated use `CustomFooterButton`
   */
  DSButton?: ComponentType<ButtonProps>;
  CustomFooterButton?: ComponentType<ButtonProps>;
};
