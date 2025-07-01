import classNames from 'classnames';
import React, { useState } from 'react';

import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './Tab.styles';
import { type TabProps } from './Tab.types';

const Tab = ({
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
  tooltip,
  tooltipProps,
}: TabProps) => {
  const [isPressed, setPressed] = useState(false);
  const handleClick = () => {
    onClick(index);
  };

  const handleMouseDown = () => {
    setPressed(true);
  };

  const handleMouseUp = () => {
    setPressed(false);
  };

  const containerClasses = classNames(className, {
    underscore,
    active: isActive,
    pressed: isPressed,
  });
  const renderSuffixel = () => {
    if (typeof suffixel === 'string' || typeof suffixel === 'number') {
      return <S.SuffixWrapper>{suffixel}</S.SuffixWrapper>;
    }
    return <S.DefaultSuffixWrapper>{suffixel}</S.DefaultSuffixWrapper>;
  };

  const tabContent = (
    <S.BlockContentWrapper block={block}>
      <S.TabContent className="tab-content" data-testid="ds-tabs-tab-content">
        {icon && (
          <Icon data-testid="ds-tabs-tab-icon" component={icon} size={24} />
        )}
        {label && (
          <S.TabLabel data-testid="ds-tabs-tab-label">{label}</S.TabLabel>
        )}
        {!!suffixel && renderSuffixel()}
      </S.TabContent>
    </S.BlockContentWrapper>
  );

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
      {tooltip ? (
        <Tooltip title={tooltip} {...tooltipProps}>
          {tabContent}
        </Tooltip>
      ) : (
        tabContent
      )}
    </S.TabContainer>
  );
};

Tab.defaultProps = {
  underscore: true,
};

export default Tab;
