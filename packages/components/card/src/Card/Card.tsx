import * as React from 'react';
import Icon from '@synerise/ds-icon';
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

          {headerSideChildren && <S.HeaderSideChildren>{headerSideChildren}</S.HeaderSideChildren>}
        </S.Header>
      )}
      <S.ChildrenContainer isContentful={!!children} withoutPadding={withoutPadding} hasHeader={withHeader}>
        {children}
      </S.ChildrenContainer>
    </S.Container>
  );
};

export default Card;
