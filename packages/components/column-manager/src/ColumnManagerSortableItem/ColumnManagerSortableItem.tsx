import React from 'react';

import { CSS, useSortable } from '@synerise/ds-sortable';

import { type Column } from '../ColumnManager.types';
import { ColumnManagerItem } from '../ColumnManagerItem/ColumnManagerItem';
import { type ColumnManagerSortableItemProps } from './ColumnManagerSortableItem.types';

export const ColumnManagerSortableItem = <ColumnType extends Column>(
  props: ColumnManagerSortableItemProps<ColumnType>,
) => {
  const { index, style: styleProp, data, ...rest } = props;
  const { id } = data[index];
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    ...styleProp,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      {...rest}
      key={`column-manager-item-${id}`}
      style={style}
      ref={setNodeRef}
    >
      <ColumnManagerItem
        {...data[index]}
        dragHandleProps={{ attributes, listeners }}
      />
    </div>
  );
};
