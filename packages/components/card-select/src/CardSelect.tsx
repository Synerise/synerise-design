import React, { useState, useRef } from 'react';
import { withTheme } from 'styled-components';
import Icon, { Check3M, InfoFillS } from '@synerise/ds-icon';
import { TagShape } from '@synerise/ds-tag';
import { useOnClickOutside } from '@synerise/ds-utils';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './CardSelect.styles';
import { CardSelectProps } from './CardSelect.types';
import {
  DEFAULT_ICON_SIZE_LARGE,
  DEFAULT_ICON_SIZE_SMALL,
  DEFAULT_TICK_SIZE_LARGE,
  DEFAULT_TICK_SIZE_SMALL,
} from './constants';

const CardSelect = ({
  title,
  description,
  customTickVisible,
  customTickVisibleComponent,
  tickVisible = true,
  stretchToFit,
  raised,
  value = false,
  size = 'medium',
  disabled,
  onChange,
  icon,
  iconSize,
  tickSize,
  elementsPosition = 'center',
  className,
  onClick,
  theme,
  error,
  tagProps,
  tagTooltipProps,
  infoTooltipProps,
}: CardSelectProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const wrapperRef = useRef(null);
  const tickIconRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    onClick ? onClick() : onChange && onChange(!value);
    setIsPressed(true);

    setTimeout(() => {
      // eslint-disable-next-line no-unused-expressions
      tickIconRef.current?.blur();
    });
  };

  const realIconSize = iconSize || (size === 'small' ? DEFAULT_ICON_SIZE_SMALL : DEFAULT_ICON_SIZE_LARGE);
  const realTickSize = tickSize || (size === 'small' ? DEFAULT_TICK_SIZE_SMALL : DEFAULT_TICK_SIZE_LARGE);

  const tagElement = tagProps && (
    <S.TagRibbonAnchor>
      <S.TagRibbon {...tagProps} shape={TagShape.DEFAULT_SQUARE} asPill />
    </S.TagRibbonAnchor>
  );
  const tagElementWithTooltip = tagTooltipProps ? <Tooltip {...tagTooltipProps}>{tagElement}</Tooltip> : tagElement;

  useOnClickOutside(wrapperRef, () => {
    isPressed && setIsPressed(false);
  });
  return (
    <S.CardWrapper
      size={size}
      className="ds-card-select-wrapper"
      disabled={disabled}
      stretchToFit={stretchToFit}
      hasTick={tickVisible || customTickVisible}
      hasIcon={!!icon}
      elementsPosition={elementsPosition}
    >
      {tagElementWithTooltip}
      <S.Container
        error={!!error}
        ref={wrapperRef}
        pressed={isPressed}
        raised={raised}
        disabled={disabled}
        value={value}
        size={size}
        onClick={handleClick}
        className={`ds-card-select ${className || ''}`}
        elementsPosition={elementsPosition}
        stretchToFit={stretchToFit}
      >
        <S.Aside
          size={size}
          elementsPosition={elementsPosition}
          tickVisible={tickVisible}
          tabIndex={disabled ? undefined : 0}
          ref={tickIconRef}
        >
          {tickVisible && (
            <S.TickIcon
              className="ds-card-select-tick"
              disabled={disabled}
              elementsPosition={elementsPosition}
              selected={value && !disabled}
              size={size}
            >
              {value ? (
                <Icon
                  size={realTickSize}
                  color={value ? theme.palette['green-600'] : theme.palette['grey-400']}
                  component={<Check3M />}
                />
              ) : (
                <S.RadioShape size={size} />
              )}
            </S.TickIcon>
          )}
          {infoTooltipProps && (
            <Tooltip {...infoTooltipProps}>
              <Icon component={<InfoFillS />} color={theme.palette['grey-400']} />
            </Tooltip>
          )}
        </S.Aside>

        <S.Main>
          {icon && (
            <S.IconWrapper size={size}>
              <Icon component={icon} size={realIconSize} />
            </S.IconWrapper>
          )}

          {title && (
            <S.Title size={size} hasIcon={!!icon}>
              {title}
            </S.Title>
          )}

          {description && size !== 'small' && (
            <S.Description size={size} hasTitle={!!title} hasIcon={!!icon}>
              {description}
            </S.Description>
          )}
        </S.Main>

        {customTickVisible && customTickVisibleComponent && (
          <S.Aside size={size}>{customTickVisible && customTickVisibleComponent}</S.Aside>
        )}
      </S.Container>
    </S.CardWrapper>
  );
};

export default withTheme(CardSelect);
