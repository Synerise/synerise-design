import React from 'react';

import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import Cruds from '@synerise/ds-cruds';
import Icon, { Add3M } from '@synerise/ds-icon';

import * as S from './EditableItemsList.style';
import { type EditableItemsListProps } from './EditableItemsList.types';

const DEFAULT_ADD_BUTTON_PROPS = {
  type: 'ghost-primary',
  style: { transition: 'none' },
};

const EditableItemsList = <T extends { id: string }>({
  renderRowElement,
  items = [],
  addButtonLabel,
  addButtonIcon,
  addButtonProps,
  onAdd,
  minRowLength = 1,
  maxRowLength,
  deleteTooltip,
  onDelete,
}: EditableItemsListProps<T>) => {
  const mergedAddButtonProps = {
    ...DEFAULT_ADD_BUTTON_PROPS,
    ...addButtonProps,
    style: {
      ...DEFAULT_ADD_BUTTON_PROPS.style,
      ...addButtonProps?.style,
    },
  };

  return (
    <>
      {items.map((item, index) => (
        <S.RowWrapper key={item.id} data-testid={`item-${item.id}`}>
          {renderRowElement(index, item)}
          {items.length > minRowLength && (
            <S.CrudWrapper>
              <Cruds
                onRemove={onDelete ? () => onDelete(item.id, index) : undefined}
                removeTooltip={deleteTooltip}
                data-testid={`remove-button-${item.id}`}
              />
            </S.CrudWrapper>
          )}
        </S.RowWrapper>
      ))}
      <Button
        {...mergedAddButtonProps}
        onClick={onAdd}
        disabled={maxRowLength !== undefined && items.length >= maxRowLength}
      >
        {addButtonIcon || (
          <Icon
            component={<Add3M />}
            size={24}
            color={theme.palette['blue-600']}
          />
        )}
        {addButtonLabel}
      </Button>
    </>
  );
};

export default EditableItemsList;
