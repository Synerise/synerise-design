import { TagsListTexts } from '../../TagsList.types';

export type Props = {
  onShowMore: (more: number) => void;
  onShowLess: (less: number) => void;
  totalItemsCount: number;
  visibleItemsCount: number;
  maxItemsToShow: number;
  showMoreStep: number;
  texts?: TagsListTexts;
};
