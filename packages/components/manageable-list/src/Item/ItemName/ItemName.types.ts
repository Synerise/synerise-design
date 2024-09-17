import React from 'react';
import { ItemProps } from '../Item.types';

export type ItemLabelProps = {
  item: ItemProps;
  onUpdate?: (updateParams: { id: React.ReactText; name: string }) => void;
  editMode: boolean;
  searchQuery?: string;
};
