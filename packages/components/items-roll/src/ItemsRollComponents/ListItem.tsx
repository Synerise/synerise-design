import * as React from 'react';
import Icon from '@synerise/ds-icon';
import CloseS from '@synerise/ds-icon/dist/icons/CloseS';
import { ListChildComponentProps } from 'react-window';
import Menu from '@synerise/ds-menu';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';

import { ItemRollElement } from '../ItemsRoll.types';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = (): void => {};

type RemoveIconProps = {
  id: string;
  handleRemove: (id: string) => void;
  tooltipLabel: string | React.ReactNode;
};

const RemoveIcon: React.FC<RemoveIconProps> = ({ id, handleRemove, tooltipLabel }) => (
  <Tooltip title={tooltipLabel}>
    <div>
      <Icon
        className="element-remove-icon"
        onClick={(e): void => {
          e.stopPropagation();
          handleRemove(id);
        }}
        component={<CloseS />}
        size={24}
      />
    </div>
  </Tooltip>
);

type ItemRendererProps = {
  tooltipLabel: string | React.ReactNode;
  highlight: string;
};

export const ItemRenderer = ({ highlight, tooltipLabel }: ItemRendererProps) => ({
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

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Menu.Item
        highlight={highlight}
        onItemHover={NOOP}
        style={style}
        suffixel={
          isHovered && item.onRemoveElement ? (
            <RemoveIcon id={item.id} handleRemove={item.onRemoveElement} tooltipLabel={tooltipLabel} />
          ) : null
        }
        {...item}
      >
        {item.text}
      </Menu.Item>
    </div>
  );
};

type ItemElementProps = {
  highlight: string;
  item: ItemRollElement;
  removeTooltipLabel: string | React.ReactNode;
};

export const ItemElement: React.FC<ItemElementProps> = ({ item, highlight, removeTooltipLabel }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const onMouseEnter = React.useCallback(() => setIsHovered(true), []);
  const onMouseLeave = React.useCallback(() => setIsHovered(false), []);

  return (
    <div data-testid="list-element-wrapper" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Menu.Item
        {...item}
        className="items-roll-list-item"
        highlight={highlight}
        onItemHover={NOOP}
        suffixel={
          isHovered && item.onRemoveElement ? (
            <RemoveIcon id={item.id} handleRemove={item.onRemoveElement} tooltipLabel={removeTooltipLabel} />
          ) : null
        }
      >
        {item.text}
      </Menu.Item>
    </div>
  );
};
