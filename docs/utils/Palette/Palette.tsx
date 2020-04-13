import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import palette from '!less-vars-loader!@synerise/ds-core/src/style/colors.less';
import * as S from './Palette.styles';
import SingleColor from './SingleColor/SingleColor';

const mapColors = (): void =>
  Object.entries(palette).reduce((previousValue: any, currentValue: any) => {
    const key = currentValue[0].split('-');
    const value = key[key.length - 1];
    return {
      ...previousValue,
      [key[0]]: previousValue[key[0]]
        ? previousValue[key[0]].concat({
          value,
          color: currentValue[1],
        })
        : [
          {
            value,
            color: currentValue[1],
          },
        ],
    };
  }, {});

export const colorMap: any = Object.entries(mapColors() as any);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Palette = () => {
  const renderPalette = colorMap.map(color => (
      color[1].map(colorDetails => (
        <SingleColor key={`${color[0]}-${colorDetails.value}`} color={`${color[0]}-${colorDetails.value}`} />
      ))
  ));

  return <S.PaletteBox>{renderPalette}</S.PaletteBox>;
};

export default Palette;
