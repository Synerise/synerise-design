import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Props } from '../Slider.types';
import { AntdSlider } from '../Slider.styles';
import { buildDefaultTracksColorMap } from '../Slider';

export const indexMap = {
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

export const AllocationSlider = styled(AntdSlider)<Props>`
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

const getColor = <GeneralProps>(props: GeneralProps | any, defaultColor = 'grey-800'): string => {
  const colors = buildDefaultTracksColorMap();
  if (props.isCustomColor) {
    return props.getColor(props.index);
  }
  return props.theme.palette[(colors || indexMap)[props.index] || defaultColor];
};

export const MarkLetter = styled.div<{ index: number | string }>`
  border-radius: ${(props): string => props.theme.variable('@border-radius-base')};
  width: 25px;
  height: 25px;
  display: inline-block;
  position: relative;
  text-align: center;
  line-height: 25px;
  color: white;
  top: -70px;

  background-color: ${(props): string => getColor(props, 'grey-400')};
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

export const Track = styled.div<{
  width: number;
  index: number;
  isCustomColor: boolean;
  getColor: (index: number) => string;
}>`
  width: ${(props): number => props.width}%;
  height: 6px;
  background-color: ${(props): string => getColor(props)};
  border-radius: ${(props): string => props.theme.palette['@border-radius-base']};
  z-index: ${(props): number => props.index};
`;

export const TrackContainer = styled.div<{ controlGroup?: boolean }>`
  display: flex;
  height: 6px;
  width: 100%;
  overflow: hidden;

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
  color: ${(props): string => props.theme.variable('@gray-color-darker-1')};
  padding-bottom: 32px;
  font-weight: 500;
`;
