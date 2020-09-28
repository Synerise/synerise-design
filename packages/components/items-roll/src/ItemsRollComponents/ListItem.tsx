import * as React from 'react';

import { RemoveIcon } from './ItemRemoveIcon';
import * as S from './ListItem.styles';
import { ItemElementProps } from './ListItem.types';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const NOOP = (): void => {};

const ItemElement: React.FC<ItemElementProps> = ({
  item,
  highlight,
  onItemClick,
  onItemRemove,
  removeTooltipLabel,
}) => {
  const onClick = React.useCallback(() => onItemClick && onItemClick(item.id), [onItemClick, item.id]);

  return (
    <S.ListItem
      {...item}
      className="items-roll-list-item"
      highlight={highlight}
      onItemHover={NOOP}
      suffixel={
        <S.SuffixelWrapper>
          {item.suffixel}
          {onItemRemove && <RemoveIcon id={item.id} handleRemove={onItemRemove} tooltipLabel={removeTooltipLabel} />}
        </S.SuffixelWrapper>
      }
      onClick={onClick}
    >
      {item.text}
    </S.ListItem>
  );
};

export default ItemElement;
