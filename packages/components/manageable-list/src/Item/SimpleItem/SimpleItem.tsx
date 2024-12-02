import React, { useCallback, useState } from 'react';
import List from '@synerise/ds-list';
import Icon from '@synerise/ds-icon';
import * as S from './SimpleItem.styles';
import ItemActions from '../ItemActions/ItemActions';
import ItemName from '../ItemName/ItemName';
import { Props } from './SimpleItem.types';

const SimpleItemComponent = ({ item, onRemove, onSelect, onUpdate, texts, additionalActions, selected }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const updateName = useCallback(
    (updateParams: { id: string | number; name: string }) => {
      setEditMode(false);
      onUpdate && onUpdate(updateParams);
    },
    [onUpdate]
  );

  const handleSelect = useCallback(() => {
    !editMode && onSelect({ id: item.id });
  }, [onSelect, item.id, editMode]);

  const enterEditMode = useCallback(() => {
    setEditMode(true);
  }, []);

  return (
    <S.ItemContainer data-active={!!selected} isSelected={!!selected}>
      <List.Item
        icon={<Icon className="ds-manageable-list-item-icon" component={item.icon} size={24} />}
        onSelect={handleSelect}
        actions={
          <ItemActions
            item={item}
            editAction={enterEditMode}
            removeAction={onRemove}
            editActionTooltip={texts?.itemActionRenameTooltip || undefined}
            duplicateActionTooltip={texts?.itemActionDuplicateTooltip || undefined}
            removeActionTooltip={texts?.itemActionDeleteTooltip || undefined}
            additionalActions={additionalActions}
          />
        }
      >
        <ItemName item={item} editMode={editMode} onUpdate={updateName} />
      </List.Item>
    </S.ItemContainer>
  );
};

const SimpleItem = Object.assign(SimpleItemComponent, {
  ItemContainer: S.ItemContainer,
  ItemLabelWrapper: S.ItemLabelWrapper,
  ItemLabelWithIcon: S.ItemLabelWithIcon,
  ItemLabel: S.ItemLabel,
  DescriptionIcon: S.DescriptionIcon,
});

export default SimpleItem;
