import styled, { css, FlattenSimpleInterpolation, StyledProps } from 'styled-components';
import { SliderProps } from '../Slider.types';
import { AntdSlider, createTracksStyles } from '../Slider.styles';
import { buildDefaultTracksColorMap } from '../Slider';
import type { DefinedCssRuleParameters, TrackProps } from './Allocation.types';

const defineCssSelectorWithRule = ({ indexes, classConstPart, cssRule }: DefinedCssRuleParameters) => {
  const variantsSize = indexes.length;
  if (variantsSize === 0) {
    return '';
  }
  const definedClassSpecificity = indexes.reduce(
    (result, item, index) => `${result}${classConstPart}${item}${index + 1 === variantsSize ? '' : ', '}`,
    ''
  );

  return `${definedClassSpecificity} { ${cssRule} }`;
};

export const INDEX_MAP = {
  '0': 'cyan-600',
  '1': 'yellow-600',
  '2': 'mars-600',
  '3': 'purple-600',
  '4': 'green-600',
  '5': 'orange-600',
  '6': 'pink-600',
  '7': 'red-600',
  '8': 'violet-600',
  '9': 'fern-600',
};

export const AllocationSliderWrapper = styled.div<{
  blockedHandlersKeys: number[];
  tracksColorMap: SliderProps['tracksColorMap'];
}>`
  position: relative;

  ${props => createTracksStyles(props, props.tracksColorMap ? props.tracksColorMap : INDEX_MAP)}

  && ${({ blockedHandlersKeys, theme }) =>
    defineCssSelectorWithRule({
      indexes: blockedHandlersKeys,
      classConstPart: '.ant-slider-handle-',
      cssRule: `
      background-color: ${theme.palette['grey-300']};
      box-shadow:none !important;
      pointer-events: none;
      z-index:97;
      border-color: ${theme.palette.white} !important;
    `,
    })}
`;

export const AllocationSlider = styled(AntdSlider)<SliderProps>`
  ${props => createTracksStyles(props, props.tracksColorMap ? props.tracksColorMap : INDEX_MAP)}

  &.ant-slider:hover {
    ${props => createTracksStyles(props, props.tracksColorMap ? props.tracksColorMap : INDEX_MAP)};
  }

  .ant-slider-handle-value,
  .ant-slider-rail,
  .ant-slider-track,
  .ant-slider-dot {
    display: none;
  }
  && .ant-slider-mark-text:last-of-type {
    padding-right: 0;
  }
  && .ant-slider-mark-text {
    user-select: none;
  }
`;

export const Mark = styled.div`
  text-align: center;
`;

const getColor = (props: StyledProps<TrackProps>, defaultColor = 'grey-800') => {
  const colors = buildDefaultTracksColorMap();
  if (props.isCustomColor) {
    return (props.getColor && props.getColor(props.index)) || defaultColor;
  }
  return props.theme.palette[(colors || INDEX_MAP)[props.index] || defaultColor];
};

export const MarkLetter = styled.div<{ index: number | string }>`
  border-radius: ${props => props.theme.variable('@border-radius-base')};
  width: 25px;
  height: 25px;
  display: inline-block;
  position: relative;
  text-align: center;
  line-height: 25px;
  color: white;
  top: -70px;

  background-color: ${props => getColor(props as StyledProps<TrackProps>, 'grey-400')};
`;

export const MarkValue = styled.div`
  display: block;
  margin-top: -10px;
`;
export const MarkTooltipWrapper = styled.div`
  display: block;
  width: 100%;
  justify-content: center;
  text-align: center;
  min-width: 14px;
`;

export const Track = styled.div<TrackProps>`
  width: ${props => props.width}%;
  height: 6px;
  background-color: ${props => getColor(props)};
  border-radius: ${props => props.theme.palette['@border-radius-base']};
  z-index: ${props => props.index};
`;

export const TrackContainer = styled.div<{ controlGroup?: boolean }>`
  display: flex;
  height: 6px;
  width: 100%;
  overflow: hidden;
  position: absolute;
  bottom: 3px;

  & > div:first-child,
  & > div:last-child {
    border-radius: 20px;
  }
  ${(props): false | undefined | FlattenSimpleInterpolation =>
    props.controlGroup &&
    css`
      ${Track}:last-child {
        background-color: ${props.theme.variable('@gray-color-lighter-4')};
      }
    `};
`;

export const Title = styled.div`
  color: ${props => props.theme.variable('@gray-color-darker-1')};
  padding-bottom: 32px;
  font-weight: 500;
`;
