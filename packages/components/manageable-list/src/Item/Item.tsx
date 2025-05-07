import React from 'react';
import { ListType } from '../ManageableList.types';
import ContentItem from './ContentItem/ContentItem';
import SimpleItem from './SimpleItem/SimpleItem';
import FilterItem from './FilterItem/FilterItem';
import { Props } from './Item.types';
import BlankItem from './BlankItem/BlankItem';

const Item = ({
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
  onMoveBottom,
  onMoveTop,
  isFirst,
  isLast,
  additionalActions,
  renderItem,
}: Props) => {
  switch (listType) {
    case ListType.CONTENT:
    case ListType.CONTENT_LARGE:
      return (
        <ContentItem
          key={`item-${item.id}`}
          item={item}
          size={listType === ListType.CONTENT ? 'default' : 'large'}
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
          onMoveTop={onMoveTop}
          onMoveBottom={onMoveBottom}
          isFirst={Boolean(isFirst)}
          isLast={Boolean(isLast)}
        />
      );

    case ListType.BLANK:
      return (
        <BlankItem
          key={`item-${item.id}`}
          item={item}
          onDuplicate={onDuplicate}
          onRemove={onRemove}
          draggable={draggable}
          texts={texts}
          renderItem={renderItem}
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
          selected={selected}
          additionalActions={additionalActions}
        />
      );
  }
};

export default Item;
