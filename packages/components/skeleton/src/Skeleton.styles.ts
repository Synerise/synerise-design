import styled, { css, Keyframes, keyframes } from 'styled-components';
import { SkeletonSize, WidthSize, StartOffsetSize } from './Skeleton.types';

export const BackgroundGradient = css`
 linear-gradient(90deg, rgba(252,252,255,1) 0%, rgba(243,243,245,1) 17%, rgba(156,157,157,1) 100%);
`;
const OFFSET_LEFT = 140;
const START_OFFSET_LEFT = -120;
export const loadingAnimation = (width?: 'M' | 'L'): Keyframes => keyframes`

  0% {
     background: ${BackgroundGradient}; left:${StartOffsetSize[width as string] || START_OFFSET_LEFT}px; top:0px;
     opacity: 0.1;
  }
  50% {
     background: ${BackgroundGradient}; left:${WidthSize[width as string] || OFFSET_LEFT}px; top:0px;
     opacity: 0.4;
  }
  100% {
     background: ${BackgroundGradient}; left:${StartOffsetSize[width as string] || START_OFFSET_LEFT}px; top:0px;
     opacity: 0.1;
  }
`;
export const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

const SIZE_DEFAULT = 16;
const SIZE_WRAPPER_DEFAULT = 16;
export const SkeletonBar = styled.div<{ size?: 'S' | 'M' | 'L'; width?: 'M' | 'L' }>`
  width: 100%;
  height: ${(props): string => SkeletonSize[props.size as string] || SIZE_DEFAULT}px;
  position: relative;
  animation: ${(props): Keyframes => loadingAnimation(props.width)} 1.2s ease-in-out infinite;
  border-radius: ${(props): string => (props.width === 'M' ? '4px' : '0px')};
`;

export const Wrapper = styled.div<{ size?: 'S' | 'M' | 'L'; width?: 'M' | 'L' }>`
  display: flex;
  border-right: transparent;
  border-left: transparent;
  margin: 15px 0px;
  border-radius: ${(props): string => (props.width === 'M' ? '4px' : '2px')};
  width: 100%;
  height: ${(props): string => SkeletonSize[props.size as string] || SIZE_WRAPPER_DEFAULT}px;
  background-color: ${(props): string => props.theme.palette[`grey-050`]};
`;
