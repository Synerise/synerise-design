import type {
  ComponentType,
  ForwardRefExoticComponent,
  Key,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  RefAttributes,
} from 'react';
import { type StyledComponent } from 'styled-components';

import {
  type LegacyPlacement,
  type PopoverOptions,
} from '@synerise/ds-popover';
import type { TooltipProps } from '@synerise/ds-tooltip';
import type { WithHTMLAttributes } from '@synerise/ds-utils';

export type AddonRenderer = (hovered: boolean) => ReactNode;

export const itemTypes = {
  DEFAULT: 'default',
  DANGER: 'danger',
  DIVIDER: 'divider',
  SELECT: 'select',
  HEADER: 'header',
} as const;

export const itemSizes = {
  DEFAULT: 'default',
  LARGE: 'large',
} as const;

export type ItemType = (typeof itemTypes)[keyof typeof itemTypes];
export type ItemSize = (typeof itemSizes)[keyof typeof itemSizes];

export type ItemData<EventType = MouseEvent | KeyboardEvent> = {
  key?: Key;
  item: Partial<BasicItemProps>;
  domEvent: EventType;
};

export type ListItemEventHandler<EventType> = (
  item: ItemData<EventType>,
) => void;

/**
 * @deprecated
 * provide Copyable type instead
 */
type CopyableBoolean = boolean;
export type Copyable = {
  timeToReset?: number;
  copyValue: string;
  copiedLabel?: ReactNode;
  delayClickEvent?: number | false;
};

export type BaseListItemProps = ListItemDividerProps & {
  checked?: boolean;
  selected?: boolean;
  children?: ReactNode;
  className?: string;
  copyable?: CopyableBoolean | Copyable;
  /**
   * @deprecated. Provide copyable: Copyable instead
   */
  copyValue?: string;
  /**
   * @deprecated - there's no hint on hover anymore
   */
  copyHint?: ReactNode;
  /**
   * @deprecated - there's no tooltip after copying anymore
   */
  copyTooltip?: ReactNode;
  /**
   * @deprecated - there's no tooltip after copying anymore
   */
  timeToHideTooltip?: number;
  /**
   * @deprecated - there's no tooltip after copying anymore
   */
  tooltipProps?: TooltipProps;
  description?: ReactNode;
  direction?: 'ltr' | 'rtl';
  disabled?: boolean;

  highlight?: string;
  popoverProps?: Pick<
    PopoverOptions,
    | 'getPopupContainer'
    | 'offsetConfig'
    | 'flipConfig'
    | 'shiftConfig'
    | 'initialOpen'
  > & {
    placement?: LegacyPlacement;
  };
  key?: Key;
  itemKey?: Key;
  noHover?: boolean;
  onItemHover?: ListItemEventHandler<MouseEvent<HTMLDivElement>>;
  onClick?: ListItemEventHandler<
    MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  >;
  ordered?: boolean;
  parent?: boolean;
  /**
   * Only relevant for items that have a `subMenu`. When `true`, clicking the row
   * fires `onClick` (e.g. to select the item) and expand/collapse is moved to the
   * suffix arrow. When omitted, clicking anywhere on the row toggles the sub-menu
   * (the default, backwards-compatible behaviour) and `onClick` is not called.
   */
  selectableParent?: boolean;
  prefixel?: ReactNode | AddonRenderer;
  prefixVisibilityTrigger?: 'hover' | 'default';
  renderHoverTooltip?: () => JSX.Element;
  size?: ItemSize;
  suffixel?: ReactNode | AddonRenderer;
  suffixVisibilityTrigger?: 'hover' | 'default';
  text?: ReactNode;
  type?: ItemType;
  subMenu?: ListItemProps[];
  /**
   * Initial open state of the item's `subMenu` (uncontrolled — read once on mount).
   * Defaults to `false`. Ignored when `subMenuOpen` is provided.
   */
  defaultSubMenuOpen?: boolean;
  /**
   * Controlled open state of the item's `subMenu`. When provided, the component no
   * longer manages open state internally — drive it together with `onSubMenuToggle`.
   */
  subMenuOpen?: boolean;
  /**
   * Fires with the next open state whenever the `subMenu` is toggled (row click in the
   * default mode, or the suffix arrow when `selectableParent` is set). Use to drive a
   * controlled `subMenuOpen`.
   */
  onSubMenuToggle?: (open: boolean) => void;
  indentLevel?: number;
  featured?: boolean;
};

export type ListItemProps = WithHTMLAttributes<
  HTMLDivElement,
  BaseListItemProps
>;
export type ListItemDividerProps = {
  level?: number;
  higher?: boolean;
};

export type NestedItemProps = {
  ItemComponent: ComponentType<ListItemProps>;
};

export type BasicItemProps = Omit<
  ListItemProps,
  'type' | 'text' | 'level' | 'higher'
> & {
  ItemComponent: ComponentType<ListItemProps>;
};

export type StyledListItem<CustomProps extends object = object> =
  StyledComponent<
    ForwardRefExoticComponent<ListItemProps & RefAttributes<HTMLDivElement>>,
    object,
    CustomProps,
    never
  >;
