import * as React from 'react';
import Menu from '@synerise/ds-menu';

import { ItemRollElement } from '../ItemsRoll.types';
import { RemoveIcon } from './ItemRemoveIcon';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = (): void => {};

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
  const [isHovered, setIsHovered] = React.useState(false);

  const onMouseEnter = React.useCallback(() => setIsHovered(true), []);
  const onMouseLeave = React.useCallback(() => setIsHovered(false), []);
  const onClick = React.useCallback(() => onItemClick && onItemClick(item.id), [onItemClick, item.id]);

  return (
    <div data-testid="list-element-wrapper" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Menu.Item
        {...item}
        className="items-roll-list-item"
        highlight={highlight}
        onItemHover={NOOP}
        suffixel={
          onItemRemove ? (
            <RemoveIcon
              id={item.id}
              isHovered={isHovered}
              handleRemove={onItemRemove}
              tooltipLabel={removeTooltipLabel}
            />
          ) : null
        }
        onClick={onClick}
      >
        {item.text}
      </Menu.Item>
    </div>
  );
};

export default ItemElement;
