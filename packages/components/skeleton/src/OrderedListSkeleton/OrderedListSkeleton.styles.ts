import styled, {  keyframes } from 'styled-components';
import { SkeletonSize, WrapperSize } from '../CheckboxSkeleton/CheckboxSkeleton.types';

export const loadingAnimation = keyframes`

  0% {
     background: linear-gradient(90deg, rgba(252,252,255,1) 0%, rgba(243,243,245,1) 17%, rgba(156,157,157,1) 100%); left:-40px; top:0px;
     opacity: 0.1;
  }
  100% {
     background: linear-gradient(90deg, rgba(252,252,255,1) 0%, rgba(243,243,245,1) 17%, rgba(156,157,157,1) 100%); left:68px; top:0px;
     opacity: 0.3;
  }
`;
export const Container = styled.div`
  width: 100%;
`;

const SIZE_DEFAULT = 20;
const SIZE_WRAPPER_DEFAULT = 20
export const SkeletonBar = styled.div<{ size?: 'S' | 'M' | 'L' }>`
  width: 55%;
  height: ${(props): string => SkeletonSize[props.size as string] || SIZE_DEFAULT}px;
  position: relative;
  animation: ${loadingAnimation} 1s linear infinite;
`;

export const Wrapper = styled.div<{ size?: 'S' | 'M' | 'L' }>`
  display: flex;
  border-right: transparent;
  border-left: transparent;
  margin: 0px 0px 15px 0px;
  border-radius: 2px;
  width: 150px;
  height: ${(props): string => WrapperSize[props.size as string] || SIZE_WRAPPER_DEFAULT}px;
  background-color: ${(props): string => props.theme.palette[`grey-050`]};
`;