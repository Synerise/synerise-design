import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Slider, { SliderProps } from 'antd/lib/slider';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { ComponentType } from 'react';

export declare type colorMapProps = {
  [key: string]: string;
};

const indexMap = {
  '0': 'green-600',
  '1': 'cyan-600',
  '2': 'yellow-600',
  '3': 'orange-600',
  '4': 'mars-600',
  '5': 'pink-600',
  '6': 'purple-600',
  '7': 'red-600',
  '8': 'violet-600',
  '9': 'fern-600',
};

const createTracksStyles = (props: ThemeProps, colorsMap: colorMapProps): FlattenSimpleInterpolation => {
  const styles = Object.values(colorsMap).map(
    (color: string, index: number) => `
      &-${index + 1},
      &-${index + 11} {
        background-color: ${props.theme.palette[color]};
      }
  `
  );
  const style = styles.join('');
  return css`
    ${style}
  `;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AntdSlider = styled((Slider as any) as ComponentType<Omit<SliderProps, 'value'>>)<{
  useColorPalette?: boolean;
  tracksColorMap?: colorMapProps;
}>`
  .ant-slider-track {
    ${(props): FlattenSimpleInterpolation =>
      props.useColorPalette ? createTracksStyles(props, props.tracksColorMap ? props.tracksColorMap : indexMap) : css``}
  }
  &.ant-slider:hover {
    ${(props): FlattenSimpleInterpolation =>
      props.useColorPalette
        ? createTracksStyles(props, props.tracksColorMap ? props.tracksColorMap : indexMap)
        : css``};
  }
  .ant-tooltip-inner {
    font-size: 13px;
    padding: 3px 7px;
  }
`;

export const LabelWrapper = styled.div`
  margin-left: -2px;
  padding-bottom: 22px;
`;
