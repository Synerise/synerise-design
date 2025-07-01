import React, { useCallback, useEffect, useMemo, useState } from 'react';

import List from '@synerise/ds-list';
import { DragOverlay, SortableContainer } from '@synerise/ds-sortable';

import AddBlankItem from './AddBlankItem/AddBlankItem';
import AddItem from './AddItem/AddItem';
import AddItemWithName from './AddItemWithName/AddItemWithName';
import { DraggableItem } from './Item/DraggableItem';
import Item from './Item/Item';
import { type ItemProps } from './Item/Item.types';
import * as S from './ManageableList.styles';
import { ListType, type ManageableListProps } from './ManageableList.types';
import { useTexts } from './hooks/useTexts';

const ManageableListComponent = <T extends object>({
  className,
  onItemAdd,
  onItemSelect,
  onItemDuplicate,
  onItemRemove,
  onItemEdit,
  onChangeOrder,
  items,
  maxToShowItems,
  visibleItemsLimit,
  loading,
  type = ListType.DEFAULT,
  addButtonDisabled = false,
  changeOrderDisabled = false,
  greyBackground = false,
  placeholder,
  selectedItemId,
  searchQuery,
  expanderDisabled,
  onExpand,
  expandedIds,
  texts,
  changeOrderByButtons = false,
  additionalActions,
  style,
  renderItem = () => <></>,
  renderCustomToggleButton,
}: ManageableListProps<T>) => {
  const [allItemsVisible, setAllItemsVisible] = useState(false);
  const [draggedItem, setDraggedItem] = useState<ItemProps<T>>();
  const allTexts = useTexts(texts);

  const visibleLimit: number | undefined = visibleItemsLimit || maxToShowItems;

  const getExpandedIds = useCallback(() => {
    return expandedIds !== undefined
      ? expandedIds
      : items
          .filter((item: ItemProps) => item.expanded)
          .map((item: ItemProps) => item.id);
  }, [expandedIds, items]);

  const [allExpandedIds, setAllExpandedIds] = useState(getExpandedIds());

  useEffect(() => {
    setAllExpandedIds(getExpandedIds());
  }, [expandedIds, items, getExpandedIds]);

  const getItemsOverLimit = useMemo(() => {
    if (visibleLimit) {
      return items.length - visibleLimit;
    }
    return 0;
  }, [items, visibleLimit]);

  const visibleItems = useMemo(() => {
    return allItemsVisible ? items : items.slice(0, visibleLimit);
  }, [allItemsVisible, visibleLimit, items]);

  const buttonLabel = useMemo(
    () => (allItemsVisible ? allTexts.showLessLabel : allTexts.showMoreLabel),
    [allItemsVisible, allTexts.showLessLabel, allTexts.showMoreLabel],
  );

  const buttonLabelDiff = useMemo(
    () =>
      allItemsVisible ? (
        <>
          - {getItemsOverLimit} {allTexts.less}{' '}
        </>
      ) : (
        <>
          + {getItemsOverLimit} {allTexts.more}{' '}
        </>
      ),
    [allItemsVisible, getItemsOverLimit, allTexts.less, allTexts.more],
  );

  const toggleAllItems = useCallback(() => {
    setAllItemsVisible(!allItemsVisible);
  }, [allItemsVisible]);

  const createItem = useCallback(() => {
    onItemAdd && onItemAdd();
  }, [onItemAdd]);

  const onMoveTop = useCallback(
    (item: ItemProps) => {
      const newOrder = [
        item,
        ...items.filter((i: ItemProps) => i.id !== item.id),
      ];
      onChangeOrder && onChangeOrder(newOrder as ItemProps<T>[]);
    },
    [items, onChangeOrder],
  );

  const onMoveBottom = useCallback(
    (item: ItemProps) => {
      const newOrder = [
        ...items.filter((i: ItemProps) => i.id !== item.id),
        item,
      ];
      onChangeOrder && onChangeOrder(newOrder as ItemProps<T>[]);
    },
    [items, onChangeOrder],
  );

  const getItem = useCallback(
    (item: ItemProps, index: number, draggable?: boolean) => {
      const Component = draggable ? DraggableItem : Item;
      return (
        <Component
          key={item.id}
          isDragOverlay={index === -1}
          isDragPlaceholder={draggedItem?.id === item.id && index > -1}
          isFirst={index === 0}
          isLast={index + 1 === items.length}
          listType={type}
          onSelect={onItemSelect}
          onUpdate={onItemEdit}
          onRemove={onItemRemove}
          onDuplicate={onItemDuplicate}
          onExpand={onExpand}
          onMoveTop={changeOrderByButtons ? onMoveTop : undefined}
          onMoveBottom={changeOrderByButtons ? onMoveBottom : undefined}
          item={item}
          draggable={draggable}
          changeOrderDisabled={changeOrderDisabled}
          greyBackground={greyBackground}
          selected={Boolean(item.id === selectedItemId)}
          texts={allTexts}
          searchQuery={searchQuery}
          hideExpander={expanderDisabled}
          expanded={allExpandedIds && allExpandedIds.includes(item.id)}
          additionalActions={additionalActions}
          renderItem={renderItem}
        />
      );
    },
    [
      draggedItem?.id,
      items.length,
      type,
      onItemSelect,
      onItemEdit,
      onItemRemove,
      onItemDuplicate,
      onExpand,
      changeOrderByButtons,
      onMoveTop,
      onMoveBottom,
      changeOrderDisabled,
      greyBackground,
      selectedItemId,
      allTexts,
      searchQuery,
      expanderDisabled,
      allExpandedIds,
      additionalActions,
      renderItem,
    ],
  );

  const toggleMoreItemsButton =
    visibleLimit && items.length > visibleLimit
      ? (renderCustomToggleButton &&
          renderCustomToggleButton({
            onClick: toggleAllItems,
            allItemsVisible,
            total: items.length,
            limit: visibleLimit,
          })) || (
          <S.ShowMoreButton
            onClick={toggleAllItems}
            data-testid="show-more-button"
          >
            <span>{buttonLabelDiff}</span>
            <strong>{buttonLabel}</strong>
          </S.ShowMoreButton>
        )
      : null;

  const handleDragStart = useCallback(
    ({ active }: { active: { id: string | number } }) => {
      const stepIndex = visibleItems.findIndex((item) => item.id === active.id);
      setDraggedItem({ ...visibleItems[stepIndex], index: stepIndex });
    },
    [visibleItems],
  );

  const handleDragEnd = useCallback(() => {
    setDraggedItem(undefined);
  }, []);

  return (
    <S.ManageableListContainer
      className={`ds-manageable-list ${className || ''}`}
      listType={type}
      greyBackground={greyBackground}
      style={style}
    >
      {type === ListType.DEFAULT && Boolean(onItemAdd) && (
        <AddItemWithName
          addItemLabel={allTexts.addItemLabel}
          onItemAdd={onItemAdd}
          disabled={addButtonDisabled}
          placeholder={placeholder}
        />
      )}
      {onChangeOrder && !changeOrderDisabled ? (
        <SortableContainer
          axis="y"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragEnd}
          onOrderChange={onChangeOrder}
          items={visibleItems}
        >
          {visibleItems.map((item, index) => getItem(item, index, true))}
          <DragOverlay>
            {draggedItem && <>{getItem(draggedItem, -1, false)}</>}
          </DragOverlay>
        </SortableContainer>
      ) : (
        <List
          loading={loading}
          dataSource={visibleItems}
          renderItem={getItem}
        />
      )}
      {toggleMoreItemsButton}
      {(type === ListType.CONTENT || type === ListType.CONTENT_LARGE) &&
        Boolean(onItemAdd) && (
          <AddItem
            addItemLabel={allTexts.addItemLabel}
            onItemAdd={createItem}
            disabled={addButtonDisabled}
          />
        )}
      {type === ListType.BLANK && Boolean(onItemAdd) && (
        <AddBlankItem
          addItemLabel={allTexts.addItemLabel}
          onItemAdd={createItem}
          disabled={addButtonDisabled}
        />
      )}
    </S.ManageableListContainer>
  );
};

const ManageableList = Object.assign(ManageableListComponent, {
  ManageableListContainer: S.ManageableListContainer,
  ShowMoreButton: S.ShowMoreButton,
});

export default ManageableList;
