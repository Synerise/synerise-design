import * as React from 'react';

import * as S from './CardGroup.styles';

interface Props {
  children: React.ReactNode;
  columns: number;
}

const CardGroup: React.FC<Props> = ({ children, columns }) => {
  return <S.Container items={columns}>{children}</S.Container>;
};

export default CardGroup;
