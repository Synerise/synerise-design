import styled, { Keyframes, keyframes } from 'styled-components';
import { SkeletonSize, LeftSize, SkeletonWidth } from './SkeletonAvatar.types';
import { BackgroundGradient } from '../Skeleton.styles';

const SIZE_RIGHT = 60;
const SIZE_LEFT = -40;
const SKELETON_WIDTH = 80;
export const loadingAnimation = (size?: 'S' | 'M' | 'L' | 'XL'): Keyframes => keyframes`
  0% {
     background: ${BackgroundGradient}; left: -${LeftSize[size as string] || SIZE_LEFT}px; top:0px;
     opacity: 0.1;
  }
  50% {
     background: ${BackgroundGradient}; left: ${LeftSize[size as string] || SIZE_RIGHT}px; top:0px;
     opacity: 0.3;
  }
   100% {
     background: ${BackgroundGradient}; left: -${LeftSize[size as string] || SIZE_LEFT}px; top:0px;
     opacity: 0.1;
  }
`;
const SIZE_DEFAULT = 40;
const SIZE_WRAPPER_DEFAULT = 40;
export const Container = styled.div<{ size?: 'S' | 'M' | 'L' | 'XL'; shape?: 'square' | 'circle' }>`
  width: ${(props): string => SkeletonSize[props.size as string] || SIZE_WRAPPER_DEFAULT}px;
  overflow: hidden;
  border-radius: ${(props): string => (props.shape ==='square' ? '6px' : '48%')};
`;
export const SkeletonBar = styled.div<{ size?: 'S' | 'M' | 'L' | 'XL'; shape?: 'square' | 'circle' }>`
  width: ${(props): string => SkeletonWidth[props.size as string] || SKELETON_WIDTH}%;
  height: ${(props): string => SkeletonSize[props.size as string] || SIZE_DEFAULT}px;
  position: relative;
  animation: ${(props): Keyframes => loadingAnimation(props.size)} 1.2s linear infinite;
  border-radius: 6px;
`;

export const Wrapper = styled.div<{ size?: 'S' | 'M' | 'L' | 'XL'; shape?: 'square' | 'circle' }>`
  display: flex;
  margin: 0px 0px;
  border-radius: ${(props): string => (props.shape ==='square' ? '6px' : '48%')};
  width: 100%;
  height: ${(props): string => SkeletonSize[props.size as string] || SIZE_WRAPPER_DEFAULT}px;
  background-color: ${(props): string => props.theme.palette[`grey-050`]};
`;
