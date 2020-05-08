import * as React from 'react';
import List from '@synerise/ds-list';
import { ReactSortable } from 'react-sortablejs-typescript';
import { FormattedMessage } from 'react-intl';
import * as S from './ManageableList.styles';
import Item, { ItemProps } from './Item/Item';
import AddItemWithName from './AddItemWithName/AddItemWithName';
import AddItem from './AddItem/AddItem';

export enum ListType {
  default = 'default',
  content = 'content',
  filter = 'filter',
}

export interface ManageableListProps {
  className?: string;
  maxToShowItems: number;
  onItemAdd?: (addParams?: { name: string }) => void;
  onItemRemove?: (removeParams: { id: string }) => void;
  onItemEdit?: (editParams: { id: string; name: string }) => void;
  onItemSelect: (selectParams: { id: string }) => void;
  onItemDuplicate?: (duplicateParams: { id: string }) => void;
  onChangeOrder?: (newOrder: ItemProps[]) => void;
  items: ItemProps[];
  loading: boolean;
  type?: string;
  addButtonDisabled?: boolean;
  changeOrderDisabled?: boolean;
  greyBackground?: boolean;
  placeholder?: string;
  selectedItemId?: string;
  searchQuery?: string;
  texts: {
    addItemLabel?: string | React.ReactNode;
    showMoreLabel?: string | React.ReactNode;
    showLessLabel?: string | React.ReactNode;
    more?: string | React.ReactNode;
    less?: string | React.ReactNode;
    activateItemTitle?: string | React.ReactNode;
    activate?: string | React.ReactNode;
    cancel?: string | React.ReactNode;
    deleteConfirmationTitle?: string | React.ReactNode;
    deleteConfirmationDescription?: string | React.ReactNode;
    deleteConfirmationYes?: string | React.ReactNode;
    deleteConfirmationNo?: string | React.ReactNode;
    itemActionRename?: string | React.ReactNode;
    itemActionRenameTooltip?: string | React.ReactNode;
    itemActionDuplicate?: string | React.ReactNode;
    itemActionDuplicateTooltip?: string | React.ReactNode;
    itemActionDelete?: string | React.ReactNode;
    itemActionDeleteTooltip?: string | React.ReactNode;
  };
}

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
    ]
  );

  const renderList = React.useCallback(() => {
    return onChangeOrder && !changeOrderDisabled ? (
      <ReactSortable list={items} setList={onChangeOrder}>
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
