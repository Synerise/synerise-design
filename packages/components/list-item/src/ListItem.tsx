import React, { useState } from 'react';
import StyledListItem, { StyledIconWrapper } from './ListItem.styles';

export type ListItemProps = {
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  danger?: boolean;
  prefixCls?: string;
  direction?: 'ltr' | 'rtl';
  switch?: boolean;
  title?: string;
  noHover?: boolean;
  size?: 'default' | 'large';
  selectable?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const ListItem = (props: ListItemProps) => {
  const {
    className,
    children,
    icon,
    danger,
    prefixCls = 'ant-menu',
    title,
    noHover,
    size,
    selectable = true,
    ...rest
  } = props;

  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(true);
  };

  const handleMouseLeave = () => {
    setIsSelected(false);
  };

  const renderItemChildren = () => {
    return <span className={`${prefixCls}-title-content`}>{children}</span>;
  };

  const listItemNode = (
    <StyledListItem
      className={`ds-search-item ${className} ${isSelected ? 'selected' : ''}`}
      title={title || (typeof children === 'string' ? children : undefined)}
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      noHover={noHover}
      size={size}
      selectable={selectable}
      isSelected={isSelected}
      {...rest}
    >
      {icon && <StyledIconWrapper>{icon}</StyledIconWrapper>}
      {renderItemChildren()}
    </StyledListItem>
  );

  return listItemNode;
};

export default ListItem;
