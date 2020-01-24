import * as React from 'react';

import * as S from './CardGroup.styles';

interface CardGroupProps {
  className?: string;
  children: React.ReactNode;
  columns: number;
}

const CardGroup: React.FC<CardGroupProps> = ({ className, children, columns }) => {
  return (
    <S.Container className={className} items={columns}>
      {children}
    </S.Container>
  );
};

export default CardGroup;
