import * as CardTabStyles from './CardTab/CardTab.styles';
import * as MainCardTabsStyles from './CardTabs.styles';

export { default } from './CardTabs';
export { default as CardTab } from './CardTab/CardTab';
export { prefixType, type CardTabProps } from './CardTab/CardTab.types';
export { CardDot } from './CardTab/CardTab.styles';

export const CardTabsStyles = {
  CardTabs: MainCardTabsStyles,
  CardTab: CardTabStyles,
};

export type {
  CardTabsItem,
  CardTabsProps,
  CardTabsPropsBase,
} from './CardTabs.types';
