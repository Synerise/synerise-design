import * as React from 'react';
import List from '@synerise/ds-list';
import Button from '@synerise/ds-button';
import Add1M from '@synerise/ds-icon/dist/icons/Add1M';
import Icon from '@synerise/ds-icon';
import * as S from './ManageableList.styles';
import Item, { ItemProps } from './Item/Item';
import AddItem from './AddItem/AddItem';
import ContentItem from './ContentItem/ContentItem';

export enum ListType {
  default,
  content,
}

interface Props {
  addItemLabel: string;
  showMoreLabel: string;
  showLessLabel: string;
  maxToShowItems: number;
  onItemAdd?: (addParams?: { name: string }) => void;
  onItemRemove?: (removeParams: { id: string }) => void;
  onItemEdit?: (editParams: { id: string; name: string }) => void;
  onItemSelect: (selectParams: { id: string }) => void;
  onItemDuplicate?: (duplicateParams: { id: string }) => void;
  onChangeOrder?: () => void;
  items: ItemProps[];
  loading: boolean;
  type?: ListType;
  addButtonDisabled?: boolean;
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
  maxToShowItems,
  showMoreLabel,
  showLessLabel,
  loading,
  type = ListType.default,
  addButtonDisabled = false,
  greyBackground = false,
}) => {
  const [allItemsVisible, setAllItemsVisible] = React.useState(false);

  const toggleAllItems = React.useCallback((): void => {
    setAllItemsVisible(!allItemsVisible);
  }, [allItemsVisible]);

  const createItem = React.useCallback(() => {
    onItemAdd && onItemAdd();
  }, [onItemAdd]);

  const visibleItems = React.useMemo((): ItemProps[] => {
    return allItemsVisible ? items : items.slice(0, maxToShowItems);
  }, [items, allItemsVisible, maxToShowItems]);

  const getItemsOverLimit = React.useMemo((): number => {
    return items.length - maxToShowItems;
  }, [items, maxToShowItems]);

  const getItem = (item: ItemProps): React.ReactNode => {
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
        greyBackground={greyBackground}
      />
    );
  };

  const buttonLabel = allItemsVisible ? showLessLabel : showMoreLabel;
  const buttonLabelDiff = allItemsVisible ? `- ${getItemsOverLimit} less ` : `+ ${getItemsOverLimit} more `;

  return (
    <S.ManageableListContainer listType={type} greyBackground={greyBackground}>
      {type === ListType.default && Boolean(onItemAdd) && <AddItem addItemLabel={addItemLabel} onItemAdd={onItemAdd} />}
      <List loading={loading} dataSource={[visibleItems]} renderItem={(item): React.ReactNode => getItem(item)} />
      {items.length > maxToShowItems ? (
        <S.ShowMoreButton onClick={toggleAllItems} data-testid="show-more-button">
          <span>{buttonLabelDiff}</span>
          <strong>{buttonLabel}</strong>
        </S.ShowMoreButton>
      ) : null}
      {type === ListType.content && Boolean(onItemAdd) && (
        <S.AddContentButtonWrapper>
          <Button onClick={createItem} type="dashed" size="large" disabled={addButtonDisabled}>
            <Icon size={24} component={<Add1M />} />
            Add position
          </Button>
        </S.AddContentButtonWrapper>
      )}
    </S.ManageableListContainer>
  );
};

export default ManageableList;
