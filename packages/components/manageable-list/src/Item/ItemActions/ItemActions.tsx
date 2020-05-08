import * as React from 'react';
import EditS from '@synerise/ds-icon/dist/icons/EditS';
import DuplicateS from '@synerise/ds-icon/dist/icons/DuplicateS';
import CloseS from '@synerise/ds-icon/dist/icons/CloseS';
import Icon from '@synerise/ds-icon';
import { withTheme } from 'styled-components';
import Tooltip from '@synerise/ds-tooltip';
import { ItemProps } from '../Item';
import * as S from './ItemActions.styles';

type ItemActionsProps = {
  item: ItemProps;
  removeAction?: (removeParams: { id: string }) => void;
  removeActionTooltip?: string | React.ReactNode;
  editAction?: () => void;
  editActionTooltip?: string | React.ReactNode;
  duplicateAction?: (duplicateParams: { id: string }) => void;
  duplicateActionTooltip?: string | React.ReactNode;
  theme: { [k: string]: string };
};

const ItemActions: React.FC<ItemActionsProps> = ({
  item,
  theme,
  duplicateAction,
  duplicateActionTooltip,
  editAction,
  editActionTooltip,
  removeAction,
  removeActionTooltip,
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
      testId: string,
      tooltip: string | React.ReactNode
    ): React.ReactNode =>
      condition && (
        <Tooltip type="default" trigger="hover" title={tooltip}>
          <div data-testid={testId}>
            <Icon component={icon} size={24} color={color} onClick={handleClick} />
          </div>
        </Tooltip>
      ),
    []
  );

  return (
    <S.ItemActionsWrapper>
      {renderIcon(
        Boolean(item.canUpdate),
        <EditS />,
        theme.palette['grey-500'],
        handleEdit,
        'list-item-edit',
        editActionTooltip
      )}
      {renderIcon(
        Boolean(item.canDuplicate),
        <DuplicateS />,
        theme.palette['grey-500'],
        handleDuplicate,
        'list-item-duplicate',
        duplicateActionTooltip
      )}
      {renderIcon(
        Boolean(item.canDelete),
        <CloseS />,
        theme.palette['red-600'],
        handleRemove,
        'list-item-remove',
        removeActionTooltip
      )}
    </S.ItemActionsWrapper>
  );
};

export default withTheme(ItemActions);
