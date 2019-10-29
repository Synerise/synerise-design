import * as React from 'react';
import Icon from '@synerise/ds-icon';
import DragHandleM from '@synerise/ds-icon/dist/icons/DragHandleM';
import Button from '@synerise/ds-button';
import AngleDownS from '@synerise/ds-icon/dist/icons/AngleDownS';
import EditS from '@synerise/ds-icon/dist/icons/EditS';
import CloseS from '@synerise/ds-icon/dist/icons/CloseS';
import DuplicateS from '@synerise/ds-icon/dist/icons/DuplicateS';
import { withTheme } from 'styled-components';
import InlineEdit from '@synerise/ds-inline-edit/dist/InlineEdit';
import * as S from './ContentItem.styles';

export type ContentItemProps = {
  item: ItemProps;
  draggable?: boolean;
  onRemove?: (removeParams: { id: string }) => void;
  onDuplicate?: (duplicateParams: { id: string }) => void;
  onUpdate?: (editParams: { id: string; name: string }) => void;
  onSelect: (selectParams: { id: string }) => void;
  greyBackground: boolean;
  theme: { [k: string]: string };
  changeOrderDisabled: boolean;
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
};

const ContentItem: React.FC<ContentItemProps> = ({
  onRemove,
  onUpdate,
  onDuplicate,
  draggable,
  item,
  greyBackground = false,
  changeOrderDisabled,
  theme,
}): React.ReactElement => {
  const [contentVisible, setContentVisible] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [editedName, setName] = React.useState(item.name);

  const toggleContentVisibility = React.useCallback((): void => {
    setContentVisible(!contentVisible);
  }, [setContentVisible, contentVisible]);

  const updateName = React.useCallback((): void => {
    setEditMode(false);
    onUpdate && onUpdate({ id: item.id, name: editedName });
  }, [editedName, item.id, onUpdate]);

  const editName = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  }, []);

  const inputProps = React.useMemo(() => {
    return {
      name: 'list-item-name-input',
      defaultValue: editedName,
      value: editedName,
      onBlur: updateName,
    };
  }, [editedName, updateName]);

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

  const enterEditMode = React.useCallback((event: React.MouseEvent): void => {
    event.stopPropagation();
    setEditMode(true);
  }, []);

  const removeItem = React.useCallback(
    (event: React.MouseEvent): void => {
      event.stopPropagation();
      onRemove && onRemove({ id: item.id });
    },
    [onRemove, item.id]
  );

  const duplicateItem = React.useCallback(
    (event: React.MouseEvent): void => {
      event.stopPropagation();
      onDuplicate && onDuplicate({ id: item.id });
    },
    [onDuplicate, item.id]
  );

  return (
    <S.ItemContainer opened={contentVisible} greyBackground={greyBackground} key={item.id}>
      <S.ItemHeader>
        <S.ItemHeaderPrefix>
          {draggable && (
            <S.DraggerWrapper disabled={Boolean(changeOrderDisabled)}>
              <Icon size={24} component={<DragHandleM />} />
            </S.DraggerWrapper>
          )}
          {item.tag && item.tag}
          {item.icon && (
            <S.IconWrapper>
              <Icon size={24} component={item.icon} color={theme.palette['grey-600']} />
            </S.IconWrapper>
          )}
        </S.ItemHeaderPrefix>
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
        <S.ItemHeaderSuffix>
          <S.ItemActions>
            {renderIcon(Boolean(item.canUpdate), <EditS />, theme.palette['grey-500'], enterEditMode, 'list-item-edit')}
            {renderIcon(
              Boolean(item.canDuplicate),
              <DuplicateS />,
              theme.palette['grey-500'],
              duplicateItem,
              'list-item-duplicate'
            )}
            {renderIcon(Boolean(item.canDelete), <CloseS />, theme.palette['red-600'], removeItem, 'list-item-remove')}
          </S.ItemActions>
          {item.content && (
            <Button type="ghost" onClick={toggleContentVisibility} mode="single-icon" size="small">
              <Icon component={<AngleDownS />} size={24} />
            </Button>
          )}
        </S.ItemHeaderSuffix>
      </S.ItemHeader>
      <S.ContentWrapper>{Boolean(item.content) && item.content}</S.ContentWrapper>
    </S.ItemContainer>
  );
};

export default withTheme(ContentItem);
