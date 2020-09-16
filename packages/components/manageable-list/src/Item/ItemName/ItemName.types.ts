import { ItemProps } from '../Item';

export type ItemLabelProps = {
  item: ItemProps;
  onUpdate?: (updateParams: { id: string; name: string }) => void;
  editMode: boolean;
  searchQuery?: string;
};