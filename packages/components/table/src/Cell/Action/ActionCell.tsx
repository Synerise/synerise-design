import * as React from 'react';
import * as S from './ActionCell.styles';

interface Props {
  children: JSX.Element;
}

const ActionCell: React.FC<Props> = ({ children }: Props) => {
  return <S.ActionCell>{children}</S.ActionCell>;
};

export default ActionCell;
