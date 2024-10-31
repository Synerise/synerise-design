import React, { useCallback } from 'react';

import { RemoveIcon } from './ItemRemoveIcon';
import * as S from './ListItem.styles';
import type { ItemElementProps } from './ListItem.types';

const ItemElement = ({ item, group, highlight, onItemClick, onItemRemove, removeTooltipLabel }: ItemElementProps) => {
  const onClick = useCallback(() => onItemClick && onItemClick(item.id, group), [onItemClick, item.id, group]);
  const renderSuffixElement = (hovered: boolean) =>
    item.suffixel instanceof Function ? item.suffixel(hovered) : item.suffixel;
  return (
    <S.ListItem
      {...item}
      className="items-roll-list-item"
      highlight={highlight}
      suffixel={(hovered: boolean) => (
        <S.SuffixelWrapper>
          {renderSuffixElement(hovered) || null}
          {onItemRemove && (
            <RemoveIcon id={item.id} handleRemove={onItemRemove} tooltipLabel={removeTooltipLabel} group={group} />
          )}
        </S.SuffixelWrapper>
      )}
      onClick={onClick}
    >
      {item.text}
    </S.ListItem>
  );
};

export default ItemElement;
