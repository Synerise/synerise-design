import styled, { type Keyframes, css, keyframes } from 'styled-components';

import { SkeletonSize, StartOffsetSize, WidthSize } from './Skeleton.types';

/* ⚑ Shift: shimmer end-stop #9c9d9d → --ds-skeleton-gradient end (grey-300, lighter); start/mid stops ~exact */
export const BackgroundGradient = css`
 var(--ds-skeleton-gradient);
`;
const OFFSET_LEFT = 140;
const START_OFFSET_LEFT = -120;
export const loadingAnimation = (width?: 'M' | 'L'): Keyframes => keyframes`

  0% {
     left:${width ? StartOffsetSize[width] : START_OFFSET_LEFT}px; 
     opacity: 0.1;
  }
  50% {
     left:${width ? WidthSize[width] : OFFSET_LEFT}px;
     opacity: 0.4;
  }
  100% {
     left:${width ? StartOffsetSize[width] : START_OFFSET_LEFT}px;
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
  animation: ${(props) => loadingAnimation(props.width)} 1.2s ease-in-out
    infinite;
  border-radius: ${(props) => (props.width === 'M' ? '4px' : '0px')};
`;

export const Wrapper = styled.div<{
  size?: 'S' | 'M' | 'L';
  width?: 'M' | 'L';
  height?: number;
}>`
  border-right: transparent;
  border-left: transparent;
  border-radius: ${(props) => (props.width === 'M' ? '4px' : '2px')};
  width: 100%;
  height: ${(props) => {
    if (props.height !== undefined) {
      return props.height;
    }
    return props.size ? SkeletonSize[props.size] : SIZE_WRAPPER_DEFAULT;
  }}px;
  background-color: var(--ds-skeleton-bg);
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
