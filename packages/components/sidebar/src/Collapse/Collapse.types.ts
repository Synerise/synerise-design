import { type CSSProperties, type ReactNode } from 'react';

import { type DataAttributes } from '@synerise/ds-utils';

export type CollapseKey = string | number;

export type CollapseExpandIconPosition = 'start' | 'end';

/** Props the `Collapse` injects into each panel child via `cloneElement`. */
export type CollapseInjectedProps = {
  isActive?: boolean;
  onItemClick?: () => void;
  expandIcon?: (panelProps: { isActive?: boolean }) => ReactNode;
  expandIconPosition?: CollapseExpandIconPosition;
};

export type CollapseProps = {
  /** Open panel id(s) — controlled. */
  activeKey?: CollapseKey | CollapseKey[];
  /** Initially open panel id(s) — uncontrolled. */
  defaultActiveKey?: CollapseKey | CollapseKey[];
  /** Fired with the open panel ids when a panel toggles. */
  onChange?: (key: string | string[]) => void;
  /** Only one panel open at a time. */
  accordion?: boolean;
  /** Render prop for the per-panel expand indicator. */
  expandIcon?: (panelProps: { isActive?: boolean }) => ReactNode;
  /** Where the expand icon sits. */
  expandIconPosition?: CollapseExpandIconPosition;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & DataAttributes;

export type CollapsePanelProps = {
  /** Panel id — drives the active-key matching. */
  id?: CollapseKey;
  header?: ReactNode;
  children?: ReactNode;
  /** Render the body even while collapsed. */
  forceRender?: boolean;
  /** Styling flag set by the sidebar drag overlay (consumed by the styled wrapper). */
  isDragOverlay?: boolean;
  className?: string;
} & CollapseInjectedProps &
  DataAttributes;
