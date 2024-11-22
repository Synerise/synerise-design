import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Slider, { SliderSingleProps, SliderRangeProps } from 'antd/lib/slider';
import { ThemeProps } from '@synerise/ds-core';
import { ComponentType } from 'react';
import { ColorMapProps, SliderProps as DsSliderProps } from './Slider.types';

type SliderProps = SliderSingleProps | SliderRangeProps;

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

export const Description = styled.div<{ range?: boolean }>`
  margin-bottom: 45px;
  padding-bottom: 80px;
  color: ${(props): string => props.theme.palette['grey-500']};
  font-weight: 400;
  position: absolute;
  opacity: ${(props): string => (props.range ? '0' : '1')};
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
  user-select: none;
  bottom: 0;
  right: 0;
`;

export const applyTooltipStyles = (props: ThemeProps & DsSliderProps & SliderStyles): FlattenSimpleInterpolation => css`
  .ant-tooltip-inner {
    font-size: 13px;
    padding: 3px 7px;
    user-select: none;
    white-space: nowrap;
  }
  ${
    props.disabled &&
    `.ant-tooltip-inner {
        color: ${props.theme.palette['grey-400']};
      }
    `
  }
  ${
    props.disabled &&
    `.ant-slider-dot {
        background-color: ${props.theme.palette.white};
      }
    `
  }

  &&&.ant-slider-disabled {
    .ant-slider-dot-active {
      background-color: ${props.theme.palette.white};
    }
    .ant-slider-rail {
      background-color: ${props.theme.palette['grey-200']};
    }
  }
  .ant-slider-handle:hover,
  .ant-slider-handle:focus {
    ${
      !props.disabled &&
      `
    .ant-tooltip-content {
      background-color: ${props.theme.palette['grey-900']};
      border-radius: 3px;
    }
    ${Description} {
      color: ${!props.disabled && props.theme.palette['grey-600']};
    }
    .ant-tooltip-inner {
      color: ${props.theme.palette['grey-050']};
    }
    `
    }
  }
  .ant-slider-handle:focus {
  ${
    !props.disabled &&
    `
  ${Description} {
     ${props.range && `opacity: 1`};
    }
    }
    `
  }
  .ant-slider-handle:hover:not(:focus) {
    background-color: ${!props.disabled && props.theme.palette['grey-500']};
  }
  .ant-slider-handle:not(:focus) {
    .ant-tooltip-content:hover {
      background-color: transparent !important;
      border-radius: 3px;
    }
    .ant-tooltip-inner:hover {
      color: ${!props.disabled && props.theme.palette['grey-600']} !important;
    }
  }

  .ant-slider-dot[style*='left: 100%;'],
  .ant-slider-dot:first-of-type {
    visibility: ${props.hideMinAndMaxMarks ? 'hidden' : 'visible'};
  }
  .ant-slider-mark-text:last-of-type {
    padding-right: 30px;
  }
    .ant-slider-mark-text:last-of-type {
      ${props.reachedEnd && `opacity: 0`}
    }
    .ant-slider-mark-text:first-of-type {
      ${props.reachedStart && `opacity: 0`}
    }
  .ant-slider-handle-dragging {
    border-color: ${props.theme.palette['grey-050']} !important;
    box-shadow: 0 0 0 3px rgba(35, 138, 254, 0.25) !important;
  }
`;
export const createTracksStyles = (props: ThemeProps, colorsMap: ColorMapProps): FlattenSimpleInterpolation => {
  const styles = Object.values(colorsMap).map(
    (color: string, index: number) => `
      .ant-slider-segment-${index},
      .ant-slider-segment-letter-${index},
      .ant-slider-track-${index + 1},
      .ant-slider-track-${index + 11} {
        background-color: ${props.theme.palette[color]};
      }
      .ant-slider-dot-active${index + 1},
      .ant-slider-dot-active${index + 11} {
        background-color: ${props.theme.palette[color]};
      }
  `
  );
  const style = styles.join('');
  return css`
    .ant-slider-track {
      background-color: ${props.theme.palette[colorsMap[0]]};
    }
    .ant-slider-dot-active {
      background-color: ${props.theme.palette[colorsMap[0]]};
    }
    &.ant-slider-inverted {
      .ant-slider-dot {
        background-color: ${props.theme.palette[colorsMap[0]]};
        &.ant-slider-dot-active {
          background-color: ${props.theme.palette['grey-300']};
        }
      }
      .ant-slider-rail {
        background-color: ${props.theme.palette[colorsMap[0]]};
      }
      .ant-slider-track {
        background-color: ${props.theme.palette['grey-200']};
      }
      &&&.ant-slider-disabled {
        .ant-slider-rail {
          background-color: ${props.theme.palette['grey-400']};
        }
        .ant-slider-dot {
          background-color: ${props.theme.palette['grey-050']} !important;
          border-color: ${props.theme.palette['grey-400']} !important;
        }
        .ant-slider-track {
          background-color: ${props.theme.palette['grey-200']} !important;
        }
        .ant-slider-dot-active {
          border-color: ${props.theme.palette['grey-200']} !important;
        }
      }
    }
    ${style}
  `;
};
type SliderStyles = {
  reachedEnd?: boolean;
  reachedStart?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AntdSlider = styled(Slider as any as ComponentType<Omit<SliderProps, 'value'>>)<
  DsSliderProps & SliderStyles
>`
  ${(props): FlattenSimpleInterpolation =>
    props.useColorPalette ? createTracksStyles(props, props.tracksColorMap ? props.tracksColorMap : INDEX_MAP) : css``}
  .ant-slider-track {
    height: ${(props): string => (props.thickness ? `${props.thickness}px` : `3px`)};
  }
  &.ant-slider:hover {
    ${(props): FlattenSimpleInterpolation =>
      props.useColorPalette
        ? createTracksStyles(props, props.tracksColorMap ? props.tracksColorMap : INDEX_MAP)
        : css``};
  }
  .ant-slider-rail {
    height: ${(props): string => (props.thickness ? `${props.thickness}px` : `3px`)};
  }
  ${(props): FlattenSimpleInterpolation => applyTooltipStyles(props)}
  .ant-slider-handle {
    z-index: 99;
    margin-top: ${(props): string => (props.thickness && props.thickness > 5 ? '-7px' : '-8px')};
  }
  .ant-slider-dot {
    margin-top: ${(props): string => (props.thickness && props.thickness > 5 ? '0px' : '-1px')};
  }
  &&&.ant-slider {
    margin-top: ${(props): string => (props.description ? '38px' : '24px')};
  }
`;
