import * as React from 'react';
import Icon from '@synerise/ds-icon';
import classNames from 'classnames';
import * as S from './Tab.styles';
import { TabProps } from './Tab.types';

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
  block,
  suffixel,
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
  const renderSuffixel = (): React.ReactNode => {
    if (typeof suffixel === 'string' || typeof suffixel === 'number') {
      return <S.SuffixWrapper>{suffixel}</S.SuffixWrapper>;
    }
    return <S.DefaultSuffixWrapper>{suffixel}</S.DefaultSuffixWrapper>;
  };

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
      block={block}
    >
      <S.BlockContentWrapper block={block}>
        <S.TabContent className="tab-content">
          {icon && <Icon component={icon} size={24} />}
          {label && <S.TabLabel>{label}</S.TabLabel>}
          {!!suffixel && renderSuffixel()}
        </S.TabContent>
      </S.BlockContentWrapper>
    </S.TabContainer>
  );
};

Tab.defaultProps = {
  underscore: true,
};

export default Tab;
