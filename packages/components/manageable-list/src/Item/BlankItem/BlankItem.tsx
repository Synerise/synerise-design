import React, { type MouseEvent, useCallback } from 'react';

import { useTheme } from '@synerise/ds-core';
import Icon, { CloseS, DragHandleM, DuplicateS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { useTexts } from '../../hooks/useTexts';
import * as S from './BlankItem.styles';
import { type BlankItemProps } from './BlankItem.types';

const BlankItem = <T extends object>({
  onRemove,
  onDuplicate,
  draggable,
  renderItem,
  item,
  texts,
  rowGap = 16,
  isDragPlaceholder,
  isDragOverlay,
  dragHandleProps,
  ...rest
}: BlankItemProps<T>) => {
  const theme = useTheme();
  const allTexts = useTexts(texts);

  const handleRemove = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      const { id } = item;
      onRemove && onRemove({ id });
    },
    [item, onRemove],
  );
  const handleDuplicate = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      const { id } = item;
      onDuplicate && onDuplicate({ id });
    },
    [item, onDuplicate],
  );

  return (
    <S.BlankItemWrapper
      isDragPlaceholder={isDragPlaceholder}
      isDragOverlay={isDragOverlay}
      key={item.id}
      data-testid="manageable-list-blank-item"
      rowGap={rowGap}
      {...rest}
    >
      {(draggable || isDragOverlay) && (
        <S.DragHandle {...dragHandleProps}>
          <Icon size={24} component={<DragHandleM color="currentColor" />} />
        </S.DragHandle>
      )}
      <S.BlankItemContent>{renderItem(item)}</S.BlankItemContent>
      {(onRemove || onDuplicate) && (
        <S.BlankItemActions>
          {onDuplicate && (
            <Tooltip
              type="default"
              trigger="hover"
              title={allTexts.itemActionDuplicateTooltip}
            >
              <Icon
                component={<DuplicateS />}
                color={theme.palette['grey-600']}
                size={24}
                onClick={handleDuplicate}
              />
            </Tooltip>
          )}
          {onRemove && (
            <Tooltip
              type="default"
              trigger="hover"
              title={allTexts.itemActionDeleteTooltip}
            >
              <Icon
                component={<CloseS />}
                size={24}
                color={theme.palette['red-600']}
                onClick={handleRemove}
              />
            </Tooltip>
          )}
        </S.BlankItemActions>
      )}
    </S.BlankItemWrapper>
  );
};

export default BlankItem;
