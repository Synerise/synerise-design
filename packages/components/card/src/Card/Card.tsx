import * as React from 'react';
import Icon from '@synerise/ds-icon';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Animate from 'rc-animate';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import velocity from 'velocity-animate';

import * as S from './Card.styles';

export type Backgrounds = 'white' | 'white-shadow' | 'grey' | 'grey-shadow' | 'outline';

export interface CardProps {
  raised?: boolean;
  disabled?: boolean;
  className?: string;
  lively?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  withHeader?: boolean;
  compactHeader?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  iconColor?: string;
  headerSideChildren?: React.ReactNode;
  onHeaderClick?: (e: React.SyntheticEvent) => void;
  withoutPadding?: boolean;
  headerBorderBottom?: boolean;
  background?: Backgrounds;
  showContent?: boolean;
}

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
  const enterAnimation = React.useCallback((node, done) => {
    velocity(node, 'slideDown', {
      duration: 200,
      complete: () => done(),
    });
  }, []);

  const leaveAnimation = React.useCallback((node, done) => {
    velocity(node, 'slideUp', {
      duration: 200,
      complete: () => done(),
    });
  }, []);

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
      <S.ChildrenContainer hasHeader={withHeader}>
        <Animate animation={{ enter: enterAnimation, leave: leaveAnimation }}>
          {showContent && <S.PaddingWrapper withoutPadding={withoutPadding}>{children}</S.PaddingWrapper>}
        </Animate>
      </S.ChildrenContainer>
    </S.Container>
  );
};

export default Card;
