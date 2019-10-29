import * as React from 'react';
import List from '@synerise/ds-list';
import * as S from './ManageableList.styles';
import Item, { ItemProps } from './Item/Item';
import AddItem from './AddItem/AddItem';
import ContentItem, { ItemProps as ContentItemProps } from './ContentItem/ContentItem';

export enum ListType {
  default,
  content,
}

export enum AddItemPosition {
  onTop,
  onBottom,
}

interface Props {
  addItemLabel: string;
  showMoreLabel: string;
  showLessLabel: string;
  maxToShowItems: number;
  addItemPosition?: AddItemPosition;
  onItemAdd: (addParams: { name: string }) => void;
  onItemRemove: (removeParams: { id: string }) => void;
  onItemEdit: (editParams: { id: string; name: string }) => void;
  onItemSelect: (selectParams: { id: string }) => void;
  onItemDuplicate: (selectParams: { id: string }) => void;
  onChangeOrder?: () => {};
  items: ItemProps[] | ContentItemProps[];
  loading: boolean;
  type?: ListType;
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
  maxToShowItems,
  showMoreLabel,
  showLessLabel,
  loading,
  type = ListType.default,
  addItemPosition = AddItemPosition.onTop,
}) => {
  const [allItemsVisible, setAllItemsVisible] = React.useState(false);

  const toggleAllItems = React.useCallback((): void => {
    setAllItemsVisible(!allItemsVisible);
  }, [allItemsVisible]);

  const visibleItems = React.useMemo((): ItemProps[] | ContentItemProps[] => {
    return allItemsVisible ? items : items.slice(0, maxToShowItems);
  }, [items, allItemsVisible, maxToShowItems]);

  const getItemsOverLimit = React.useMemo((): number => {
    return items.length - maxToShowItems;
  }, [items, maxToShowItems]);

  const getItem = (item: ItemProps | ContentItemProps): React.ReactNode => {
    return type === ListType.default ? (
      <Item onSelect={onItemSelect} onUpdate={onItemEdit} onRemove={onItemRemove} item={item} />
    ) : (
      <ContentItem
        onSelect={onItemSelect}
        onUpdate={onItemEdit}
        onRemove={onItemRemove}
        onDuplicate={onItemDuplicate}
        item={item}
        draggable={Boolean(onChangeOrder)}
        content={item.content}
      />
    );
  };

  const buttonLabel = allItemsVisible ? showLessLabel : showMoreLabel;
  const buttonLabelDiff = allItemsVisible ? `- ${getItemsOverLimit} less ` : `+ ${getItemsOverLimit} more `;

  return (
    <S.ManageableListContainer>
      {addItemPosition === AddItemPosition.onTop && <AddItem addItemLabel={addItemLabel} onItemAdd={onItemAdd} />}
      <List loading={loading} dataSource={[visibleItems]} renderItem={(item): React.ReactNode => getItem(item)} />
      {items.length > maxToShowItems ? (
        <S.ShowMoreButton onClick={toggleAllItems} data-testid="show-more-button">
          <span>{buttonLabelDiff}</span>
          <strong>{buttonLabel}</strong>
        </S.ShowMoreButton>
      ) : null}
      {addItemPosition === AddItemPosition.onBottom && <AddItem addItemLabel={addItemLabel} onItemAdd={onItemAdd} />}
    </S.ManageableListContainer>
  );
};

export default ManageableList;
