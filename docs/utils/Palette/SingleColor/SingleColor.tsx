import * as React from 'react';
import Card from '@synerise/ds-card';
import { hexToRgba } from '@synerise/ds-utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import palette from '!less-vars-loader!@synerise/ds-core/src/style/colors.less';
import * as S from './SingleColor.styles';

interface Props {
  color: string;
}

const SingleColor = ({ color }: Props): React.ReactElement => {
  const hex = palette[color];

  return hex ? (
    <Card size='small' style={{width: 'auto', padding: 8}}>
      <S.ColorBox color={hex} />
      <S.ColorName>{color}</S.ColorName>
      <S.ColorHex>{hex}</S.ColorHex>
      <S.ColorHex>{hexToRgba(hex, 255)}</S.ColorHex>
    </Card>
  ) : null;
};

export default SingleColor;
