import React, { useCallback, useEffect, useMemo, useState } from 'react';
import List from '@synerise/ds-list';
import { ReactSortable, MoveEvent } from 'react-sortablejs';
import * as S from './ManageableList.styles';
import Item from './Item/Item';
import AddItemWithName from './AddItemWithName/AddItemWithName';
import AddItem from './AddItem/AddItem';
import { ManageableListProps, ListType, BlankManageableListProps } from './ManageableList.types';
import { BlankItemBaseProps, ItemProps } from './Item/Item.types';
import { useTexts } from './hooks/useTexts';
import BlankItem from './Item/BlankItem/BlankItem';
import AddBlankItem from './AddBlankItem/AddBlankItem';

const SORTABLE_CONFIG = {
  ghostClass: 'sortable-list-ghost-element',
  className: 'sortable-list',
  handle: '.item-drag-handle',
  animation: 150,
  group: 'column-manager',
  forceFallback: true,
  onStart: (_: MoveEvent, sortable: { el: HTMLElement }) => {
    sortable.el.classList.add('sorting-started');
  },
  onEnd: (_: MoveEvent, sortable: { el: HTMLElement }) => {
    sortable.el.classList.remove('sorting-started');
  },
};
const INITIALLY_VISIBLE_COUNT = 5;

const isBlankType = <T extends object>(props: ManageableListProps<T>): props is BlankManageableListProps<T> => {
  return props.type === 'blank';
};

const ManageableListComponent = <T extends object>(props: ManageableListProps<T>) => {
  const {
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
    renderCustomToggleButton,
  } = props;

  const [allItemsVisible, setAllItemsVisible] = useState(false);
  const allTexts = useTexts(texts);

  const visibleLimit = visibleItemsLimit || maxToShowItems || INITIALLY_VISIBLE_COUNT;

  const getExpandedIds = useCallback(() => {
    // @ts-ignore FIXME
    return expandedIds !== undefined ? expandedIds : items.filter(item => item.expanded).map(item => item.id);
  }, [expandedIds, items]);

  const [allExpandedIds, setAllExpandedIds] = useState(getExpandedIds());

  useEffect(() => {
    setAllExpandedIds(getExpandedIds());
  }, [expandedIds, items, getExpandedIds]);

  const getItemsOverLimit = useMemo(() => {
    return items.length - visibleLimit;
  }, [items, visibleLimit]);

  const visibleItems = useMemo(() => {
    return allItemsVisible ? items : items.slice(0, visibleLimit);
  }, [allItemsVisible, visibleLimit, items]);

  const buttonLabel = useMemo(
    () => (allItemsVisible ? allTexts.showLessLabel : allTexts.showMoreLabel),
    [allItemsVisible, allTexts.showLessLabel, allTexts.showMoreLabel]
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
    [allItemsVisible, getItemsOverLimit, allTexts.less, allTexts.more]
  );

  const toggleAllItems = useCallback(() => {
    setAllItemsVisible(!allItemsVisible);
  }, [allItemsVisible]);

  const createItem = useCallback(() => {
    onItemAdd && onItemAdd();
  }, [onItemAdd]);

  const onMoveTop = useCallback(
    (item: ItemProps) => {
      // @ts-ignore FIXME
      const newOrder = [item, ...items.filter(i => i.id !== item.id)];
      onChangeOrder && onChangeOrder(newOrder);
    },
    [items, onChangeOrder]
  );

  const onMoveBottom = useCallback(
    (item: ItemProps) => {
      // @ts-ignore FIXME
      const newOrder = [...items.filter(i => i.id !== item.id), item];
      onChangeOrder && onChangeOrder(newOrder);
    },
    [items, onChangeOrder]
  );

  const getItem = useCallback(
    (item: ItemProps<T> | BlankItemBaseProps<T>, index: number) => {
      if (isBlankType(props)) {
        const { renderItem, rowGap } = props;
        return (
          <BlankItem
            key={`item-${item.id}`}
            item={item as BlankItemBaseProps<T>}
            renderItem={renderItem}
            onDuplicate={onItemDuplicate}
            onRemove={onItemRemove}
            draggable={Boolean(onChangeOrder)}
            texts={allTexts}
            rowGap={rowGap}
          />
        );
      }
      return (
        <Item
          key={item.id}
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
          item={item as ItemProps}
          draggable={Boolean(onChangeOrder)}
          changeOrderDisabled={changeOrderDisabled}
          greyBackground={greyBackground}
          selected={Boolean(item.id === selectedItemId)}
          texts={allTexts}
          searchQuery={searchQuery}
          hideExpander={expanderDisabled}
          expanded={allExpandedIds && allExpandedIds.includes(item.id)}
          additionalActions={additionalActions}
        />
      );
    },
    [
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
      onChangeOrder,
      changeOrderDisabled,
      greyBackground,
      selectedItemId,
      allTexts,
      searchQuery,
      expanderDisabled,
      allExpandedIds,
      additionalActions,
      props,
    ]
  );

  const toggleMoreItemsButton =
    items.length > visibleLimit
      ? (renderCustomToggleButton &&
          renderCustomToggleButton({
            onClick: toggleAllItems,
            allItemsVisible,
            total: items.length,
            limit: visibleLimit,
          })) || (
          <S.ShowMoreButton onClick={toggleAllItems} data-testid="show-more-button">
            <span>{buttonLabelDiff}</span>
            <strong>{buttonLabel}</strong>
          </S.ShowMoreButton>
        )
      : null;

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
        // @ts-ignore FIXME
        <ReactSortable {...SORTABLE_CONFIG} list={visibleItems} setList={onChangeOrder}>
          {visibleItems.map(getItem)}
        </ReactSortable>
      ) : (
        <List loading={loading} dataSource={visibleItems} renderItem={getItem} />
      )}
      {toggleMoreItemsButton}
      {(type === ListType.CONTENT || type === ListType.CONTENT_LARGE) && Boolean(onItemAdd) && (
        <AddItem addItemLabel={allTexts.addItemLabel} onItemAdd={createItem} disabled={addButtonDisabled} />
      )}
      {type === ListType.BLANK && Boolean(onItemAdd) && (
        <AddBlankItem addItemLabel={allTexts.addItemLabel} onItemAdd={createItem} disabled={addButtonDisabled} />
      )}
    </S.ManageableListContainer>
  );
};

const ManageableList = Object.assign(ManageableListComponent, {
  ManageableListContainer: S.ManageableListContainer,
  ShowMoreButton: S.ShowMoreButton,
});

export default ManageableList;
