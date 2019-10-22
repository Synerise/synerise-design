import * as React from 'react';
import * as S from './Tab.styles';
import Icon from '@synerise/ds-icon';
import { RefObject } from 'react';

export type TabProps = {
  index: number;
  label?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  onClick: (index: number) => void;
  forwardedRef: RefObject<HTMLButtonElement>;
}

const Tab: React.FC<TabProps> = ({
  index,
  label,
  icon,
  isActive,
  disabled,
  onClick,
  forwardedRef,
}:TabProps) => {
  const [isPressed, setPressed] = React.useState(false);
  const handleClick = (): void => {
    onClick(index);
  };

  const handleMouseDown = () => {
    setPressed(true);
  };

  const handleMouseUp = () => {
    setPressed(false);
  };

  const isPressedClassName = (): string => {
    return isPressed ? 'pressed': '';
  };

  const isActiveClassName = (): string => {
    return isActive ? 'active' : '';
  };

  return (
    <S.TabContainer
      className={`${isActiveClassName()} ${isPressedClassName()}`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseUp}
      onBlur={handleMouseUp}
      disabled={disabled}
      ref={forwardedRef}
    >
      <S.TabContent>
        {icon && <Icon component={icon} size={24} />}
        {label && <S.TabLabel>{label}</S.TabLabel>}
      </S.TabContent>
    </S.TabContainer>
  )
};

export default Tab;