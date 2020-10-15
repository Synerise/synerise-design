import * as React from 'react';
import Icon from '@synerise/ds-icon';

import AnimateHeight from 'react-animate-height';
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
  title,
  description,
  compactHeader,
  icon,
  iconColor,
  headerSideChildren,
  onHeaderClick,
  withoutPadding,
  headerBorderBottom,
  background = 'white-shadow',
  hideContent,
}) => {
  const fatTitle = !description || (description && compactHeader);

  return (
    <S.Container
      raised={raised}
      disabled={disabled}
      style={style}
      className={`ds-card ${className || ''}`}
      lively={lively}
      background={background}
    >
      {withHeader && (
        <S.Header onClick={onHeaderClick} headerBorderBottom={headerBorderBottom}>
          {icon && (
            <S.IconContainer compact={compactHeader}>
              <Icon component={icon} color={iconColor} />
            </S.IconContainer>
          )}

          <S.HeaderContent compact={compactHeader} hasIcon={!!icon}>
            {title && (
              <S.Title level={4} fat={!!fatTitle}>
                {title}
              </S.Title>
            )}
            {description && <S.Description>{description}</S.Description>}
          </S.HeaderContent>

          {headerSideChildren && (
            <S.HeaderSideChildren onClick={(event): void => event.stopPropagation()}>
              {headerSideChildren}
            </S.HeaderSideChildren>
          )}
        </S.Header>
      )}
      <AnimateHeight className="card-animation" duration={300} height={hideContent ? 0 : 'auto'}>
        <S.ChildrenContainer>
          <S.PaddingWrapper withoutPadding={withoutPadding} withHeader={withHeader}>{children}</S.PaddingWrapper>
        </S.ChildrenContainer>
      </AnimateHeight>
    </S.Container>
  );
};

export default Card;
