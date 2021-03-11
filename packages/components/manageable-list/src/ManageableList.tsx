import * as React from 'react';
import List from '@synerise/ds-list';
import * as _ from 'lodash';
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
  animation: 150,
  group: 'column-manager',
  forceFallback: true,
};

const ManageableList: <T extends object>(props: ManageableListProps<T>) => JSX.Element = ({
  className,
  onItemAdd,
  onItemSelect,
  onItemDuplicate,
  onItemRemove,
  onItemEdit,
  onChangeOrder,
  items,
  maxToShowItems = 5,
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
}) => {
  const [stateExpandedIds, setExpandedIds] = React.useState(expandedIds);
  const [allItemsVisible, setAllItemsVisible] = React.useState(false);
  const [itemsToRender, setItemsToRender] = React.useState(items);
  React.useEffect(() => {
    setItemsToRender(items);
  }, [items]);

  React.useEffect(() => {
    if (expandedIds && stateExpandedIds && !_.isEqual(expandedIds, stateExpandedIds)) {
      setExpandedIds(expandedIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedIds]);

  const getTexts = React.useCallback(
    (): Texts => ({
      addItemLabel: <FormattedMessage id="DS.MANAGABLE-LIST.ADD-ITEM" />,
      showMoreLabel: <FormattedMessage id="DS.MANAGABLE-LIST.SHOW-MORE" />,
      showLessLabel: <FormattedMessage id="DS.MANAGABLE-LIST.SHOW-LESS" />,
      more: <FormattedMessage id="DS.MANAGABLE-LIST.MORE" />,
      less: <FormattedMessage id="DS.MANAGABLE-LIST.LESS" />,
      activateItemTitle: <FormattedMessage id="DS.MANAGABLE-LIST.ACTIVATE-ITEM" />,
      activate: <FormattedMessage id="DS.MANAGABLE-LIST.ACTIVATE" />,
      cancel: <FormattedMessage id="DS.MANAGABLE-LIST.CANCEL" />,
      deleteConfirmationTitle: <FormattedMessage id="DS.MANAGABLE-LIST.DELETE-ITEM-TITLE" />,
      deleteConfirmationDescription: <FormattedMessage id="DS.MANAGABLE-LIST.DELETE-ITEM-DESCRIPTION" />,
      deleteConfirmationYes: <FormattedMessage id="DS.MANAGABLE-LIST.DELETE" />,
      deleteConfirmationNo: <FormattedMessage id="DS.MANAGABLE-LIST.CANCEL" />,
      itemActionRename: <FormattedMessage id="DS.MANAGABLE-LIST.ITEM-RENAME" />,
      itemActionRenameTooltip: <FormattedMessage id="DS.MANAGABLE-LIST.ITEM-RENAME" />,
      itemActionDuplicate: <FormattedMessage id="DS.MANAGABLE-LIST.ITEM-DUPLICATE" />,
      itemActionDuplicateTooltip: <FormattedMessage id="DS.MANAGABLE-LIST.ITEM-DUPLICATE" />,
      itemActionDelete: <FormattedMessage id="DS.MANAGABLE-LIST.ITEM-DELETE" />,
      itemActionDeleteTooltip: <FormattedMessage id="DS.MANAGABLE-LIST.ITEM-DELETE" />,
      moveToTopTooltip: <FormattedMessage id="DS.MANAGABLE-LIST.MOVE-TO-TOP" />,
      moveToBottomTooltip: <FormattedMessage id="DS.MANAGABLE-LIST.MOVE-TO-BOTTOM" />,
      ...texts,
    }),
    [texts]
  );

  const itemTexts = React.useMemo(() => getTexts(), [getTexts]);

  const getItemsOverLimit = React.useMemo((): number => {
    return items.length - maxToShowItems;
  }, [items, maxToShowItems]);

  const visibleItems = React.useMemo((): ItemProps[] => {
    return allItemsVisible ? itemsToRender : itemsToRender.slice(0, maxToShowItems);
  }, [allItemsVisible, maxToShowItems, itemsToRender]);

  const buttonLabel = React.useMemo(() => (allItemsVisible ? itemTexts.showLessLabel : itemTexts.showMoreLabel), [
    allItemsVisible,
    itemTexts.showLessLabel,
    itemTexts.showMoreLabel,
  ]);

  const buttonLabelDiff = React.useMemo(
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

  const toggleAllItems = React.useCallback((): void => {
    setAllItemsVisible(!allItemsVisible);
  }, [allItemsVisible]);

  const renderShowMoreButton = React.useCallback(() => {
    return (
      items.length > maxToShowItems && (
        <S.ShowMoreButton onClick={toggleAllItems} data-testid="show-more-button">
          <span>{buttonLabelDiff}</span>
          <strong>{buttonLabel}</strong>
        </S.ShowMoreButton>
      )
    );
  }, [items, maxToShowItems, buttonLabelDiff, toggleAllItems, buttonLabel]);

  const createItem = React.useCallback(() => {
    onItemAdd && onItemAdd();
  }, [onItemAdd]);

  const onMoveTop = React.useCallback(
    item => {
      const newOrder = [item, ...itemsToRender.filter(i => i.id !== item.id)];
      onChangeOrder && onChangeOrder(newOrder);
    },
    [itemsToRender, onChangeOrder]
  );

  const onMoveBottom = React.useCallback(
    item => {
      const newOrder = [...itemsToRender.filter(i => i.id !== item.id), item];
      onChangeOrder && onChangeOrder(newOrder);
    },
    [itemsToRender, onChangeOrder]
  );

  const getItem = React.useCallback(
    (item: ItemProps, index: number): React.ReactNode => {
      return (
        <Item
          key={item.id}
          isFirst={index === 0}
          isLast={index + 1 === itemsToRender.length}
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
          expanded={!!stateExpandedIds && stateExpandedIds.includes(item.id)}
        />
      );
    },
    [
      itemsToRender,
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
      stateExpandedIds,
    ]
  );

  const itemList = React.useMemo(() => {
    return onChangeOrder && !changeOrderDisabled ? (
      <ReactSortable {...SORTABLE_CONFIG} list={itemsToRender} setList={onChangeOrder}>
        {itemsToRender.map(getItem)}
      </ReactSortable>
    ) : (
      <List loading={loading} dataSource={visibleItems} renderItem={getItem} />
    );
  }, [changeOrderDisabled, visibleItems, itemsToRender, onChangeOrder, loading, getItem]);

  return (
    <S.ManageableListContainer
      className={`ds-manageable-list ${className || ''}`}
      listType={type}
      greyBackground={greyBackground}
    >
      {type === ListType.DEFAULT && Boolean(onItemAdd) && (
        <AddItemWithName
          addItemLabel={itemTexts.addItemLabel}
          onItemAdd={onItemAdd}
          disabled={addButtonDisabled}
          placeholder={placeholder}
        />
      )}
      {itemList}
      {renderShowMoreButton()}
      {type === ListType.CONTENT && Boolean(onItemAdd) && (
        <AddItem addItemLabel={itemTexts.addItemLabel} onItemAdd={createItem} disabled={addButtonDisabled} />
      )}
    </S.ManageableListContainer>
  );
};

export default ManageableList;
