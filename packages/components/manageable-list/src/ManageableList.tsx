import * as React from 'react';
import List from '@synerise/ds-list';
import * as S from './ManageableList.styles';
import Item, { ItemProps } from './Item/Item';
import AddItem from './AddItem/AddItem';

interface Props {
  addItemLabel: string;
  showMoreLabel: string;
  showLessLabel: string;
  maxToShowItems: number;
  onItemAdd: (addParams: { name: string }) => void;
  onItemRemove: (removeParams: { id: string }) => void;
  onItemEdit: (editParams: { id: string; name: string }) => void;
  onItemSelect: (selectParams: { id: string }) => void;
  items: ItemProps[];
  loading: boolean;
}

const ManageableList: React.FC<Props> = ({
  onItemAdd,
  onItemSelect,
  onItemRemove,
  onItemEdit,
  addItemLabel,
  items,
  maxToShowItems,
  showMoreLabel,
  showLessLabel,
  loading,
}) => {
  const [allItemsVisible, setAllItemsVisible] = React.useState(false);

  const toggleAllItems = React.useCallback((): void => {
    setAllItemsVisible(!allItemsVisible);
  }, [allItemsVisible]);

  const visibleItems = React.useMemo((): ItemProps[] => {
    return allItemsVisible ? items : items.slice(0, maxToShowItems);
  }, [items, allItemsVisible, maxToShowItems]);

  const getItemsOverLimit = React.useMemo((): number => {
    return items.length - maxToShowItems;
  }, [items, maxToShowItems]);

  const buttonLabel = allItemsVisible ? showLessLabel : showMoreLabel;
  const buttonLabelDiff = allItemsVisible ? `- ${getItemsOverLimit} less ` : `+ ${getItemsOverLimit} more `;

  return (
    <S.ManageableListContainer>
      <AddItem addItemLabel={addItemLabel} onItemAdd={onItemAdd} />
      <List
        loading={loading}
        dataSource={[visibleItems]}
        renderItem={(item): React.ReactNode => (
          <Item onSelect={onItemSelect} onUpdate={onItemEdit} onRemove={onItemRemove} item={item} />
        )}
      />
      {items.length > maxToShowItems ? (
        <S.ShowMoreButton onClick={toggleAllItems} data-testid="show-more-button">
          <span>{buttonLabelDiff}</span>
          <strong>{buttonLabel}</strong>
        </S.ShowMoreButton>
      ) : null}
    </S.ManageableListContainer>
  );
};

export default ManageableList;
