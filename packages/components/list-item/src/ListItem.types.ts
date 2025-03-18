import type { Key, MouseEvent, Component, ReactNode, LegacyRef } from 'react';
import type { TriggerProps } from 'rc-trigger';
import type { TooltipProps } from '@synerise/ds-tooltip';
import type { WithHTMLAttributes } from '@synerise/ds-utils';

export type AddonRenderer = (hovered: boolean) => ReactNode;

export const itemTypes = {
  DEFAULT: 'default',
  DANGER: 'danger',
  DIVIDER: 'divider',
  SELECT: 'select',
} as const;

export const itemSizes = {
  DEFAULT: 'default',
  LARGE: 'large',
} as const;

export type ItemType = typeof itemTypes[keyof typeof itemTypes];
export type ItemSize = typeof itemSizes[keyof typeof itemSizes];

export type ItemData<EventType> = {
  key?: Key;
  item: Partial<BasicItemProps>;
  domEvent: EventType;
};

export type ListItemEventHandler<EventType> = (item: ItemData<EventType>) => void;

export type TriggerHandle = Component<TriggerProps> & { getPopupDomNode: () => HTMLElement };

export type ListItemProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    checked?: boolean;
    selected?: boolean;
    children?: ReactNode;
    className?: string;
    copyable?: boolean;
    copyHint?: ReactNode;
    copyValue?: string;
    copyTooltip?: ReactNode;
    description?: ReactNode;
    direction?: 'ltr' | 'rtl';
    disabled?: boolean;
    higher?: boolean;
    highlight?: string;
    hoverTooltipProps?: TriggerProps & { ref?: LegacyRef<TriggerHandle> };
    key?: Key;
    itemKey?: Key;
    level?: number;
    noHover?: boolean;
    onItemHover?: ListItemEventHandler<MouseEvent<HTMLDivElement>>;
    onClick?: ListItemEventHandler<MouseEvent<HTMLDivElement>>;
    ordered?: boolean;
    parent?: boolean;
    prefixel?: ReactNode | AddonRenderer;
    prefixVisibilityTrigger?: 'hover' | 'default';
    renderHoverTooltip?: () => JSX.Element;
    size?: ItemSize;
    suffixel?: ReactNode | AddonRenderer;
    suffixVisibilityTrigger?: 'hover' | 'default';
    text?: ReactNode;
    timeToHideTooltip?: number;
    tooltipProps?: TooltipProps;
    type?: ItemType;
  }
>;

export type BasicItemProps = Omit<ListItemProps, 'type' | 'text' | 'level' | 'higher'>;
