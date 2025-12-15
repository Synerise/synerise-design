import type { TriggerProps } from 'rc-trigger';
import type {
  Component,
  ComponentType,
  ForwardRefExoticComponent,
  Key,
  KeyboardEvent,
  LegacyRef,
  MouseEvent,
  ReactNode,
  RefAttributes,
} from 'react';
import { type StyledComponent } from 'styled-components';

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

export type TriggerHandle = Component<TriggerProps> & {
  getPopupDomNode: () => HTMLElement;
};
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
  hoverTooltipProps?: Pick<
    TriggerProps,
    | 'onPopupVisibleChange'
    | 'onPopupClick'
    | 'mouseEnterDelay'
    | 'mouseLeaveDelay'
    | 'defaultPopupVisible'
    | 'action'
    | 'afterPopupVisibleChange'
    | 'popupPlacement'
    | 'getPopupContainer'
    | 'forceRender'
  > & {
    ref?: LegacyRef<TriggerHandle>;
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
  prefixel?: ReactNode | AddonRenderer;
  prefixVisibilityTrigger?: 'hover' | 'default';
  renderHoverTooltip?: () => JSX.Element;
  size?: ItemSize;
  suffixel?: ReactNode | AddonRenderer;
  suffixVisibilityTrigger?: 'hover' | 'default';
  text?: ReactNode;
  type?: ItemType;
  subMenu?: ListItemProps[];
  indentLevel?: number;
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
