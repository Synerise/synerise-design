import * as React from 'react';
import { withTheme } from 'styled-components';
import List from '@synerise/ds-list';
import Icon from '@synerise/ds-icon';
import CloseS from '@synerise/ds-icon/dist/icons/CloseS';
import InlineEdit from '@synerise/ds-inline-edit';
import FolderM from '@synerise/ds-icon/dist/icons/FolderM';
import EditS from '@synerise/ds-icon/dist/icons/EditS';
import * as S from './Item.styles';

type Props = {
  item: ItemProps;
  onRemove?: (removeParams: { id: string }) => void;
  onSelect: (selectParams: { id: string }) => void;
  onUpdate?: (updateParams: { id: string; name: string }) => void;
  theme: { [k: string]: string };
};

export type ItemProps = {
  id: string;
  canUpdate?: boolean;
  canDelete?: boolean;
  canDuplicate?: boolean;
  name: string;
  tag?: React.ReactElement;
  icon?: React.ReactNode;
  content?: () => React.ReactNode;
  changeOrderDisabled?: boolean;
};

const Item: React.FC<Props> = ({ item, onRemove, onSelect, onUpdate, theme }) => {
  const { canUpdate, canDelete, name } = item;
  const [editMode, setEditMode] = React.useState(false);
  const [editedName, setName] = React.useState(item.name);

  const updateName = React.useCallback((): void => {
    setEditMode(false);
    setName(item.name);
    onUpdate && onUpdate({ id: item.id, name: editedName });
  }, [editedName, item.id, item.name, onUpdate]);

  const inputProps = React.useMemo(() => {
    return {
      name: 'list-item-name-input',
      defaultValue: editedName,
      value: editedName,
      onBlur: updateName,
    };
  }, [editedName, updateName]);

  const handleSelect = React.useCallback(() => {
    onSelect({ id: item.id });
  }, [onSelect, item.id]);

  const enterEditMode = React.useCallback((event: React.MouseEvent): void => {
    event.stopPropagation();
    setEditMode(true);
  }, []);

  const editName = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  }, []);

  const removeItem = React.useCallback(
    (event: React.MouseEvent): void => {
      event.stopPropagation();
      onRemove && onRemove({ id: item.id });
    },
    [onRemove, item.id]
  );

  const renderIcon = React.useCallback(
    (
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
    },
    []
  );

  return (
    <S.ItemContainer>
      <List.Item
        icon={<Icon className="ds-manageable-list-item-icon" component={<FolderM />} size={24} />}
        onSelect={handleSelect}
        actions={
          <S.ItemActions>
            {renderIcon(Boolean(canUpdate), <EditS />, theme.palette['grey-500'], enterEditMode, 'list-item-edit')}
            {renderIcon(Boolean(canDelete), <CloseS />, theme.palette['red-600'], removeItem, 'list-item-remove')}
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
              input={inputProps}
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
