import React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdDivider from 'antd/lib/divider';
import * as S from './Divider.styles';
import { DividerProps } from './Divider.types';

const Divider = ({ marginBottom, marginTop, style, labelAbove, labelBelow, ...antdDividerProps }: DividerProps) => {
  const divider = (
    <AntdDivider
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...antdDividerProps}
      style={{
        marginBottom,
        marginTop,
        ...style,
      }}
    />
  );
  const contentAbove = labelAbove && <S.Label level={7}>{labelAbove}</S.Label>;
  const contentBelow = labelBelow && <S.Label level={7}>{labelBelow}</S.Label>;
  return (
    <>
      {contentAbove}
      {divider}
      {contentBelow}
    </>
  );
};

export default Divider;
