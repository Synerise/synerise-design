import type {
  CSSProperties,
  ComponentType,
  MouseEvent,
  ReactNode,
} from 'react';

import { type ButtonProps, type ButtonType } from '@synerise/ds-button';
import { type TabsProps } from '@synerise/ds-tabs';

/**
 * Predefined modal widths.
 *
 * - `small` — 520px
 * - `medium` — 792px
 * - `large` — 1044px
 * - `extraLarge` — 1280px
 * - `fullSize` — 100% width
 * - `fullScreen` — 100%, `fixed`-positioned, covering the viewport
 */
export type ModalSize =
  | 'small'
  | 'medium'
  | 'large'
  | 'extraLarge'
  | 'fullSize'
  | 'fullScreen';

/**
 * Handler for the OK / Cancel buttons. May be synchronous or return a
 * `Promise` — when a promise is returned, the modal stays open until it
 * resolves.
 */
type ModalButtonHandler =
  | ((e: MouseEvent<HTMLElement>) => void)
  | ((e: MouseEvent<HTMLElement>) => Promise<unknown>);

/** Props for the {@link Modal} component. */
export type ModalProps = {
  /**
   * Sub-title rendered with a dashed separator below the title.
   * @deprecated this prop will be removed soon
   */
  description?: ReactNode;
  /** Full-width bar rendered below the modal header. */
  headerBottomBar?: ReactNode;
  /** Actions (buttons/icons) rendered in the top-right area of the header. */
  headerActions?: ReactNode;
  /** Modal header title. */
  title?: ReactNode;
  /** When provided, renders a `Tabs` component in the header. */
  headerTabProps?: TabsProps;
  /** Predefined modal width. @see {@link ModalSize} */
  size?: ModalSize;

  /**
   * Accessible name for the dialog, exposed via `aria-label`. Used as a
   * fallback when `title` is absent (e.g. `blank` modals) or is a non-text
   * node. When `title` is set it takes precedence via `aria-labelledby`.
   */
  ariaLabel?: string;
  /**
   * Accessible name for the close button, exposed via `aria-label`. When
   * omitted, falls back to the localised `DS.MODAL.CLOSE` translation
   * (default message `'Close'`).
   */
  closeButtonAriaLabel?: string;

  /**
   * Background colour of the modal body.
   * @defaultValue `'white'`
   */
  bodyBackground?: 'white' | 'grey';
  /**
   * Renders a minimal modal without header/footer chrome; shows only a close
   * button when `onCancel` is provided.
   */
  blank?: boolean;

  /** When `maxViewportHeight` is set, disables the built-in scrollbar wrapper. */
  disableScrollbar?: boolean;
  /** Removes the padding from the modal body. */
  bodyFullWidth?: boolean;

  /**
   * Vertically centres the modal in the viewport.
   * @defaultValue `false`
   */
  centered?: boolean;
  /**
   * Whether the close button is shown.
   * @defaultValue `true`
   */
  closable?: boolean;
  /**
   * Whether clicking the backdrop closes the modal.
   * @defaultValue `true`
   */
  maskClosable?: boolean;

  /**
   * Whether the modal is visible.
   * @defaultValue `false`
   */
  open?: boolean;
  /**
   * When `true`, unmounts children when the modal closes. When `false`
   * (default), keeps children mounted but hidden.
   * @defaultValue `false`
   */
  destroyOnClose?: boolean;
  /** Inline styles applied to the title container element. */
  titleContainerStyle?: CSSProperties;
  /**
   * Localised default button labels.
   * @defaultValue `{ okButton: 'Apply', cancelButton: 'Cancel' }`
   */
  texts?: {
    /** Label for the OK / Apply button. */
    okButton?: ReactNode;
    /** Label for the Cancel button. */
    cancelButton?: ReactNode;
  };
  /** Modal body content. */
  children?: ReactNode;
  /**
   * Constrains modal height to a percentage of the viewport and wraps children
   * in a scrollbar. Pass `true` for 80 vh or a number for a custom value.
   * Anchors the modal to the bottom of the viewport (sheet-style).
   */
  maxViewportHeight?: true | number;
  /**
   * Returns the DOM node the modal portal mounts into.
   * @defaultValue `document.body`
   */
  getContainer?: () => HTMLElement;
  /** Footer slot rendered before the cancel button. */
  prefix?: ReactNode;
  /** Footer slot rendered between the cancel and OK buttons. */
  infix?: ReactNode;
  /** Footer slot rendered after the OK button. */
  suffix?: ReactNode;
  /** Replaces the auto-generated OK button entirely. */
  okButton?: ReactNode;
  /** Replaces the auto-generated cancel button entirely. */
  cancelButton?: ReactNode;
  /**
   * Custom button component used for the auto-generated ok/cancel buttons.
   * @defaultValue `Button`
   */
  CustomFooterButton?: ComponentType<ButtonProps>;

  /**
   * Called after each close transition (every `open: true → false`), matching
   * antd Modal semantics. Does NOT fire on initial mount, and does NOT fire if
   * the Modal is hard-unmounted while still open.
   */
  afterClose?: () => void;
  /**
   * Custom footer content. `null` suppresses the footer entirely; a custom
   * node overrides the auto-generated footer.
   * @defaultValue auto-generated OK + Cancel buttons
   */
  footer?: ReactNode;

  /** Cancel/close handler; may return a `Promise`. @see {@link ModalButtonHandler} */
  onCancel?: ModalButtonHandler;
  /** Label for the cancel button (overrides `texts.cancelButton`). */
  cancelText?: ReactNode;
  /** Extra props forwarded to the cancel button. */
  cancelButtonProps?: ButtonProps;

  /** OK button handler; may return a `Promise`. @see {@link ModalButtonHandler} */
  onOk?: ModalButtonHandler;
  /** Label for the OK button (overrides `texts.okButton`). */
  okText?: ReactNode;
  /** Extra props forwarded to the OK button. */
  okButtonProps?: ButtonProps;
  /**
   * Button type for the OK button.
   * @defaultValue `'primary'`
   */
  okType?: ButtonType;

  /** Inline styles applied to the modal body element. */
  bodyStyle?: CSSProperties;
  /**
   * `z-index` of the modal root.
   * @defaultValue theme `zindex-modal`
   */
  zIndex?: number;

  /** CSS class applied to the modal root. */
  className?: string;
  /** Inline styles applied to the modal root. */
  style?: CSSProperties;
};

