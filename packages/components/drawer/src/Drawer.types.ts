import {
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PropsWithChildren,
} from 'react';

import { type PassthroughAttributes } from '@synerise/ds-utils';

import { type DrawerPlacement } from './Drawer.styles';

export type { DrawerPlacement };

export type DrawerCloseTrigger = MouseEvent | KeyboardEvent;

export type DrawerOwnProps = {
  /** Controlled open state. Preferred name (antd 5 alias). */
  open?: boolean;
  /** Controlled open state (antd 4 name). Kept for back-compat; `open` wins if both are set. */
  visible?: boolean;
  /** Edge the drawer slides in from. Defaults to `'right'` (the only placement in real use). */
  placement?: DrawerPlacement;
  /** Panel width for `left`/`right` placements. Number → px. Defaults to `256`. */
  width?: number | string;
  /** Panel height for `top`/`bottom` placements. Number → px. */
  height?: number | string;
  /** Render the dimming mask. Defaults to `true`. Pass `false` for an inline, non-modal drawer. */
  mask?: boolean;
  /** Close when the mask is clicked. Defaults to `true`. */
  maskClosable?: boolean;
  /** Close on `Escape`. Defaults to `true`. */
  keyboard?: boolean;
  /** Unmount children while closed instead of keeping them hidden. Defaults to `false`. */
  destroyOnClose?: boolean;
  /**
   * Portal target. A function returning the mount node (defaults to `document.body`),
   * or `false` to render inline in place (no portal) — pairs with `mask={false}`.
   */
  getContainer?: (() => HTMLElement) | false;
  /** z-index of the root overlay. Defaults to the `zindex-modal` design token. */
  zIndex?: number;
  /** Called when the mask is clicked or `Escape` is pressed. */
  onClose?: (event: DrawerCloseTrigger) => void;
  /** Called after the open/close slide transition completes, with the new open state. */
  afterVisibleChange?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
  /**
   * Never rendered visually — build the visible header via the
   * `Drawer.DrawerHeader*` sub-components. Used only as the dialog's fallback
   * accessible name when neither `aria-label` nor `aria-labelledby` is provided.
   */
  title?: string;
  /**
   * @deprecated No-op — kept only for back-compat. The drawer never renders its own
   * close affordance (`closable` was always forced off); build the header via the
   * `Drawer.DrawerHeader*` sub-components.
   */
  closable?: boolean;
  /**
   * Accessible name applied to the `role="dialog"` panel. Falls back to `title`
   * when omitted. Ignored when `aria-labelledby` is set.
   */
  'aria-label'?: string;
  /** ID of the element labelling the dialog. Takes precedence over `aria-label`. */
  'aria-labelledby'?: string;
};

export type DrawerProps = PropsWithChildren<DrawerOwnProps> &
  PassthroughAttributes;
