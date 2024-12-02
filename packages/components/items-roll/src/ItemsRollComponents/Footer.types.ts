import type { ReactNode } from 'react';
import type { Texts, ItemsRollProps } from '../ItemsRoll.types';

export type FooterProps = Pick<ItemsRollProps, 'onClearAll' | 'maxToShowItems' | 'showMoreStep'> & {
  allTexts: { [k in Texts]: ReactNode };
  itemsCount: number;
  showAdditionalItems: () => void;
  showDefaultItemsAmount: () => void;
  visibleItemsCount: number;
  searchMode: boolean;
};

export type ShowLessButtonProps = {
  showDefaultItemsAmount: () => void;
  showLessLabel: ReactNode;
};

export type ShowMoreButtonProps = {
  getShowMoreNumber: number;
  moreLabel: ReactNode;
  showAdditionalItems: () => void;
  showLabel: ReactNode;
};
