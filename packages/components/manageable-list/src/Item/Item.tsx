import * as React from 'react';
import List from '@synerise/ds-list';
import Icon from '@synerise/ds-icon';
import CloseS from '@synerise/ds-icon/dist/icons/CloseS';
import InlineEdit from '@synerise/ds-inline-edit/dist/InlineEdit';
import EditS from '@synerise/ds-icon/dist/icons/EditS';
import * as S from './Item.styles';

type Props = {
  item: {
    catalogId: string;
    canUpdateCatalog: boolean;
    canDeleteCatalog: boolean;
    name: string;
  };
  onRemove: (removeParams: { id: string }) => void;
  onSelect: (selectParams: { id: string }) => void;
  onUpdate: (updateParams: { id: string; name: string }) => void;
};

const Item: React.FC<Props> = ({ item, onRemove, onSelect, onUpdate }) => {
  const [editMode, setEditMode] = React.useState(false);
  const [editedName, setName] = React.useState(item.name);

  const { canUpdateCatalog, canDeleteCatalog, name } = item;

  const enterEditMode = (event: any): void => {
    event.stopPropagation();
    setEditMode(true);
  };

  const editName = (event: any): void => {
    setName(event.target.value);
  };

  const updateName = (): void => {
    setEditMode(false);
    setName(item.name);
    onUpdate({ id: item.catalogId, name: editedName });
  };

  const removeCatalog = (event: any): void => {
    event.stopPropagation();
    onRemove({ id: item.catalogId });
  };

  return (
    <S.ItemContainer>
      <List.Item
        icon={<Icon component={<CloseS />} size={24} color="#000" />}
        onSelect={(): void => onSelect({ id: item.catalogId })}
        actions={
          <S.ItemActions>
            {canUpdateCatalog && (
              <div data-testid="list-item-edit">
                <Icon component={<EditS />} size={24} color="#949ea6" onClick={enterEditMode} />
              </div>
            )}
            {canDeleteCatalog && (
              <div data-testid="list-item-remove">
                <Icon component={<CloseS />} size={24} color="#f52922" onClick={removeCatalog} />
              </div>
            )}
          </S.ItemActions>
        }
      >
        <>
          {editMode ? (
            <InlineEdit
              size="small"
              hideIcon
              onChange={editName}
              style={{ maxWidth: 160 }}
              input={{
                name: 'list-item-name-input',
                defaultValue: editedName,
                value: editedName,
                onBlur: updateName,
              }}
              data-testid="list-item-name-input"
            />
          ) : (
            <S.ItemLabel data-testid="list-item-name">{name}</S.ItemLabel>
          )}
        </>
      </List.Item>
    </S.ItemContainer>
  );
};

export default Item;
