import * as React from 'react';
import EditS from '@synerise/ds-icon/dist/icons/EditS';
import DuplicateS from '@synerise/ds-icon/dist/icons/DuplicateS';
import CloseS from '@synerise/ds-icon/dist/icons/CloseS';
import Icon from '@synerise/ds-icon';
import { withTheme } from 'styled-components';
import { ItemProps } from '../Item';
import * as S from './ItemActions.styles';

type ItemActionsProps = {
  item: ItemProps;
  removeAction?: (removeParams: { id: string }) => void;
  editAction?: () => void;
  duplicateAction?: (duplicateParams: { id: string }) => void;
  theme: { [k: string]: string };
};

const ItemActions: React.FC<ItemActionsProps> = ({
  item,
  theme,
  duplicateAction,
  editAction,
  removeAction,
}): React.ReactElement => {
  const handleDuplicate = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      const { id } = item;
      duplicateAction && duplicateAction({ id });
    },
    [item, duplicateAction]
  );

  const handleRemove = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      const { id } = item;
      removeAction && removeAction({ id });
    },
    [item, removeAction]
  );

  const handleEdit = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      editAction && editAction();
    },
    [editAction]
  );

  const renderIcon = React.useCallback(
    (
      condition: boolean,
      icon: React.ReactNode,
      color: string,
      handleClick: (event: React.MouseEvent) => void,
      testId: string
    ): React.ReactNode =>
      condition && (
        <div data-testid={testId}>
          <Icon component={icon} size={24} color={color} onClick={handleClick} />
        </div>
      ),
    []
  );

  return (
    <S.ItemActionsWrapper>
      {renderIcon(Boolean(item.canUpdate), <EditS />, theme.palette['grey-500'], handleEdit, 'list-item-edit')}
      {renderIcon(
        Boolean(item.canDuplicate),
        <DuplicateS />,
        theme.palette['grey-500'],
        handleDuplicate,
        'list-item-duplicate'
      )}
      {renderIcon(Boolean(item.canDelete), <CloseS />, theme.palette['red-600'], handleRemove, 'list-item-remove')}
    </S.ItemActionsWrapper>
  );
};

export default withTheme(ItemActions);
