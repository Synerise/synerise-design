import * as React from 'react';
import Icon from '@synerise/ds-icon';

import AnimateHeight from 'react-animate-height';
import VisibilitySensor from 'react-visibility-sensor';
import * as S from './Card.styles';
import { CardProps } from './Card.types';

const Card: React.FC<CardProps> = ({
  children,
  raised,
  disabled,
  style,
  className,
  lively,
  withHeader,
  defaultHeaderBackgroundColor,
  title,
  description,
  compactHeader,
  icon,
  renderBadge,
  iconColor,
  headerSideChildren,
  onHeaderClick,
  withoutPadding,
  headerBorderBottom,
  background = 'white-shadow',
  hideContent,
  staticContent,
  showSideChildrenWhenHeaderHidden,
  ...props
}) => {
  const fatTitle = !description || (description && compactHeader);
  const [headerActionsVisible, setHeaderActionsVisible] = React.useState(false);

  return (
    <S.Container
      raised={raised}
      disabled={disabled}
      style={style}
      className={`ds-card ${className || ''}`}
      lively={lively}
      background={background}
      /** Necessary for passing down data-* attributes */
      {...props}
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
            (renderBadge && renderBadge())}

          <S.HeaderContent compact={compactHeader} hasIcon={!!icon}>
            {title && (
              <S.Title description={description} level={4} fat={!!fatTitle}>
                {title}
              </S.Title>
            )}
            {description && <S.Description>{description}</S.Description>}
          </S.HeaderContent>

          {headerSideChildren && (
            <VisibilitySensor partialVisibility onChange={setHeaderActionsVisible}>
              <S.HeaderSideChildren onClick={(event): void => event.stopPropagation()}>
                {headerSideChildren}
              </S.HeaderSideChildren>
            </VisibilitySensor>
          )}
        </S.Header>
      )}

      {staticContent && (
        <AnimateHeight className="static-content-card-animation" duration={300} height={hideContent ? 'auto' : 0}>
          <S.ChildrenContainer>
            <S.PaddingWrapper withoutPadding={withoutPadding} withHeader={withHeader}>
              {staticContent}
            </S.PaddingWrapper>
          </S.ChildrenContainer>
        </AnimateHeight>
      )}

      <AnimateHeight className="card-animation" duration={300} height={hideContent ? 0 : 'auto'}>
        <S.ChildrenContainer>
          <S.PaddingWrapper withoutPadding={withoutPadding} withHeader={withHeader}>
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
