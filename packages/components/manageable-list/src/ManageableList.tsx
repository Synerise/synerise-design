import React, { useCallback, useEffect, useMemo, useState } from 'react';
import List from '@synerise/ds-list';
import { ReactSortable } from 'react-sortablejs';
import { FormattedMessage } from 'react-intl';
import * as S from './ManageableList.styles';
import Item from './Item/Item';
import AddItemWithName from './AddItemWithName/AddItemWithName';
import AddItem from './AddItem/AddItem';
import { ManageableListProps, ListType, Texts } from './ManageableList.types';
import { ItemProps } from './Item/Item.types';

const SORTABLE_CONFIG = {
  ghostClass: 'sortable-list-ghost-element',
  className: 'sortable-list',
  handle: '.item-drag-handle',
  animation: 150,
  group: 'column-manager',
  forceFallback: true,
};
const INITIALLY_VISIBLE_COUNT = 5;
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
  renderCustomToggleButton,
}: ManageableListProps<T>) => {
  const [allItemsVisible, setAllItemsVisible] = useState(false);

  const visibleLimit = visibleItemsLimit || maxToShowItems || INITIALLY_VISIBLE_COUNT;

  const getExpandedIds = useCallback(() => {
    return expandedIds !== undefined ? expandedIds : items.filter(item => item.expanded).map(item => item.id);
  }, [expandedIds, items]);

  const [allExpandedIds, setAllExpandedIds] = useState(getExpandedIds());

  useEffect(() => {
    setAllExpandedIds(getExpandedIds());
  }, [expandedIds, items, getExpandedIds]);

  const itemTexts = useMemo(
    (): Texts => ({
      addItemLabel: <FormattedMessage id="DS.MANAGABLE-LIST.ADD-ITEM" defaultMessage="Add item" />,
      showMoreLabel: <FormattedMessage id="DS.MANAGABLE-LIST.SHOW-MORE" defaultMessage="Show more" />,
      showLessLabel: <FormattedMessage id="DS.MANAGABLE-LIST.SHOW-LESS" defaultMessage="Show less" />,
      more: <FormattedMessage id="DS.MANAGABLE-LIST.MORE" defaultMessage="more" />,
      less: <FormattedMessage id="DS.MANAGABLE-LIST.LESS" defaultMessage="less" />,
      activateItemTitle: <FormattedMessage id="DS.MANAGABLE-LIST.ACTIVATE-ITEM" defaultMessage="Active item" />,
      activate: <FormattedMessage id="DS.MANAGABLE-LIST.ACTIVATE" defaultMessage="Activate" />,
      cancel: <FormattedMessage id="DS.MANAGABLE-LIST.CANCEL" defaultMessage="Cancel" />,
      deleteConfirmationTitle: (
        <FormattedMessage id="DS.MANAGABLE-LIST.DELETE-ITEM-TITLE" defaultMessage="Delete item" />
      ),
      deleteConfirmationDescription: (
        <FormattedMessage
          id="DS.MANAGABLE-LIST.DELETE-ITEM-DESCRIPTION"
          defaultMessage="Deleting this item will permanently remove it from templates library."
        />
      ),
      deleteConfirmationYes: <FormattedMessage id="DS.MANAGABLE-LIST.DELETE" defaultMessage="Yes" />,
      deleteConfirmationNo: <FormattedMessage id="DS.MANAGABLE-LIST.CANCEL" defaultMessage="No" />,
      itemActionRename: <FormattedMessage id="DS.MANAGABLE-LIST.ITEM-RENAME" defaultMessage="Rename" />,
      itemActionRenameTooltip: <FormattedMessage id="DS.MANAGABLE-LIST.ITEM-RENAME" defaultMessage="Rename" />,
      itemActionDuplicate: <FormattedMessage id="DS.MANAGABLE-LIST.ITEM-DUPLICATE" defaultMessage="Duplicate" />,
      itemActionDuplicateTooltip: <FormattedMessage id="DS.MANAGABLE-LIST.ITEM-DUPLICATE" defaultMessage="Duplicate" />,
      itemActionDelete: <FormattedMessage id="DS.MANAGABLE-LIST.ITEM-DELETE" defaultMessage="Delete" />,
      itemActionDeleteTooltip: <FormattedMessage id="DS.MANAGABLE-LIST.ITEM-DELETE" defaultMessage="Delete" />,
      moveToTopTooltip: (
        <FormattedMessage id="DS.MANAGABLE-LIST.MOVE-TO-TOP" defaultMessage="Move to the top of list" />
      ),
      moveToBottomTooltip: (
        <FormattedMessage id="DS.MANAGABLE-LIST.MOVE-TO-BOTTOM" defaultMessage="Move to the bottom of list" />
      ),
      ...texts,
    }),
    [texts]
  );

  const getItemsOverLimit = useMemo(() => {
    return items.length - visibleLimit;
  }, [items, visibleLimit]);

  const visibleItems = useMemo(() => {
    return allItemsVisible ? items : items.slice(0, visibleLimit);
  }, [allItemsVisible, visibleLimit, items]);

  const buttonLabel = useMemo(
    () => (allItemsVisible ? itemTexts.showLessLabel : itemTexts.showMoreLabel),
    [allItemsVisible, itemTexts.showLessLabel, itemTexts.showMoreLabel]
  );

  const buttonLabelDiff = useMemo(
    () =>
      allItemsVisible ? (
        <>
          - {getItemsOverLimit} {itemTexts.less}{' '}
        </>
      ) : (
        <>
          + {getItemsOverLimit} {itemTexts.more}{' '}
        </>
      ),
    [allItemsVisible, getItemsOverLimit, itemTexts.less, itemTexts.more]
  );

  const toggleAllItems = useCallback(() => {
    setAllItemsVisible(!allItemsVisible);
  }, [allItemsVisible]);

  const createItem = useCallback(() => {
    onItemAdd && onItemAdd();
  }, [onItemAdd]);

  const onMoveTop = useCallback(
    (item: ItemProps) => {
      const newOrder = [item, ...items.filter(i => i.id !== item.id)];
      onChangeOrder && onChangeOrder(newOrder as ItemProps<T>[]);
    },
    [items, onChangeOrder]
  );

  const onMoveBottom = useCallback(
    (item: ItemProps) => {
      const newOrder = [...items.filter(i => i.id !== item.id), item];
      onChangeOrder && onChangeOrder(newOrder as ItemProps<T>[]);
    },
    [items, onChangeOrder]
  );

  const getItem = useCallback(
    (item: ItemProps, index: number) => {
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
          item={item}
          draggable={Boolean(onChangeOrder)}
          changeOrderDisabled={changeOrderDisabled}
          greyBackground={greyBackground}
          selected={Boolean(item.id === selectedItemId)}
          texts={itemTexts}
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
      itemTexts,
      searchQuery,
      expanderDisabled,
      allExpandedIds,
      additionalActions,
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
          addItemLabel={itemTexts.addItemLabel}
          onItemAdd={onItemAdd}
          disabled={addButtonDisabled}
          placeholder={placeholder}
        />
      )}
      {onChangeOrder && !changeOrderDisabled ? (
        <ReactSortable {...SORTABLE_CONFIG} list={items} setList={onChangeOrder}>
          {items.map(getItem)}
        </ReactSortable>
      ) : (
        <List loading={loading} dataSource={visibleItems} renderItem={getItem} />
      )}
      {toggleMoreItemsButton}
      {type === ListType.CONTENT && Boolean(onItemAdd) && (
        <AddItem addItemLabel={itemTexts.addItemLabel} onItemAdd={createItem} disabled={addButtonDisabled} />
      )}
    </S.ManageableListContainer>
  );
};

const ManageableList = Object.assign(ManageableListComponent, {
  ManageableListContainer: S.ManageableListContainer,
  ShowMoreButton: S.ShowMoreButton,
});

export default ManageableList;
