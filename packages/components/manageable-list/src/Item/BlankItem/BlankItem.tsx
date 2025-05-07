import React, { MouseEvent, useCallback } from 'react';

import Tooltip from '@synerise/ds-tooltip';
import Icon, { CloseS, DragHandleM, DuplicateS } from '@synerise/ds-icon';
import { useTheme } from '@synerise/ds-core';

import { BlankItemProps } from './BlankItem.types';
import * as S from './BlankItem.styles';

import { useTexts } from '../../hooks/useTexts';

const BlankItem = <T extends object>({
  onRemove,
  onDuplicate,
  draggable,
  renderItem,
  item,
  texts,
  rowGap = 16,
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
    [item, onRemove]
  );
  const handleDuplicate = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      const { id } = item;
      onDuplicate && onDuplicate({ id });
    },
    [item, onDuplicate]
  );
  return (
    <S.BlankItemWrapper key={item.id} data-testid="manageable-list-blank-item" rowGap={rowGap} {...rest}>
      {draggable && (
        <S.DragHandle className="item-drag-handle">
          <Icon size={24} component={<DragHandleM color="currentColor" />} />
        </S.DragHandle>
      )}
      <S.BlankItemContent>{renderItem(item)}</S.BlankItemContent>
      {(onRemove || onDuplicate) && (
        <S.BlankItemActions>
          {onDuplicate && (
            <Tooltip type="default" trigger="hover" title={allTexts.itemActionDuplicateTooltip}>
              <Icon component={<DuplicateS />} color={theme.palette['grey-600']} size={24} onClick={handleDuplicate} />
            </Tooltip>
          )}
          {onRemove && (
            <Tooltip type="default" trigger="hover" title={allTexts.itemActionDeleteTooltip}>
              <Icon component={<CloseS />} size={24} color={theme.palette['red-600']} onClick={handleRemove} />
            </Tooltip>
          )}
        </S.BlankItemActions>
      )}
    </S.BlankItemWrapper>
  );
};

export default BlankItem;
