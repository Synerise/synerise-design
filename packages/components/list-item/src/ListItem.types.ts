import type { Key, MouseEvent, Component, ReactNode, HTMLAttributes } from 'react';
import type { TriggerProps } from 'rc-trigger';
import type { TooltipProps } from '@synerise/ds-tooltip';

export type AddonRenderer = (hovered: boolean) => ReactNode;

export const itemTypes = {
  DEFAULT: 'default',
  DANGER: 'danger',
  DIVIDER: 'divider',
  SELECT: 'select',
} as const;

type ItemType = typeof itemTypes[keyof typeof itemTypes];

type ItemData<EventType> = {
  key?: Key;
  item: Partial<BasicItemProps>;
  domEvent: EventType;
};

type ListItemEventHandler<EventType> = (item: ItemData<EventType>) => void;

export type TriggerHandle = Component<TriggerProps> & { getPopupDomNode: () => HTMLElement };

export type ListItemProps = {
  checked?: boolean;
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
  hoverTooltipProps?: TriggerProps & { ref?: React.LegacyRef<TriggerHandle> };
  key?: Key;
  level?: number;
  noHover?: boolean;
  onItemHover?: ListItemEventHandler<MouseEvent<HTMLDivElement>>;
  onClick?: ListItemEventHandler<MouseEvent<HTMLDivElement>>;
  ordered?: boolean;
  parent?: boolean;
  prefixel?: ReactNode | AddonRenderer;
  prefixVisibilityTrigger?: 'hover' | 'default';
  renderHoverTooltip?: () => JSX.Element;
  size?: 'default' | 'large';
  suffixel?: ReactNode | AddonRenderer;
  suffixVisibilityTrigger?: 'hover' | 'default';
  text?: ReactNode;
  timeToHideTooltip?: number;
  title?: string;
  tooltipProps?: TooltipProps;
  type?: ItemType;
} & HTMLAttributes<HTMLDivElement>;

export type BasicItemProps = Omit<ListItemProps, 'type' | 'text' | 'level' | 'higher'>;
