import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Slider, { SliderProps } from 'antd/lib/slider';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { ComponentType } from 'react';
import * as React from 'react';

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
export const DescWrapper = styled.div`
  margin-bottom: 45px;
  padding-bottom: 80px;
  color: ${(props): string => props.theme.palette['grey-500']};
  font-weight: 400;
  position: absolute;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AntdSlider = styled((Slider as any) as ComponentType<Omit<SliderProps, 'value'>>)<{
  useColorPalette?: boolean;
  tracksColorMap?: colorMapProps;
  bolderLine?: boolean;
  description?: React.ReactNode | string;
}>`
  .ant-slider-track {
    ${(props): FlattenSimpleInterpolation =>
      props.useColorPalette ? createTracksStyles(props, props.tracksColorMap ? props.tracksColorMap : indexMap) : css``}
      height: ${(props): string => (props.bolderLine ? '6px' : '3px')}
  }
  &.ant-slider:hover {
    ${(props): FlattenSimpleInterpolation =>
      props.useColorPalette
        ? createTracksStyles(props, props.tracksColorMap ? props.tracksColorMap : indexMap)
        : css``};
  }
  .ant-slider-rail {
  height: ${(props): string => (props.bolderLine ? '6px' : '3px')}
  }
 
  .ant-tooltip-inner {
    font-size: 13px;
    padding: 3px 7px;
  }
  
  .ant-slider-handle:hover, .ant-slider-handle:focus {
      .ant-tooltip-content {
        background-color: ${(props): string => props.theme.palette['grey-900']};
      }
      ${DescWrapper} {
        color: ${(props): string => props.theme.palette['grey-600']};
      }
      .ant-tooltip-inner {
      color: ${(props): string => props.theme.palette['grey-050']};
      }
  }
  
  
  
  &&& :hover{
  .ant-tooltip-content {
        background-color: ${(props): string => props.theme.palette['grey-900']};
      }
      .ant-tooltip-inner {
      color: ${(props): string => props.theme.palette['grey-050']};
      }
  }
  
  .ant-slider-dot:last-of-type, .ant-slider-dot:first-of-type {
  visibility: hidden;
  }
  .ant-slider-mark-text:last-of-type {
  padding-right: 30px;
  }
  .ant-slider-handle-1{
  visibility: hidden;
  pointer-events: none;
  }
  .ant-slider-handle-4{
  display: none;
  pointer-events: none;
  }
`;

export const LabelWrapper = styled.div`
  margin-left: -2px;
  padding-bottom: 0px;
`;
export const DescriptionWrapper = styled.div`
  display: flex;
  direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  bottom: 0;
  right: 0;
`;
