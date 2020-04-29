import * as React from 'react';
import { ListChildComponentProps } from 'react-window';
import styled from 'styled-components';
import Icon from '@synerise/ds-icon';
import CloseS from '@synerise/ds-icon/dist/icons/CloseS';
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

const RemoveIconWrapper = styled.div`
  .ds-icon {
    svg {
      fill: ${({ theme }): string => theme.palette['red-600']};
    }
  }
`;

const RemoveIcon: React.FC<RemoveIconProps> = ({ id, handleRemove, tooltipLabel }) => (
  <Tooltip title={tooltipLabel}>
    <RemoveIconWrapper>
      <Icon
        className="element-remove-icon"
        onClick={(e): void => {
          e.stopPropagation();
          handleRemove(id);
        }}
        component={<CloseS />}
        size={24}
        color="#f52922"
      />
    </RemoveIconWrapper>
  </Tooltip>
);

type ItemRendererProps = {
  highlight: string;
  onItemClick?: (id: string) => void;
  onItemRemove?: (id: string) => void;
  tooltipLabel: string | React.ReactNode;
};

export const ItemRenderer = ({ highlight, onItemClick, onItemRemove, tooltipLabel }: ItemRendererProps) => ({
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
        onItemHover={NOOP}
        style={style}
        suffixel={
          isHovered && onItemRemove ? (
            <RemoveIcon id={item.id} handleRemove={onItemRemove} tooltipLabel={tooltipLabel} />
          ) : null
        }
        onClick={onClick}
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
  onItemClick?: (id: string) => void;
  onItemRemove?: (id: string) => void;
  removeTooltipLabel: string | React.ReactNode;
};

export const ItemElement: React.FC<ItemElementProps> = ({
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
          isHovered && onItemRemove ? (
            <RemoveIcon id={item.id} handleRemove={onItemRemove} tooltipLabel={removeTooltipLabel} />
          ) : null
        }
        onClick={onClick}
      >
        {item.text}
      </Menu.Item>
    </div>
  );
};
