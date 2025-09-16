import type { ReactText } from 'react';

import {
  type AdditionalAction,
  type ItemProps,
  type Texts,
} from '../../ManageableList.types';

export type Props = {
  item: ItemProps;
  onRemove?: (removeParams: { id: ReactText }) => void;
  onSelect: (selectParams: { id: ReactText }) => void;
  onUpdate?: (updateParams: { id: ReactText; name: string }) => void;
  texts?: Partial<Texts>;
  additionalActions?: AdditionalAction[];
  selected?: boolean;
};
