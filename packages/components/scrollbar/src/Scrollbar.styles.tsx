import styled, { keyframes } from 'styled-components';

export const ScrollbarContainer = styled.div`
  position: relative;
  height: 100%;
`;

export const ScrollbarContent = styled.div``;

export const ScrollbarWrapper = styled.div<{ absolute?: boolean; loading?: boolean }>`
  padding-right: ${(props): string => (props.absolute ? '' : '11px !important')};
  & > * {
    opacity: ${(props): string => (props.loading ? '0.2' : '1')};
    transition: all 0.25s ease-in-out;
  }
`;

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
    color: ${(props): string => props.theme.palette['blue-600']};
    fill: ${(props): string => props.theme.palette['blue-600']};
  }
`;
