import { Texts, ItemsRollProps } from '../ItemsRoll.types';

export type FooterProps = Pick<ItemsRollProps, 'onClearAll' | 'maxToShowItems' | 'showMoreStep'> & {
  allTexts: { [k in Texts]: string | React.ReactNode };
  itemsCount: number;
  showAdditionalItems: () => void;
  showDefaultItemsAmount: () => void;
  visibleItemsCount: number;
  searchMode: boolean;
};

export type ShowLessButtonProps = {
  showDefaultItemsAmount: () => void;
  showLessLabel: string | React.ReactNode;
};

export type ShowMoreButtonProps = {
  getShowMoreNumber: number;
  moreLabel: string | React.ReactNode;
  showAdditionalItems: () => void;
  showLabel: string | React.ReactNode;
};