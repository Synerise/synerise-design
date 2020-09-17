import * as React from 'react';
import * as S from './CardGroup.styles';
import { CardGroupProps } from './CardGroup.types';

const CardGroup: React.FC<CardGroupProps> = ({ className, children, columns }) => {
  return (
    <S.Container className={className} items={columns}>
      {children}
    </S.Container>
  );
};

export default CardGroup;
