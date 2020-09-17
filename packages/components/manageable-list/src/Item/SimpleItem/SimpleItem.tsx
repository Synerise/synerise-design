import * as React from 'react';
import List from '@synerise/ds-list';
import Icon from '@synerise/ds-icon';
import * as S from './SimpleItem.styles';
import ItemActions from '../ItemActions/ItemActions';
import ItemName from '../ItemName/ItemName';
import { Props } from './SimpleItem.types';

const SimpleItem: React.FC<Props> = ({ item, onRemove, onSelect, onUpdate, texts }) => {
  const [editMode, setEditMode] = React.useState(false);

  const updateName = React.useCallback(
    (updateParams): void => {
      setEditMode(false);
      onUpdate && onUpdate(updateParams);
    },
    [onUpdate]
  );

  const handleSelect = React.useCallback(() => {
    !editMode && onSelect({ id: item.id });
  }, [onSelect, item.id, editMode]);

  const enterEditMode = React.useCallback(() => {
    setEditMode(true);
  }, []);

  return (
    <S.ItemContainer>
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
          />
        }
      >
        <ItemName item={item} editMode={editMode} onUpdate={updateName} />
      </List.Item>
    </S.ItemContainer>
  );
};

export default SimpleItem;
