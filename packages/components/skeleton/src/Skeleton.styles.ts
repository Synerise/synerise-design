import styled, { type Keyframes, css, keyframes } from 'styled-components';

import { SkeletonSize, StartOffsetSize, WidthSize } from './Skeleton.types';

export const BackgroundGradient = css`
 linear-gradient(90deg, rgba(252,252,255,1) 0%, rgba(243,243,245,1) 17%, rgba(156,157,157,1) 100%);
`;
const OFFSET_LEFT = 140;
const START_OFFSET_LEFT = -120;
export const loadingAnimation = (width?: 'M' | 'L'): Keyframes => keyframes`

  0% {
     left:${StartOffsetSize[width as string] || START_OFFSET_LEFT}px; 
     opacity: 0.1;
  }
  50% {
     left:${WidthSize[width as string] || OFFSET_LEFT}px;
     opacity: 0.4;
  }
  100% {
     left:${StartOffsetSize[width as string] || START_OFFSET_LEFT}px;
     opacity: 0.1;
  }
`;

const SIZE_WRAPPER_DEFAULT = 16;
export const SkeletonBar = styled.div<{
  size?: 'S' | 'M' | 'L';
  width?: 'M' | 'L';
}>`
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  background: ${BackgroundGradient};
  animation: ${(props): Keyframes => loadingAnimation(props.width)} 1.2s
    ease-in-out infinite;
  border-radius: ${(props): string => (props.width === 'M' ? '4px' : '0px')};
`;

export const Wrapper = styled.div<{
  size?: 'S' | 'M' | 'L';
  width?: 'M' | 'L';
  height?: number;
}>`
  border-right: transparent;
  border-left: transparent;
  border-radius: ${(props): string => (props.width === 'M' ? '4px' : '2px')};
  width: 100%;
  height: ${(props): number => {
    if (props.height !== undefined) {
      return props.height;
    }
    return SkeletonSize[props.size as string] || SIZE_WRAPPER_DEFAULT;
  }}px;
  background-color: ${(props): string => props.theme.palette[`grey-050`]};
  overflow: hidden;
`;

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 12px;
  gap: 15px;
  display: flex;
  flex-direction: column;
`;
