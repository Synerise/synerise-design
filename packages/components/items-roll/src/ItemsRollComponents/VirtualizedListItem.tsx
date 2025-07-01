import React, { useCallback } from 'react';
import { type ListChildComponentProps } from 'react-window';

import { type ItemRollElement } from '../ItemsRoll.types';
import { RemoveIcon } from './ItemRemoveIcon';
import * as S from './ListItem.styles';
import { type ItemRendererProps } from './VirtualizedListItem.types';

const ItemRenderer =
  ({
    highlight,
    onItemClick,
    onItemRemove,
    tooltipLabel,
    group,
  }: ItemRendererProps) =>
  ({ index, style, data }: ListChildComponentProps) => {
    const { suffixel, ...item } = data[index] as ItemRollElement;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onClick = useCallback(
      () => onItemClick && onItemClick(item.id, group),
      [item.id],
    );

    return (
      <S.ListItem
        className="items-roll-list-item"
        highlight={highlight}
        onClick={onClick}
        style={style}
        suffixel={
          <S.SuffixelWrapper>
            <>
              {suffixel}
              {!!onItemRemove && (
                <RemoveIcon
                  id={item.id}
                  handleRemove={onItemRemove}
                  tooltipLabel={tooltipLabel}
                  group={group}
                />
              )}
            </>
          </S.SuffixelWrapper>
        }
      >
        {item.text}
      </S.ListItem>
    );
  };

export default ItemRenderer;
