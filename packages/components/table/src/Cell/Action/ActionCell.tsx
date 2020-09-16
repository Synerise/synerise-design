import * as React from 'react';
import * as S from './ActionCell.styles';



const ActionCell: React.FC<Props> = ({ children, gapSize = 24, contentAlign = 'right' }: Props) => {
  return (
    <S.ActionCell gapSize={gapSize} contentAlign={contentAlign}>
      {children}
    </S.ActionCell>
  );
};

export default React.memo(ActionCell);
