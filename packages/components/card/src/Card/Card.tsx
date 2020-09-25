import * as React from 'react';
import Icon from '@synerise/ds-icon';

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
  showContent,
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
      <S.ChildrenContainer className={`contentContainer ${!showContent ? 'closed' : ''}`}>
        <S.PaddingWrapper withoutPadding={withoutPadding}>
          <div className="content">{children}</div>
        </S.PaddingWrapper>
      </S.ChildrenContainer>
    </S.Container>
  );
};

export default Card;
