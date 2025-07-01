import React from 'react';

import Icon from '@synerise/ds-icon';
import ListItem from '@synerise/ds-list-item';

import { type SubjectItem } from '../Subject.types';

type Props = {
  item: SubjectItem;
  clearSearch: () => void;
  searchQuery: string;
  hideDropdown: () => void;
  select: (item: SubjectItem) => void;
  className: string;
};

const SubjectListItem = ({
  item,
  clearSearch,
  searchQuery,
  hideDropdown,
  select,
  className,
}: Props) => {
  return (
    <ListItem
      className={className}
      highlight={searchQuery}
      onClick={(): void => {
        hideDropdown();
        clearSearch();
        select(item);
      }}
      prefixel={<Icon component={item.icon} />}
    >
      {item.name}
    </ListItem>
  );
};

export default SubjectListItem;
