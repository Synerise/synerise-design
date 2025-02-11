import React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { Line } from './components/Line';
import { DividerProps } from './Divider.types';
import * as S from './Divider.styles';

const Divider = (props: DividerProps) => {
  const { labelAbove, labelBelow, hiddenLine = false } = props;

  const contentAbove = labelAbove && <S.Label level={7}>{labelAbove}</S.Label>;
  const contentBelow = labelBelow && <S.Label level={7}>{labelBelow}</S.Label>;
  const line = !hiddenLine && <Line {...props} />;
  return (
    <>
      {contentAbove}
      {line}
      {contentBelow}
    </>
  );
};

export default Divider;
