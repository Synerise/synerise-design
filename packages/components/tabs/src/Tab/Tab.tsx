import * as React from 'react';
import Icon from '@synerise/ds-icon';
import classNames from 'classnames';
import * as S from './Tab.styles';

export type TabProps = {
  index: number;
  label?: string | React.ReactNode;
  icon?: React.ReactNode;
  underscore?: boolean;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
  onClick: (index: number) => void;
  forwardedRef: React.RefObject<HTMLButtonElement>;
};

const Tab: React.FC<TabProps> = ({
  index,
  label,
  icon,
  isActive,
  disabled,
  onClick,
  forwardedRef,
  underscore,
  className,
}: TabProps) => {
  const [isPressed, setPressed] = React.useState(false);
  const handleClick = (): void => {
    onClick(index);
  };

  const handleMouseDown = (): void => {
    setPressed(true);
  };

  const handleMouseUp = (): void => {
    setPressed(false);
  };

  const containerClasses = classNames(className, {
    underscore,
    active: isActive,
    pressed: isPressed,
  });

  return (
    <S.TabContainer
      className={containerClasses}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseUp}
      onBlur={handleMouseUp}
      disabled={disabled}
      ref={forwardedRef}
      type="button"
      data-testid="tab-container"
    >
      <S.TabContent>
        {icon && <Icon component={icon} size={24} />}
        {label && <S.TabLabel>{label}</S.TabLabel>}
      </S.TabContent>
    </S.TabContainer>
  );
};

Tab.defaultProps = {
  underscore: true,
};

export default Tab;
