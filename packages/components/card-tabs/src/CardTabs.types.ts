import { WithHTMLAttributes } from '@synerise/ds-utils';
import { ReactElement } from 'react';
import type { CardTabProps } from './CardTab/CardTab.types';

export type CardTabsPropsBase<IdType extends string | number> = {
  onChangeOrder?: (newOrder: CardTabProps<IdType>[]) => void;
  onAddTab?: () => void;
  addTabLabel?: string;
  maxTabsCount?: number;
  children?: Array<ReactElement<CardTabProps<IdType>>>;
};

export type CardTabsProps<IdType extends string | number> = WithHTMLAttributes<
  HTMLDivElement,
  CardTabsPropsBase<IdType>
>;

/*
 * @deprecated use `CardTabProps`
 */
export type CardTabsItem = Partial<CardTabProps>;
