import React from 'react';
import { NOOP } from '@synerise/ds-utils';

import { RemoveIcon } from './ItemRemoveIcon';
import * as S from './ListItem.styles';
import { ItemElementProps } from './ListItem.types';

const ItemElement: React.FC<ItemElementProps> = ({
  item,
  group,
  highlight,
  onItemClick,
  onItemRemove,
  removeTooltipLabel,
}) => {
  const onClick = React.useCallback(() => onItemClick && onItemClick(item.id, group), [onItemClick, item.id, group]);
  const renderSuffixElement = (hovered: boolean): React.ReactNode =>
    item.suffixel instanceof Function ? item.suffixel(hovered) : item.suffixel;
  return (
    <S.ListItem
      {...item}
      className="items-roll-list-item"
      highlight={highlight}
      onItemHover={NOOP}
      suffixel={(hovered: boolean): React.ReactNode => (
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
