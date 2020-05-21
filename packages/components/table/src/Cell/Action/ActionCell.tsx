import * as React from 'react';
import * as S from './ActionCell.styles';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const ActionCell: React.FC<Props> = ({ children }: Props) => {
  return <S.ActionCell>{children}</S.ActionCell>;
};

export default ActionCell;
