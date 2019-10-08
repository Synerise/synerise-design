import * as React from 'react';
import * as S from './BottomAction.styles';

interface Props {
  onClickAction: () => void;
}

const BottomAction: React.FC<Props> = ({ onClickAction, children }) => (
  <S.BottomAction onClick={onClickAction}>{children}</S.BottomAction>
);

export default BottomAction;
