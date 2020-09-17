import * as React from 'react';
import { ListType } from '../ManageableList.types';
import ContentItem from './ContentItem/ContentItem';
import SimpleItem from './SimpleItem/SimpleItem';
import FilterItem from './FilterItem/FilterItem';
import { Props } from './Item.types';

const Item: React.FC<Props> = ({
  item,
  onRemove,
  onSelect,
  onUpdate,
  listType,
  onDuplicate,
  greyBackground,
  draggable,
  changeOrderDisabled,
  selected,
  texts,
  searchQuery,
  hideExpander,
  expanded,
  onExpand,
}) => {
  switch (listType) {
    case ListType.CONTENT:
      return (
        <ContentItem
          key={`item-${item.id}`}
          item={item}
          onDuplicate={onDuplicate}
          onUpdate={onUpdate}
          onRemove={onRemove}
          greyBackground={greyBackground}
          changeOrderDisabled={changeOrderDisabled}
          draggable={draggable}
          hideExpander={hideExpander}
          texts={texts}
          expanded={expanded}
          onExpand={onExpand}
        />
      );
    case ListType.FILTER:
      return (
        <FilterItem
          key={`item-${item.id}`}
          item={item}
          greyBackground={greyBackground}
          onSelect={onSelect}
          onDuplicate={onDuplicate}
          onRemove={onRemove}
          onUpdate={onUpdate}
          selected={selected}
          texts={texts}
          searchQuery={searchQuery}
        />
      );

    default:
      return (
        <SimpleItem
          key={`item-${item.id}`}
          item={item}
          onSelect={onSelect}
          onUpdate={onUpdate}
          onRemove={onRemove}
          texts={texts}
        />
      );
  }
};

export default Item;
