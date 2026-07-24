import { type CSSProperties, type Key, type ReactNode } from 'react';

import { type RadioGroupProps } from '@synerise/ds-radio';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type ListSize = 'small' | 'default' | 'large';
export type ListItemLayout = 'horizontal' | 'vertical';

export type ListPropsType<T> = WithHTMLAttributes<
  HTMLDivElement,
  {
    /** Flat list, or an array of groups rendered as separate lists split by a divider. */
    dataSource: T[] | T[][];
    /** Render a single item. Receives the flattened per-item value and its index. */
    renderItem?: (item: T, index: number) => ReactNode;
    /** Rendered once, above the (first) list. */
    header?: ReactNode;
    /** Wrap the list in a border. */
    bordered?: boolean;
    /** Keep the `ant-list-split` hook (borders between items). Defaults to `true`. */
    split?: boolean;
    /** Show a centered loading indicator instead of the items. */
    loading?: boolean;
    itemLayout?: ListItemLayout;
    size?: ListSize;
    /** Node rendered after the items (e.g. a "load more" button). */
    loadMore?: ReactNode;
    /** Key extractor for items. Defaults to the item index. */
    rowKey?: keyof T | ((item: T) => Key);
    className?: string;
    style?: CSSProperties;
    /** Rendered in place of `dataSource`/`renderItem` when no `renderItem` is given. */
    children?: ReactNode;
    /** Wrap the list in a `Radio.Group` (single-select list). */
    radio?: boolean;
    /** Props forwarded to the wrapping `Radio.Group` when `radio` is set. */
    options?: RadioGroupProps;
    /** Dashed divider between groups (nested `dataSource`). */
    dashed?: boolean;
  }
>;
