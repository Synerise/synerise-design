import * as CardTabStyles from './CardTab/CardTab.styles';
import * as MainCardTabsStyles from './CardTabs.styles';

export { default } from './CardTabs';
export { default as CardTab } from './CardTab/CardTab';
export type { CardTabsItem } from './CardTabs.types';
export { prefixType } from './CardTab/CardTab.types';
export type { CardTabProps } from './CardTab/CardTab.types';
export { COLORS_TABS } from './CardTab/ColorsTabs';

export const CardTabsStyles = { CardTabs: MainCardTabsStyles, CardTab: CardTabStyles };
