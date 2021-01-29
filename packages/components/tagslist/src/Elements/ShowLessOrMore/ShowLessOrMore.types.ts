import { TagsListTexts } from "../../TagsList.types"

export type Props = {
  onShowMore: (more: number) => void;
  onShowLess: (less: number) => void;
  totalItemsCount: number;
  visibleItemsCount: number;
  maxItemsToShow: number;
  step: number;
  texts: TagsListTexts | undefined;
};