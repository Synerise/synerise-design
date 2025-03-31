import React from 'react';
import ListItem from '@synerise/ds-list-item';
import Icon, { DragHandleM } from '@synerise/ds-icon';

export const SortableItem = ({ dragHandleProps, index, ...props }) => {  
  return <ListItem data-index={index} {...props} {...dragHandleProps} />;
};
export const SortableItemWithHandle = ({ dragHandleProps, index, ...props }) => {
  const prefixel = <Icon {...dragHandleProps} component={<DragHandleM />} />;
  return <ListItem data-index={index} {...props} prefixel={prefixel} />;
};
