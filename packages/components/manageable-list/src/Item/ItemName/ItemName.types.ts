import type React from 'react';

import { type ItemProps } from '../Item.types';

export type ItemLabelProps = {
  item: ItemProps;
  onUpdate?: (updateParams: { id: React.ReactText; name: string }) => void;
  editMode: boolean;
  searchQuery?: string;
};
