import * as React from 'react';
import List from '@synerise/ds-list';
import { ReactSortable } from 'react-sortablejs-typescript';
import * as S from './ManageableList.styles';
import Item, { ItemProps } from './Item/Item';
import AddItemWithName from './AddItemWithName/AddItemWithName';
import AddItem from './AddItem/AddItem';

export enum ListType {
  default,
  content,
}

interface Props {
  addItemLabel: string;
  showMoreLabel: string;
  showLessLabel: string;
  more: string;
  less: string;
  maxToShowItems: number;
  onItemAdd?: (addParams?: { name: string }) => void;
  onItemRemove?: (removeParams: { id: string }) => void;
  onItemEdit?: (editParams: { id: string; name: string }) => void;
  onItemSelect: (selectParams: { id: string }) => void;
  onItemDuplicate?: (duplicateParams: { id: string }) => void;
  onChangeOrder?: (newOrder: ItemProps[]) => void;
  items: ItemProps[];
  loading: boolean;
  type?: ListType;
  addButtonDisabled?: boolean;
  changeOrderDisabled?: boolean;
  greyBackground?: boolean;
}

const ManageableList: React.FC<Props> = ({
  onItemAdd,
  onItemSelect,
  onItemDuplicate,
  onItemRemove,
  onItemEdit,
  onChangeOrder,
  addItemLabel,
  items,
  maxToShowItems = 5,
  showMoreLabel,
  showLessLabel,
  more,
  less,
  loading,
  type = ListType.default,
  addButtonDisabled = false,
  changeOrderDisabled = false,
  greyBackground = false,
}) => {
  const [allItemsVisible, setAllItemsVisible] = React.useState(false);

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
    () => (allItemsVisible ? `- ${getItemsOverLimit} ${less} ` : `+ ${getItemsOverLimit} ${more} `),
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
      />
    ),
    [onChangeOrder, changeOrderDisabled, greyBackground, onItemDuplicate, onItemSelect, onItemEdit, onItemRemove, type]
  );

  const renderList = React.useCallback(() => {
    return onChangeOrder && !changeOrderDisabled ? (
      <ReactSortable list={items} setList={onChangeOrder}>
        {visibleItems.map(item => getItem(item))}
      </ReactSortable>
    ) : (
      <List loading={loading} dataSource={[visibleItems]} renderItem={(item): React.ReactNode => getItem(item)} />
    );
  }, [changeOrderDisabled, items, visibleItems, onChangeOrder, loading, getItem]);

  return (
    <S.ManageableListContainer listType={type} greyBackground={greyBackground}>
      {type === ListType.default && Boolean(onItemAdd) && (
        <AddItemWithName addItemLabel={addItemLabel} onItemAdd={onItemAdd} disabled={addButtonDisabled} />
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
