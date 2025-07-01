import React from 'react';

import { theme } from '@synerise/ds-core';
import Icon, { CloseS, DuplicateS, EditS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './ItemActions.styles';
import { type ItemActionsProps } from './ItemActions.types';

const DEFAULT_COLOR = theme.palette['grey-500'];

const ItemActions: React.FC<ItemActionsProps> = ({
  item,
  duplicateAction,
  duplicateActionTooltip,
  editAction,
  editActionTooltip,
  removeAction,
  removeActionTooltip,
  additionalActions,
}): React.ReactElement => {
  const handleDuplicate = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      const { id } = item;
      duplicateAction && duplicateAction({ id });
    },
    [item, duplicateAction],
  );

  const handleRemove = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      const { id } = item;
      removeAction && removeAction({ id });
    },
    [item, removeAction],
  );

  const handleEdit = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      editAction && editAction();
    },
    [editAction],
  );

  const renderIcon = React.useCallback(
    (
      condition: boolean,
      icon: React.ReactNode,
      color: string,
      handleClick: (event: React.MouseEvent) => void,
      testId: string,
      tooltip: string | React.ReactNode,
    ): React.ReactNode => {
      return (
        condition && (
          <Tooltip type="default" trigger="hover" title={tooltip}>
            <div data-testid={testId}>
              <Icon
                component={icon}
                size={24}
                color={color}
                onClick={handleClick}
              />
            </div>
          </Tooltip>
        )
      );
    },
    [],
  );
  const renderAdditionalActions = React.useMemo(() => {
    return (
      additionalActions &&
      additionalActions.map((action, index) =>
        renderIcon(
          true,
          action.icon,
          action.color || DEFAULT_COLOR,
          () => action.onClick(item),
          `additional-action-${index}`,
          action.tooltip,
        ),
      )
    );
  }, [additionalActions, item, renderIcon]);

  return (
    <S.ItemActionsWrapper>
      {additionalActions && renderAdditionalActions}
      {renderIcon(
        Boolean(item.canUpdate),
        <EditS />,
        DEFAULT_COLOR,
        handleEdit,
        'list-item-edit',
        editActionTooltip,
      )}
      {renderIcon(
        Boolean(item.canDuplicate),
        <DuplicateS />,
        DEFAULT_COLOR,
        handleDuplicate,
        'list-item-duplicate',
        duplicateActionTooltip,
      )}
      {renderIcon(
        Boolean(item.canDelete),
        <CloseS />,
        theme.palette['red-600'],
        handleRemove,
        'list-item-remove',
        removeActionTooltip,
      )}
    </S.ItemActionsWrapper>
  );
};

export default ItemActions;
