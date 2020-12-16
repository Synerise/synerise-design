import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Slider, { SliderProps } from 'antd/lib/slider';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { ComponentType } from 'react';
import * as React from 'react';
import { ColorMapProps } from './Slider.types';

const INDEX_MAP = {
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

export const Description = styled.div`
  margin-bottom: 45px;
  padding-bottom: 80px;
  color: ${(props): string => props.theme.palette['grey-500']};
  font-weight: 400;
  position: absolute;
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

export const applyTooltipStyles = (props: ThemeProps): FlattenSimpleInterpolation => css`
  .ant-tooltip-inner {
    font-size: 13px;
    padding: 3px 7px;
  }
  .ant-slider-handle:hover,
  .ant-slider-handle:focus {
    .ant-tooltip-content {
      background-color: ${props.theme.palette['grey-900']};
    }
    ${Description} {
      color: ${props.theme.palette['grey-600']};
    }
    .ant-tooltip-inner {
      color: ${props.theme.palette['grey-050']};
    }
  }
  &&& :hover {
    .ant-tooltip-content {
      border-radius: 3px;
      background-color: ${props.theme.palette['grey-900']};
    }
    .ant-tooltip-inner {
      color: ${props.theme.palette['grey-050']};
    }
  }
`;
const createTracksStyles = (props: ThemeProps, colorsMap: ColorMapProps): FlattenSimpleInterpolation => {
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
  tracksColorMap?: ColorMapProps;
  thick?: boolean;
  description?: React.ReactNode | string;
}>`
  .ant-slider-track {
    ${(props): FlattenSimpleInterpolation =>
      props.useColorPalette
        ? createTracksStyles(props, props.tracksColorMap ? props.tracksColorMap : INDEX_MAP)
        : css``}
      height: ${(props): string => (props.thick ? '6px' : '3px')}
  }
  &.ant-slider:hover {
    ${(props): FlattenSimpleInterpolation =>
      props.useColorPalette
        ? createTracksStyles(props, props.tracksColorMap ? props.tracksColorMap : INDEX_MAP)
        : css``};
  }
  .ant-slider-rail {
  height: ${(props): string => (props.thick ? '6px' : '3px')}
  }
 ${(props): FlattenSimpleInterpolation => applyTooltipStyles(props)}
  .ant-slider-handle {
    z-index: 99;
  }
`;
