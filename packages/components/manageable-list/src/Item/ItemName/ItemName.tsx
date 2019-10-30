import * as React from 'react';
import InlineEdit from '@synerise/ds-inline-edit/dist/InlineEdit';
import * as S from '../SimpleItem/SimpleItem.styles';
import { ItemProps } from '../Item';

type ItemLabelProps = {
  item: ItemProps;
  onUpdate?: (updateParams: { id: string; name: string }) => void;
  editMode: boolean;
};

const ItemName: React.FC<ItemLabelProps> = ({ item, onUpdate, editMode }): React.ReactElement => {
  const [editedName, setName] = React.useState(item.name);

  const updateName = React.useCallback(() => {
    onUpdate && onUpdate({ id: item.id, name: editedName });
  }, [editedName, onUpdate, item.id]);

  const inputProps = React.useMemo(() => {
    return {
      name: 'list-item-name-input',
      defaultValue: editedName,
      value: editedName,
      onBlur: updateName,
    };
  }, [editedName, updateName]);

  const editName = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  }, []);

  return (
    <S.ItemLabelWrapper>
      {editMode ? (
        <InlineEdit
          size="small"
          hideIcon
          onChange={editName}
          style={{ maxWidth: '100%' }}
          input={inputProps}
          data-testid="list-item-name-input"
        />
      ) : (
        <S.ItemLabel data-testid="list-item-name">{item.name}</S.ItemLabel>
      )}
    </S.ItemLabelWrapper>
  );
};

export default ItemName;
