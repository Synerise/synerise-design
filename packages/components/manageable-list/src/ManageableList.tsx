import * as React from 'react';
import List from '@synerise/ds-list';
import { ReactSortable } from 'react-sortablejs-typescript';
import { FormattedMessage } from 'react-intl';
import * as S from './ManageableList.styles';
import Item, { ItemProps } from './Item/Item';
import AddItemWithName from './AddItemWithName/AddItemWithName';
import AddItem from './AddItem/AddItem';
import { ManageableListProps } from './ManageableList.types';

export enum ListType {
  default = 'default',
  content = 'content',
  filter = 'filter',
}

const SORTABLE_CONFIG = {
  ghostClass: 'sortable-list-ghost-element',
  className: 'sortable-list',
  animation: 150,
  group: 'column-manager',
  forceFallback: true,
};
const ManageableList: React.FC<ManageableListProps> = ({
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
  type = ListType.default,
  addButtonDisabled = false,
  changeOrderDisabled = false,
  greyBackground = false,
  placeholder,
  selectedItemId,
  searchQuery,
  expanderDisabled,
  onExpand,
  texts: {
    addItemLabel = <FormattedMessage id="DS.MANAGABLE-LIST.ADD-ITEM" />,
    showMoreLabel = <FormattedMessage id="DS.MANAGABLE-LIST.SHOW-MORE" />,
    showLessLabel = <FormattedMessage id="DS.MANAGABLE-LIST.SHOW-LESS" />,
    more = <FormattedMessage id="DS.MANAGABLE-LIST.MORE" />,
    less = <FormattedMessage id="DS.MANAGABLE-LIST.LESS" />,
    activateItemTitle = <FormattedMessage id="DS.MANAGABLE-LIST.ACTIVATE-ITEM" />,
    activate = <FormattedMessage id="DS.MANAGABLE-LIST.ACTIVATE" />,
    cancel = <FormattedMessage id="DS.MANAGABLE-LIST.CANCEL" />,
    deleteConfirmationTitle = <FormattedMessage id="DS.MANAGABLE-LIST.DELETE-ITEM-TITLE" />,
    deleteConfirmationDescription = <FormattedMessage id="DS.MANAGABLE-LIST.DELETE-ITEM-DESCRIPTION" />,
    deleteConfirmationYes = <FormattedMessage id="DS.MANAGABLE-LIST.DELETE" />,
    deleteConfirmationNo = <FormattedMessage id="DS.MANAGABLE-LIST.CANCEL" />,
    itemActionRename = <FormattedMessage id="DS.MANAGABLE-LIST.ITEM-RENAME" />,
    itemActionRenameTooltip = <FormattedMessage id="DS.MANAGABLE-LIST.ITEM-RENAME" />,
    itemActionDuplicate = <FormattedMessage id="DS.MANAGABLE-LIST.ITEM-DUPLICATE" />,
    itemActionDuplicateTooltip = <FormattedMessage id="DS.MANAGABLE-LIST.ITEM-DUPLICATE" />,
    itemActionDelete = <FormattedMessage id="DS.MANAGABLE-LIST.ITEM-DELETE" />,
    itemActionDeleteTooltip = <FormattedMessage id="DS.MANAGABLE-LIST.ITEM-DELETE" />,
  },
}) => {
  const [allItemsVisible, setAllItemsVisible] = React.useState(false);

  const itemTexts = {
    activateItemTitle,
    activate,
    cancel,
    deleteConfirmationDescription,
    deleteConfirmationTitle,
    deleteConfirmationYes,
    deleteConfirmationNo,
    itemActionRename,
    itemActionRenameTooltip,
    itemActionDuplicate,
    itemActionDuplicateTooltip,
    itemActionDelete,
    itemActionDeleteTooltip,
  };

  const getItemsOverLimit = React.useMemo((): number => {
    return items.length - maxToShowItems;
  }, [items, maxToShowItems]);

  const visibleItems = React.useMemo((): ItemProps[] => {
    return allItemsVisible ? items : items.slice(0, maxToShowItems);
  }, [items, allItemsVisible, maxToShowItems]);

  const buttonLabel = React.useMemo(() => (allItemsVisible ? showLessLabel : showMoreLabel), [
    allItemsVisible,
    showLessLabel,
    showMoreLabel,
  ]);

  const buttonLabelDiff = React.useMemo(
    () =>
      allItemsVisible ? (
        <>
          - {getItemsOverLimit} {less}{' '}
        </>
      ) : (
        <>
          + {getItemsOverLimit} {more}{' '}
        </>
      ),
    [allItemsVisible, getItemsOverLimit, less, more]
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

  const getItem = React.useCallback(
    (item: ItemProps): React.ReactNode => (
      <Item
        listType={type}
        onSelect={onItemSelect}
        onUpdate={onItemEdit}
        onRemove={onItemRemove}
        onDuplicate={onItemDuplicate}
        item={item}
        draggable={Boolean(onChangeOrder)}
        changeOrderDisabled={changeOrderDisabled}
        greyBackground={greyBackground}
        selected={Boolean(item.id === selectedItemId)}
        texts={itemTexts}
        searchQuery={searchQuery}
        onExpand={(id, isExpanded): void => {
          onExpand && onExpand(id, isExpanded);
        }}
        expanderDisabled={expanderDisabled}
      />
    ),
    [
      type,
      onItemSelect,
      onItemEdit,
      onItemRemove,
      onItemDuplicate,
      onChangeOrder,
      changeOrderDisabled,
      greyBackground,
      selectedItemId,
      itemTexts,
      searchQuery,
      expanderDisabled,
      onExpand,
    ]
  );

  const renderList = React.useCallback(() => {
    return onChangeOrder && !changeOrderDisabled ? (
      <ReactSortable {...SORTABLE_CONFIG} list={items} setList={onChangeOrder}>
        {visibleItems.map(getItem)}
      </ReactSortable>
    ) : (
      <List loading={loading} dataSource={[visibleItems]} renderItem={getItem} />
    );
  }, [changeOrderDisabled, items, visibleItems, onChangeOrder, loading, getItem]);

  return (
    <S.ManageableListContainer
      className={`ds-manageable-list ${className || ''}`}
      listType={type}
      greyBackground={greyBackground}
    >
      {type === ListType.default && Boolean(onItemAdd) && (
        <AddItemWithName
          addItemLabel={addItemLabel}
          onItemAdd={onItemAdd}
          disabled={addButtonDisabled}
          placeholder={placeholder}
        />
      )}
      {renderList()}
      {renderShowMoreButton()}
      {type === ListType.content && Boolean(onItemAdd) && (
        <AddItem addItemLabel={addItemLabel} onItemAdd={createItem} disabled={addButtonDisabled} />
      )}
    </S.ManageableListContainer>
  );
};

export default ManageableList;
