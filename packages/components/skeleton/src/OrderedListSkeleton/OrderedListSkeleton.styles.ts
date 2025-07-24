import styled, { keyframes } from 'styled-components';

import { SkeletonSize } from '../CheckboxSkeleton/CheckboxSkeleton.types';
import { BackgroundGradient } from '../Skeleton.styles';

export const loadingAnimation = keyframes`

  0% {
     background: ${BackgroundGradient}; left:-120px; top:0px;
     opacity: 0.1;
  }
  50% {
     background: ${BackgroundGradient}; left:140px; top:0px;
     opacity: 0.3;
  }
  100% {
     background: ${BackgroundGradient}; left:-120px; top:0px;
     opacity: 0.1;
  }
`;
export const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

const SIZE_DEFAULT = 16;
const SIZE_WRAPPER_DEFAULT = 16;
export const SkeletonBar = styled.div<{ size?: 'S' | 'M' | 'L' }>`
  width: 100%;
  height: ${(props) =>
    props.size ? SkeletonSize[props.size] : SIZE_DEFAULT}px;
  position: relative;
  animation: ${loadingAnimation} 1.2s ease-in-out infinite;
`;

export const Wrapper = styled.div<{ size?: 'S' | 'M' | 'L' }>`
  display: flex;
  margin: 0px 0px 15px 0px;
  border-radius: 2px;
  width: 150px;
  height: ${(props) =>
    props.size ? SkeletonSize[props.size] : SIZE_WRAPPER_DEFAULT}px;
  background-color: ${(props) => props.theme.palette[`grey-050`]};
`;
