import styled, { keyframes } from 'styled-components';

const spinnerAnimation = keyframes`
  from {
    transform: rotateZ(0deg);
  }
  
  to {
    transform: rotateZ(360deg);
  }
`;

export const Loader = styled.div<{ loading?: boolean }>`
  width: 0;
  height: 0;
  position: absolute;
  top: calc(50% - 12px);
  left: calc(50% - 12px);
  z-index: 99;
  pointer-events: none;
  display: flex;
  opacity: ${(props): string => (props.loading ? '1' : '0')};
  transform-origin: 12px 12px;
  transition: opacity 0.3s ease-in-out;
  animation: ${spinnerAnimation} 1s forwards linear infinite;
  svg {
    color: ${(props): string => props.theme.palette['grey-600']};
    fill: ${(props): string => props.theme.palette['grey-600']};
  }
`;

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6);
`;

export const ScrollbarContainer = styled.div`
  position: relative;
  height: 100%;
`;
