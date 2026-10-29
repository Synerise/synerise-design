import styled, { css, keyframes } from 'styled-components';

import type { OverscrollBehavior } from '../Scrollbar.types';

export const ScrollbarContent = styled.div`
  -ms-overflow-style: none;
  overflow: auto;
  scrollbar-width: none;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const ScrollbarWrapper = styled.div<{
  absolute?: boolean;
  loading?: boolean;
  largeSize?: boolean;
}>`
  padding-right: ${(props): string => {
    if (props.absolute) {
      return '';
    }
    return props.largeSize ? '24px !important' : '11px !important';
  }};
  padding-bottom: ${(props): string => {
    if (props.absolute) {
      return '';
    }
    return props.largeSize ? '20px !important' : '11px !important';
  }};
  & > * {
    opacity: ${(props): string =>
      props.loading ? 'var(--ds-opacity-muted)' : '1'};
    transition: opacity 0.25s ease-in-out;
  }
`;

export const ThumbVertical = styled.div<{ largeSize?: boolean }>`
  position: absolute;

  ${(props) =>
    props.largeSize
      ? css`
          right: 4px;
          width: 16px;
          background-color: var(--ds-color-background-brand-subtle);
          border-radius: 3px;
          border: 1px solid var(--ds-color-border-base-strong);

          &:hover,
          &:active {
            background-color: var(--ds-color-background-brand-subtlehover);
            border: 1px solid var(--ds-color-border-base-stronghover);
          }
        `
      : css`
          right: 0;
          width: 11px;
          background-color: transparent;

          &::before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            right: 4px;
            width: 3px;
            border-radius: 3px;
            background-color: var(--ds-color-background-base-strong);
          }

          &:hover::before,
          &:active::before {
            background-color: var(--ds-color-background-base-stronghover);
          }
        `}
`;

export const ScrollbarTrackWrapper = styled.div<{ largeSize?: boolean }>`
  display: block;
  height: 100%;
  position: absolute;
  width: ${(props) => (props.largeSize ? '24px' : '11px')};
  top: 0;
  right: ${(props) => (props.largeSize ? '3px' : '0')};
  bottom: 0;
  user-select: none;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${(props) =>
    props.largeSize &&
    css`
      &:hover ${ThumbVertical} {
        background-color: var(--ds-color-background-brand-subtlehover);
        border: 1px solid var(--ds-color-border-base-stronghover);
      }
    `}

  ${(props) =>
    !props.largeSize &&
    css`
      &:hover ${ThumbVertical}::before {
        background-color: var(--ds-color-background-base-stronghover);
      }
    `}
`;

export const TrackVertical = styled.div`
  opacity: var(--ds-opacity-muted);
  width: 11px;
  height: calc(100% - 8px);
  transform: translateY(4px);
  overflow: hidden;
  right: 0;
  top: 0;
  bottom: 0;
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
    color: var(--ds-color-icon-brand-default);
    fill: var(--ds-color-icon-brand-default);
  }
`;

export const ScrollbarContainer = styled.div<{
  overscrollBehavior: OverscrollBehavior;
}>`
  display: flex;
  height: 100%;
  overflow: hidden;
  position: relative;
  overscroll-behavior: ${(props): OverscrollBehavior =>
    props.overscrollBehavior};
  &:hover {
    ${ScrollbarTrackWrapper} {
      opacity: 1;
    }
  }
`;
