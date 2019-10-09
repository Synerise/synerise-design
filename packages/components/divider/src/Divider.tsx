import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { DividerProps } from 'antd/lib/divider';
import * as S from './Divider.styles';

interface Props extends DividerProps {
  marginTop?: number;
  marginBottom?: number;
}

const Divider: React.FC<Props> = ({ marginBottom, marginTop, ...antdDividerProps }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <S.Divider {...antdDividerProps} marginBottom={marginBottom} marginTop={marginTop} />
  );
};

export default Divider;
