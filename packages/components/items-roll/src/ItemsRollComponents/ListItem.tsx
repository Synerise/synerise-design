import * as React from 'react';
import Menu from '@synerise/ds-menu';

import { ItemRollElement } from '../ItemsRoll.types';
import { RemoveIcon } from './ItemRemoveIcon';
import * as S from './ListItem.styles';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const NOOP = (): void => {};

type ItemElementProps = {
  highlight: string;
  item: ItemRollElement;
  onItemClick?: (id: string) => void;
  onItemRemove?: (id: string) => void;
  removeTooltipLabel: string | React.ReactNode;
};

const ItemElement: React.FC<ItemElementProps> = ({
  item,
  highlight,
  onItemClick,
  onItemRemove,
  removeTooltipLabel,
}) => {
  const onClick = React.useCallback(() => onItemClick && onItemClick(item.id), [onItemClick, item.id]);

  return (
    <S.ListItem data-testid="list-element-wrapper">
      <Menu.Item
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
      </Menu.Item>
    </S.ListItem>
  );
};

export default ItemElement;
