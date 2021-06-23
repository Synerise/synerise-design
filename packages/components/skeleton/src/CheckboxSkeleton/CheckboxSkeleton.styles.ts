import styled, { keyframes } from 'styled-components';
import { SkeletonSize, WrapperSize } from './CheckboxSkeleton.types';

export const loadingAnimation = keyframes`

  0% {
     background: linear-gradient(90deg, rgba(252,252,255,1) 0%, rgba(243,243,245,1) 17%, rgba(156,157,157,1) 100%); left:-80px; top:0px;
     opacity: 0.1;
  }
  50% {
     background: linear-gradient(90deg, rgba(252,252,255,1) 0%, rgba(243,243,245,1) 17%, rgba(156,157,157,1) 100%); left:140px; top:0px;
     opacity: 0.3;
  }
  100% {
     background: linear-gradient(90deg, rgba(252,252,255,1) 0%, rgba(243,243,245,1) 17%, rgba(156,157,157,1) 100%); left:-80px; top:0px;
     opacity: 0.1;
  }
`;
export const Container = styled.div`
  width: 100%;
  display: flex;
`;

const SIZE_DEFAULT = 16;
const SIZE_WRAPPER_DEFAULT = 16;
export const SkeletonBar = styled.div<{ size?: 'S' | 'M' | 'L' }>`
  width: 70%;
  height: ${(props): string => SkeletonSize[props.size as string] || SIZE_DEFAULT}px;
  position: relative;
  animation: ${loadingAnimation} 1.2s ease-in-out infinite;
`;

export const Wrapper = styled.div<{ size?: 'S' | 'M' | 'L' }>`
  display: flex;
  border-right: transparent;
  border-left: transparent;
  margin-bottom: 5px;
  border-radius: 2px;
  width: 150px;
  height: ${(props): string => WrapperSize[props.size as string] || SIZE_WRAPPER_DEFAULT}px;
  background-color: ${(props): string => props.theme.palette[`grey-050`]};
`;
export const SkeletonWrapper = styled.div`
  margin-top: 7px;
  border-radius: 2px;
  overflow: hidden;
`;
