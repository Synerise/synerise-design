import type {
  CSSProperties,
  ComponentType,
  MouseEvent,
  ReactNode,
} from 'react';

import { type ButtonProps, type ButtonType } from '@synerise/ds-button';
import { type TabsProps } from '@synerise/ds-tabs';

export type ModalSize =
  | 'small'
  | 'medium'
  | 'large'
  | 'extraLarge'
  | 'fullSize'
  | 'fullScreen';

type ModalButtonHandler =
  | ((e: MouseEvent<HTMLElement>) => void)
  | ((e: MouseEvent<HTMLElement>) => Promise<unknown>);

export type ModalProps = {
  /**
   * @deprecated - this prop will be removed soon
   */
  description?: ReactNode;
  /** Content rendered below the modal header */
  headerBottomBar?: ReactNode;
  /** Actions rendered in the top-right area of the header */
  headerActions?: ReactNode;
  title?: ReactNode;
  headerTabProps?: TabsProps;
  size?: ModalSize;

  bodyBackground?: 'white' | 'grey';
  /** Renders a minimal modal without header and footer chrome */
  blank?: boolean;

  disableScrollbar?: boolean;
  bodyFullWidth?: boolean;

  centered?: boolean;
  closable?: boolean;
  maskClosable?: boolean;

  open?: boolean;
  /** When true, unmounts children when the modal closes. When false (default), keeps children mounted but hidden. */
  destroyOnClose?: boolean;
  titleContainerStyle?: CSSProperties;
  /** Localised button labels */
  texts?: {
    okButton?: ReactNode;
    cancelButton?: ReactNode;
  };
  children?: ReactNode;
  /** Constrains modal height to a percentage of the viewport and wraps children in a scrollbar. Pass `true` for 80 vh or a number for a custom value. */
  maxViewportHeight?: true | number;
  getContainer?: () => HTMLElement;
  prefix?: ReactNode;
  infix?: ReactNode;
  suffix?: ReactNode;
  okButton?: ReactNode;
  cancelButton?: ReactNode;
  CustomFooterButton?: ComponentType<ButtonProps>;

  afterClose?: () => void;
  footer?: ReactNode;

  onCancel?: ModalButtonHandler;
  cancelText?: ReactNode;
  cancelButtonProps?: ButtonProps;

  onOk?: ModalButtonHandler;
  okText?: ReactNode;
  okButtonProps?: ButtonProps;
  okType?: ButtonType;

  bodyStyle?: CSSProperties;
  zIndex?: number;

  className?: string;
  style?: CSSProperties;
};

export type ModalContentProps = Omit<
  ModalProps,
  'getContainer' | 'open' | 'destroyOnClose'
> & {
  closeModal: () => void;
  hidden?: boolean;
};

export type ModalTitleProps = Pick<
  ModalContentProps,
  | 'headerActions'
  | 'headerTabProps'
  | 'onCancel'
  | 'titleContainerStyle'
  | 'blank'
  | 'description'
  | 'title'
  | 'headerBottomBar'
>;

export type ModalFooterProps = Pick<
  ModalContentProps,
  | 'footer'
  | 'prefix'
  | 'infix'
  | 'suffix'
  | 'okButton'
  | 'cancelButton'
  | 'CustomFooterButton'
  | 'texts'
  | 'onOk'
  | 'onCancel'
  | 'cancelText'
  | 'okText'
  | 'cancelButtonProps'
  | 'okType'
  | 'okButtonProps'
>;

export type ModalHandle = {
  destroy: () => void;
};

export type ModalRef = {
  scrollToTop: () => void;
  scrollToBottom: () => void;
};
