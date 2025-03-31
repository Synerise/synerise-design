import * as CardTabStyles from './CardTab/CardTab.styles';
import * as MainCardTabsStyles from './CardTabs.styles';

export { default } from './CardTabs';
export { default as CardTab } from './CardTab/CardTab';
export { prefixType } from './CardTab/CardTab.types';

export const CardTabsStyles = { CardTabs: MainCardTabsStyles, CardTab: CardTabStyles };

export type { CardTabsItem, CardTabsProps } from './CardTabs.types';
export type { CardTabProps } from './CardTab/CardTab.types';
