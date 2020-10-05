import styled, { keyframes } from 'styled-components';
import { LoaderSize } from './Loader.types';

export const spinnerAnimation = keyframes`

  0% {
     transform: rotate(0deg);
  }
  100% {
     transform: rotate(360deg);
  }
`;
const SIZE_DEFAULT = 20;
export const Loader = styled.div<{size?: 'S' | 'M' | 'L'}>`

  border: 2px solid ${(props): string =>  props.theme.palette['blue-600']}; 
  border-top: 2px solid transparent; 
  border-radius: 50%;
  width: ${(props): string => LoaderSize[props.size as string]|| SIZE_DEFAULT}px;
  height: ${(props): string => LoaderSize[props.size as string] || SIZE_DEFAULT}px;
  animation: ${spinnerAnimation} 2s linear infinite;
`;
const mapElementsPosition = {
  right: 'row',
  bottom: 'column',
};

export const TextWrapper = styled.div`


`;
export const Wrapper = styled.div<{size?: 'S' | 'M' | 'L'}>`
margin: ${(props): string => (props.size === 'L' ? '12px' : '8px')};

`;
export const LoaderWrapper = styled.div<{elementsPosition: string | 'bottom' | 'right'}>`
display: flex;
flex-direction: ${(props): string => mapElementsPosition[props.elementsPosition]}; 
align-items: center;
justify-content: center;

`;