/**
 * Props for the internal `ModalContent` element. Extends {@link ModalProps}
 * minus the props handled by the `Modal` wrapper, plus the internal close
 * callback and hidden state.
 */
export type ModalContentProps = Omit<
  ModalProps,
  'getContainer' | 'open' | 'destroyOnClose' | 'afterClose'
> & {
  /** Closes the modal (drives the wrapper's open state). */
  closeModal: () => void;
  /** When `true`, the modal is kept mounted but visually hidden. */
  hidden?: boolean;
};

/** Props for the `ModalTitle` header sub-component. */
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
  | 'closeButtonAriaLabel'
> & {
  /** Id applied to the title element, referenced by the dialog's `aria-labelledby`. */
  titleId?: string;
  /** Id applied to the description element, referenced by the dialog's `aria-describedby`. */
  descriptionId?: string;
};

/** Props for the `ModalFooter` footer sub-component. */
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

/** Imperative handle returned by `showModal()`. */
export type ModalHandle = {
  /** Unmounts the imperatively-rendered modal. */
  destroy: () => void;
};

/** Ref handle exposed by `Modal` via `forwardRef` for scroll control. */
export type ModalRef = {
  /** Scrolls the modal body to the top. */
  scrollToTop: () => void;
  /** Scrolls the modal body to the bottom. */
  scrollToBottom: () => void;
};
