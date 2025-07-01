import type { ReactText } from 'react';

import { type AdditionalAction, type Texts } from '../../ManageableList.types';
import { type ItemProps } from '../Item.types';

export type Props = {
  item: ItemProps;
  onRemove?: (removeParams: { id: ReactText }) => void;
  onSelect: (selectParams: { id: ReactText }) => void;
  onUpdate?: (updateParams: { id: ReactText; name: string }) => void;
  texts?: Partial<Texts>;
  additionalActions?: AdditionalAction[];
  selected?: boolean;
};
