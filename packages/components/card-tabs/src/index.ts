import * as CardTabStyles from './CardTab/CardTab.styles';
import * as MainCardTabsStyles from './CardTabs.styles';

export { default as CardTab } from './CardTab/CardTab';
export { CardDot } from './CardTab/CardTab.styles';
export { type CardTabProps, prefixType } from './CardTab/CardTab.types';
export { default } from './CardTabs';

export const CardTabsStyles = {
  CardTabs: MainCardTabsStyles,
  CardTab: CardTabStyles,
};

export type {
  CardTabsItem,
  CardTabsProps,
  CardTabsPropsBase,
} from './CardTabs.types';
