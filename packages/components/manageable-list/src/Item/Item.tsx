import * as React from 'react';
import { withTheme } from 'styled-components';
import List from '@synerise/ds-list';
import Icon from '@synerise/ds-icon';
import CloseS from '@synerise/ds-icon/dist/icons/CloseS';
import InlineEdit from '@synerise/ds-inline-edit/dist/InlineEdit';
import FolderM from '@synerise/ds-icon/dist/icons/FolderM';
import EditS from '@synerise/ds-icon/dist/icons/EditS';
import * as S from './Item.styles';

type Props = {
  item: ItemProps;
  onRemove: (removeParams: { id: string }) => void;
  onSelect: (selectParams: { id: string }) => void;
  onUpdate: (updateParams: { id: string; name: string }) => void;
  theme: { [k: string]: string };
};

export type ItemProps = {
  id: string;
  canUpdate: boolean;
  canDelete: boolean;
  name: string;
};

const Item: React.FC<Props> = ({ item, onRemove, onSelect, onUpdate, theme }) => {
  const [editMode, setEditMode] = React.useState(false);
  const [editedName, setName] = React.useState(item.name);

  const { canUpdate, canDelete, name } = item;

  const enterEditMode = (event: React.MouseEvent): void => {
    event.stopPropagation();
    setEditMode(true);
  };

  const editName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const updateName = (): void => {
    setEditMode(false);
    setName(item.name);
    onUpdate({ id: item.id, name: editedName });
  };

  const removeItem = (event: React.MouseEvent): void => {
    event.stopPropagation();
    onRemove({ id: item.id });
  };

  const renderIcon = (
    condition: boolean,
    icon: React.ReactNode,
    color: string,
    handleClick: (event: React.MouseEvent) => void,
    testId: string
  ): React.ReactNode => {
    return (
      condition && (
        <div data-testid={testId}>
          <Icon component={icon} size={24} color={color} onClick={handleClick} />
        </div>
      )
    );
  };

  return (
    <S.ItemContainer>
      <List.Item
        icon={<Icon component={<FolderM />} size={24} />}
        onSelect={(): void => onSelect({ id: item.id })}
        actions={
          <S.ItemActions>
            {renderIcon(canUpdate, <EditS />, theme.palette['grey-500'], enterEditMode, 'list-item-edit')}
            {renderIcon(canDelete, <CloseS />, theme.palette['red-600'], removeItem, 'list-item-remove')}
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

export default withTheme(Item);
