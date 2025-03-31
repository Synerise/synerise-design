import { WithHTMLAttributes } from '@synerise/ds-utils';
import { ReactElement } from 'react';
import type { CardTabProps } from './CardTab/CardTab.types';

export type CardTabsProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    onChangeOrder?: (newOrder: CardTabsItem[]) => void;
    onAddTab?: () => void;
    addTabLabel?: string;
    maxTabsCount?: number;
    children?: Array<ReactElement<CardTabProps>>;
  }
>;

/*
 * @deprecated use `CardTabProps`
 */
export type CardTabsItem = Partial<CardTabProps>;
