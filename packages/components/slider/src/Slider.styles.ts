import styled from 'styled-components';
import Slider from 'antd/lib/slider';

const multipleTracksStyles = (props): string => `
  .ant-slider-track {
    &-1,
    &-11 {
      background-color: ${props.theme.palette['green-600']};
    }

    &-2,
    &-12 {
      background-color: ${props.theme.palette['cyan-600']};
    }

    &-3,
    &-13 {
      background-color: ${props.theme.palette['fern-600']};
    }

    &-4,
    &-14 {
      background-color: ${props.theme.palette['mars-600']};
    }

    &-5,
    &-15 {
      background-color: ${props.theme.palette['orange-600']};
    }

    &-6,
    &-16 {
      background-color: ${props.theme.palette['pink-600']};
    }

    &-7,
    &-17 {
      background-color: ${props.theme.palette['purple-600']};
    }

    &-8,
    &-18 {
      background-color: ${props.theme.palette['red-600']};
    }

    &-9,
    &-19 {
      background-color: ${props.theme.palette['violet-600']};
    }

    &-10,
    &-20 {
      background-color: ${props.theme.palette['yellow-600']};
    }
  }
`;

export const AntdSlider = styled(Slider)<{ useColorPalette?: boolean }>`
  ${(props): string => props.useColorPalette && multipleTracksStyles(props)}
  &.ant-slider:hover {
    ${(props): string => props.useColorPalette && multipleTracksStyles(props)};
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
