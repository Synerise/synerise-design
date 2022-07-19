import styled, { keyframes } from 'styled-components';

export const ScrollbarContainer = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

export const ScrollbarContent = styled.div`
  -ms-overflow-style: none;
  overflow: auto;
  scrollbar-width: none;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const ScrollbarWrapper = styled.div<{ absolute?: boolean; loading?: boolean }>`
  padding-right: ${(props): string => (props.absolute ? '' : '11px !important')};
  & > * {
    opacity: ${(props): string => (props.loading ? '0.2' : '1')};
    transition: all 0.25s ease-in-out;
  }
`;

export const ScrollbarTrackWrapper = styled.div`
  display: block;
  height: 100%;
  position: absolute;
  width: 11px;
  top: 0;
  right: 0;
  bottom: 0;
  user-select: none;
  opacity: 0.2;
  &:hover {
    opacity: 0.6;
  }
`;

export const ThumbVertical = styled.div`
  width: 3px;
  background-color: #6a7580;
  border-radius: 2px;
  right: 4px;
  position: absolute;
`;

export const TrackVertical = styled.div`
  opacity: 0.2;
  width: 11px;
  height: calc(100% - 8px);
  transform: translateY(4px);
  overflow: hidden;
  right: 0;
  top: 0;
  bottom: 0;
  //transition: opacity 0.3s ease-in-out;
  position: absolute;

  &:hover,
  &:active,
  &:focus {
    opacity: 0.6;
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
