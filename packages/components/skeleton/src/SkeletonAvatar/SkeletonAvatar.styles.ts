import styled, { Keyframes, keyframes } from 'styled-components';
import { SkeletonSize, WrapperSize,LeftSize,Left1Size, SkeletonWidth } from './SkeletonAvatar.types';


const SIZE_LEFT = 10;
const SIZE_LEFT1 = -10;
const SKELETON_WIDTH = 80;
export const loadingAnimation =(size?: 'S' | 'M' | 'L'| 'Xl' ): Keyframes => keyframes`
  0% {
     background: linear-gradient(90deg, rgba(252,252,255,1) 0%, rgba(243,243,245,1) 17%, rgba(156,157,157,1) 100%); left:${Left1Size[size as string] || SIZE_LEFT1}px; top:0px;
     opacity: 0;
  }
  100% {
     background: linear-gradient(90deg, rgba(252,252,255,1) 0%, rgba(243,243,245,1) 17%, rgba(156,157,157,1) 100%); left: ${LeftSize[size as string] || SIZE_LEFT}px; top:0px;
     opacity: 0.2;
  }
`;
const SIZE_DEFAULT = 40;
const SIZE_WRAPPER_DEFAULT = 42;
export const Container = styled.div<{ size?: 'S' | 'M' | 'L' | 'XL' }>`
  width: ${(props): string => WrapperSize[props.size as string] || SIZE_WRAPPER_DEFAULT}px;
`
export const SkeletonBar = styled.div<{ size?: 'S' | 'M' | 'L' | 'XL' }>`
  width: ${(props): string => SkeletonWidth[props.size as string] || SKELETON_WIDTH}%;
  height: ${(props): string => SkeletonSize[props.size as string] || SIZE_DEFAULT}px;
  position: relative;
  animation: ${(props): Keyframes => loadingAnimation(props.size)} 2s linear infinite;
  border-radius: 70%;
`;

export const Wrapper = styled.div<{ size?: 'S' | 'M' | 'L' | 'XL' }>`
  display: flex;
  border: 1px solid ${(props): string => props.theme.palette[`grey-100`]};
  margin: 15px 0px;
  border-radius: 48%;
  width: 100%;
  height: ${(props): string => WrapperSize[props.size as string] || SIZE_WRAPPER_DEFAULT}px;
  background-color: ${(props): string => props.theme.palette[`grey-050`]};
`;