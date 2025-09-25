import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import VisibilitySensor from 'react-visibility-sensor';

import Icon from '@synerise/ds-icon';

import { ANIMATION_DURATION } from '../constants';
import * as S from './Card.styles';
import { type CardProps } from './Card.types';

const Card = ({
  children,
  raised,
  disabled,
  className,
  lively,
  withHeader,
  defaultHeaderBackgroundColor,
  title,
  description,
  compactHeader,
  icon,
  avatar,
  renderBadge,
  iconColor,
  headerSideChildren,
  onHeaderClick,
  withoutPadding,
  headerBorderBottom,
  background = 'white-shadow',
  hideContent,
  staticContent,
  titleTag,
  showSideChildrenWhenHeaderHidden,
  ...htmlAttributes
}: CardProps) => {
  const fatTitle = !description || (description && compactHeader);
  const [headerActionsVisible, setHeaderActionsVisible] = useState(false);

  const renderTitle = () => {
    if (!title && !titleTag) {
      return null;
    }
    return (
      <S.TitleWrapper
        data-testid="card-title"
        compact={compactHeader}
        description={Boolean(description)}
      >
        {title && (
          <S.Title level={4} fat={!!fatTitle}>
            {title}
          </S.Title>
        )}
        {titleTag && <S.TitleTag>{titleTag}</S.TitleTag>}
      </S.TitleWrapper>
    );
  };

  return (
    <S.Container
      raised={raised}
      disabled={disabled}
      className={`ds-card ${className || ''}`}
      lively={lively}
      data-testid="card-wrapper"
      background={background}
      /** Necessary for passing down data-* attributes */
      {...htmlAttributes}
    >
      {withHeader && (
        <S.Header
          onClick={onHeaderClick}
          headerBorderBottom={headerBorderBottom}
          defaultHeaderBackgroundColor={defaultHeaderBackgroundColor}
        >
          {(icon && (
            <S.IconContainer description={description} compact={compactHeader}>
              <Icon component={icon} color={iconColor} />
            </S.IconContainer>
          )) ||
            avatar ||
            (renderBadge && renderBadge())}

          <S.HeaderContent
            compact={compactHeader}
            hasIconOrAvatar={Boolean(icon || avatar)}
          >
            {renderTitle()}
            {description && (
              <S.Description data-testid="card-description">
                {description}
              </S.Description>
            )}
          </S.HeaderContent>

          {headerSideChildren && (
            <VisibilitySensor
              partialVisibility
              onChange={setHeaderActionsVisible}
            >
              <S.HeaderSideChildren
                onClick={(event): void => event.stopPropagation()}
              >
                {headerSideChildren}
              </S.HeaderSideChildren>
            </VisibilitySensor>
          )}
        </S.Header>
      )}

      {staticContent && (
        <AnimateHeight
          className="static-content-card-animation"
          duration={ANIMATION_DURATION}
          height={hideContent ? 'auto' : 0}
        >
          <S.ChildrenContainer data-testid="card-static-content">
            <S.PaddingWrapper
              withoutPadding={withoutPadding}
              withHeader={withHeader}
            >
              {staticContent}
            </S.PaddingWrapper>
          </S.ChildrenContainer>
        </AnimateHeight>
      )}

      <AnimateHeight
        className="card-animation"
        duration={ANIMATION_DURATION}
        height={hideContent ? 0 : 'auto'}
      >
        <S.ChildrenContainer data-testid="card-content">
          <S.PaddingWrapper
            withoutPadding={withoutPadding}
            withHeader={withHeader}
          >
            {children}
          </S.PaddingWrapper>
        </S.ChildrenContainer>
      </AnimateHeight>

      {showSideChildrenWhenHeaderHidden && (
        <AnimateHeight
          className="card-animation-footer"
          duration={0}
          height={headerSideChildren && !headerActionsVisible ? 'auto' : 0}
        >
          <S.FooterContainer>{headerSideChildren}</S.FooterContainer>
        </AnimateHeight>
      )}
    </S.Container>
  );
};

export default Card;
