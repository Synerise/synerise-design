import styled, { css, keyframes } from 'styled-components';

import { FontSize, LoaderSize } from './Loader.types';

export const spinnerAnimation = keyframes`

  0% {
     transform: rotate(0deg);
  }
  100% {
     transform: rotate(720deg);
  }
`;
const SIZE_DEFAULT = 20;
const FONT_SIZE_DEFAULT = 14;
export const Loader = styled.div<{
  size?: keyof typeof LoaderSize;
  color: string;
}>`
  border: 2px solid ${(props) => props.theme.palette[`${props.color}-600`]};
  border-top: 2px solid transparent;
  border-radius: 50%;
  width: ${(props) => (props.size ? LoaderSize[props.size] : SIZE_DEFAULT)}px;
  height: ${(props) => (props.size ? LoaderSize[props.size] : SIZE_DEFAULT)}px;
  animation: ${spinnerAnimation} 2s linear infinite;
`;
const mapElementsPosition = {
  right: 'row',
  bottom: 'column',
};

export const TextWrapper = styled.div<{
  labelPosition: 'bottom' | 'right';
  size?: 'S' | 'M' | 'L';
}>`
  display: flex;
  line-height: 16px;
  max-width: 440px;
  word-wrap: break-word;
  justify-content: ${(props) =>
    props.labelPosition === 'bottom' ? 'center' : ''};
  font-size: ${(props) => (props.size === 'S' ? '11px' : '13px')};
  text-align: center;
`;
export const HeaderWrapper = styled.div<{ fontSize?: 'small' | 'medium' }>`
  display: flex;
  line-height: 16px;
  color: ${(props) => props.theme.palette['grey-800']};
  font-size: ${(props) =>
    props.fontSize ? FontSize[props.fontSize] : FONT_SIZE_DEFAULT}px;
  font-weight: 500;
  padding: ${(props) =>
    props.fontSize === 'small' ? '8px 0 12px' : '8px 0 18px'};
`;
export const PercentWrapper = styled.div`
  padding-left: 4px;
`;
export const Wrapper = styled.div<{ size?: 'S' | 'M' | 'L' }>`
  margin: ${(props) => (props.size === 'L' ? '12px' : '8px')};
`;
export const LoaderWrapper = styled.div<{
  labelPosition: 'bottom' | 'right';
  mode?: 'absolute';
}>`
  display: flex;
  flex-direction: ${(props) => mapElementsPosition[props.labelPosition]};
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.mode === 'absolute' &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
    `};
`;
