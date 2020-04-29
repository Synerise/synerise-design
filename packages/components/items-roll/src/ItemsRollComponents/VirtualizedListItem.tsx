import * as React from 'react';
import { ListChildComponentProps } from 'react-window';
import Menu from '@synerise/ds-menu';

import { RemoveIcon } from './ItemRemoveIcon';
import { ItemRollElement } from '../ItemsRoll.types';

type ItemRendererProps = {
  highlight: string;
  onItemClick?: (id: string) => void;
  onItemRemove?: (id: string) => void;
  tooltipLabel: string | React.ReactNode;
};

const ItemRenderer = ({ highlight, onItemClick, onItemRemove, tooltipLabel }: ItemRendererProps) => ({
  index,
  style,
  data,
}: ListChildComponentProps): JSX.Element => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isHovered, setIsHovered] = React.useState(false);
  const { suffixel, ...item } = data[index] as ItemRollElement;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onMouseEnter = React.useCallback(() => setIsHovered(true), []);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onMouseLeave = React.useCallback(() => setIsHovered(false), []);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onClick = React.useCallback(() => onItemClick && onItemClick(item.id), [item.id]);

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Menu.Item
        className="items-roll-list-item"
        highlight={highlight}
        onClick={onClick}
        style={style}
        suffixel={
          onItemRemove ? (
            <RemoveIcon id={item.id} isHovered={isHovered} handleRemove={onItemRemove} tooltipLabel={tooltipLabel} />
          ) : null
        }
      >
        {item.text}
      </Menu.Item>
    </div>
  );
};

export default ItemRenderer;
