import styled, { keyframes } from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';

import { PREVIEW_PADDING } from './ImagePreview.const';

const OVERLAY_Z_INDEX = 1050;
const imageFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const BACKDROP_ALPHA = 'CC'; // grey-900 at 80% — appended to the palette hex
const CONTROLS_INSET = 16; // gap between the toolbars/close and the viewport edge
const IMAGE_BORDER_RADIUS = 8;

export const Overlay = styled.div<ThemeProps & { $hidden?: boolean }>`
  position: fixed;
  inset: 0;
  z-index: ${OVERLAY_Z_INDEX};
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  background-color: ${(props): string =>
    `${props.theme.palette['grey-900']}${BACKDROP_ALPHA}`};
  /* Quick fade on open/close. visibility (not display:none) keeps it
     animatable while still hiding it from view and interaction. */
  opacity: ${(props): number => (props.$hidden ? 0 : 1)};
  visibility: ${(props): string => (props.$hidden ? 'hidden' : 'visible')};
  pointer-events: ${(props): string => (props.$hidden ? 'none' : 'auto')};
  transition:
    opacity 160ms ease,
    visibility 160ms ease;
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: ${PREVIEW_PADDING}px;
`;

export const Image = styled.img<ThemeProps>`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  user-select: none;
  border-radius: ${IMAGE_BORDER_RADIUS}px;
  box-shadow: ${(props): string => props.theme.variables['box-shadow-4']};
  /* Replays on each image (keyed by index) for a quick fade when navigating. */
  animation: ${imageFadeIn} 200ms ease;
`;

export const Fallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
`;

/** Default broken-image placeholder shown when an image fails to load. */
export const FallbackBox = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 180px;
  border-radius: ${IMAGE_BORDER_RADIUS}px;
  color: ${(props): string => props.theme.palette['grey-600']};
  background-color: ${(props): string => props.theme.palette['grey-050']};
`;

/** Close button — kept in the top-right corner, away from the bottom toolbar. */
export const CloseWrapper = styled.div`
  position: absolute;
  top: ${CONTROLS_INSET}px;
  right: ${CONTROLS_INSET}px;
  z-index: 2;
`;

/** Navigation + zoom controls — centered along the bottom edge. */
export const ToolbarWrapper = styled.div`
  position: absolute;
  bottom: ${CONTROLS_INSET}px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
`;
