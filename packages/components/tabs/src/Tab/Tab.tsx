import * as React from 'react';
import * as S from './Tab.styles';
import Icon from '@synerise/ds-icon';

export type TabProps = {
  index: number;
  label?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick: (index: number) => void;
}

const Tab: React.FC<TabProps> = ({
  index,
  label,
  icon,
  isActive,
  onClick,
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
    if (isPressed) return 'pressed';
    return '';
  };

  const isActiveClassName = (): string => {
    if (isActive) return 'active';
    return '';
  };

  return (
    <S.TabContainer
      className={`${ isActiveClassName() } ${isPressedClassName()}`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <S.TabContent>
        {icon && <Icon component={icon} size={24} />}
        {label && <S.TabLabel>{label}</S.TabLabel>}
      </S.TabContent>
    </S.TabContainer>
  )
};

export default Tab;