import styled, { Keyframes, keyframes } from 'styled-components';
import { SkeletonSize, WrapperSize, LeftSize, Left1Size, SkeletonWidth } from './SkeletonAvatar.types';

const SIZE_LEFT = 60;
const SIZE_LEFT1 = -40;
const SKELETON_WIDTH = 80;
export const loadingAnimation = (size?: 'S' | 'M' | 'L' | 'XL'): Keyframes => keyframes`
  0% {
     background: linear-gradient(90deg, rgba(252,252,255,1) 0%, rgba(243,243,245,1) 17%, rgba(156,157,157,1) 100%); left:${Left1Size[
       size as string
     ] || SIZE_LEFT1}px; top:0px;
     opacity: 0.1;
  }
  50% {
     background: linear-gradient(90deg, rgba(252,252,255,1) 0%, rgba(243,243,245,1) 17%, rgba(156,157,157,1) 100%); left: ${LeftSize[
       size as string
     ] || SIZE_LEFT}px; top:0px;
     opacity: 0.3;
  }
   100% {
     background: linear-gradient(90deg, rgba(252,252,255,1) 0%, rgba(243,243,245,1) 17%, rgba(156,157,157,1) 100%); left:${Left1Size[
       size as string
     ] || SIZE_LEFT1}px; top:0px;
     opacity: 0.1;
  }
`;
const SIZE_DEFAULT = 40;
const SIZE_WRAPPER_DEFAULT = 40;
export const Container = styled.div<{ size?: 'S' | 'M' | 'L' | 'XL'; shape?: boolean }>`
  width: ${(props): string => WrapperSize[props.size as string] || SIZE_WRAPPER_DEFAULT}px;
  overflow: hidden;
  border-radius: ${(props): string => (props.shape ? '6px' : '48%')};
`;
export const SkeletonBar = styled.div<{ size?: 'S' | 'M' | 'L' | 'XL'; shape?: boolean }>`
  width: ${(props): string => SkeletonWidth[props.size as string] || SKELETON_WIDTH}%;
  height: ${(props): string => SkeletonSize[props.size as string] || SIZE_DEFAULT}px;
  position: relative;
  animation: ${(props): Keyframes => loadingAnimation(props.size)} 1.2s linear infinite;
  border-radius: 6px;
`;

export const Wrapper = styled.div<{ size?: 'S' | 'M' | 'L' | 'XL'; shape?: boolean }>`
  display: flex;
  margin: 0px 0px;
  border-radius: ${(props): string => (props.shape ? '6px' : '48%')};
  width: 100%;
  height: ${(props): string => WrapperSize[props.size as string] || SIZE_WRAPPER_DEFAULT}px;
  background-color: ${(props): string => props.theme.palette[`grey-050`]};
`;
