import styled, {
  type FlattenSimpleInterpolation,
  css,
  keyframes,
} from 'styled-components';

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
export const Loader = styled.div<{ size?: 'S' | 'M' | 'L'; color: string }>`
  border: 2px solid
    ${(props): string => props.theme.palette[`${props.color}-600`]};
  border-top: 2px solid transparent;
  border-radius: 50%;
  width: ${(props): string =>
    LoaderSize[props.size as string] || SIZE_DEFAULT}px;
  height: ${(props): string =>
    LoaderSize[props.size as string] || SIZE_DEFAULT}px;
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
  justify-content: ${(props): string =>
    props.labelPosition === 'bottom' ? 'center' : ''};
  font-size: ${(props): string => (props.size === 'S' ? '11px' : '13px')};
  text-align: center;
`;
export const HeaderWrapper = styled.div<{ fontSize?: 'small' | 'medium' }>`
  display: flex;
  line-height: 16px;
  color: ${(props): string => props.theme.palette['grey-800']};
  font-size: ${(props): string =>
    FontSize[props.fontSize as string] || FONT_SIZE_DEFAULT}px;
  font-weight: 500;
  padding: ${(props): string =>
    props.fontSize === 'small' ? '8px 0 12px' : '8px 0 18px'};
`;
export const PercentWrapper = styled.div`
  padding-left: 4px;
`;
export const Wrapper = styled.div<{ size?: 'S' | 'M' | 'L' }>`
  margin: ${(props): string => (props.size === 'L' ? '12px' : '8px')};
`;
export const LoaderWrapper = styled.div<{
  labelPosition: 'bottom' | 'right';
  mode?: 'absolute';
}>`
  display: flex;
  flex-direction: ${(props): string =>
    mapElementsPosition[props.labelPosition]};
  align-items: center;
  justify-content: center;
  ${(props): FlattenSimpleInterpolation | false =>
    props.mode === 'absolute' &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
    `};
`;
