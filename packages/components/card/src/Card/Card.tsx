import * as React from 'react';
import Icon from '@synerise/ds-icon';

import ResizeObserver from 'rc-resize-observer';
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
  const [contentHeight, setContentHeight] = React.useState<number>(2000);
  return (
    <S.Container
      raised={raised}
      disabled={disabled}
      style={style}
      className={`ds-card ${className || ''}`}
      lively={lively}
      background={background}
      contentHeight={contentHeight}
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
      <S.ChildrenContainer className={`contentContainer ${hideContent ? 'closed' : 'open'}`}>
        <S.PaddingWrapper withoutPadding={withoutPadding}>
          <ResizeObserver
            onResize={({ height }): void => {
              console.log(height);
              setContentHeight(height);
            }}
          >
            {children}
          </ResizeObserver>
        </S.PaddingWrapper>
      </S.ChildrenContainer>
    </S.Container>
  );
};

export default Card;
