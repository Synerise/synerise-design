import React from 'react';

import * as S from './Divider.styles';
import { type DividerProps } from './Divider.types';
import { Line } from './components/Line';

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
