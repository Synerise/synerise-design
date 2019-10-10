import * as React from 'react';

import * as S from './Card.styles';
import { Props } from './Card.types';

const Card: React.FC<Props> = ({
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
  // iconSize,
  headerSideChildren,
}: Props) => {
  const fatTitle = !description || (description && compactHeader);

  return (
    <S.Container raised={raised} disabled={disabled} style={style} className={className} lively={lively}>
      {withHeader && (
        <S.Header isContentful={!!children}>
          {icon && <S.IconContainer>{/* <Icon /> */}</S.IconContainer>}

          <S.HeaderContent compact={compactHeader}>
            {title && (
              <S.Title level={4} fat={fatTitle}>
                {title}
              </S.Title>
            )}
            {description && <S.Description>{description}</S.Description>}
          </S.HeaderContent>

          {headerSideChildren && <S.HeaderSideChildren>{headerSideChildren}</S.HeaderSideChildren>}
        </S.Header>
      )}

      {children}
    </S.Container>
  );
};

Card.defaultProps = {
  iconSize: 36,
};

export default Card;
