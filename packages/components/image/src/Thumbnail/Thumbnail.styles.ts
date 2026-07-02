import styled from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';

import {
  type ObjectFit,
  type ThumbnailBackground,
} from '../shared/Image.shared.types';
import ImageContent from '../shared/ImageContent';

const TILE_BORDER_RADIUS = 4;
const HOVER_OVERLAY_ALPHA = '4D'; // grey-900 at ~30% opacity
const DELETE_BUTTON_SIZE = 24; // matches the M icon exactly — no clickable padding

/**
 * Outer box — owns sizing and the focus ring but does NOT clip, so the delete
 * affordance can overhang the corner. Clipping lives on `Clip`.
 */
export const Tile = styled.div<
  ThemeProps & {
    $height: number;
    $aspectRatio?: string;
    $interactive: boolean;
  }
>`
  position: relative;
  display: inline-flex;
  margin: 0;
  padding: 0;
  border-radius: ${TILE_BORDER_RADIUS}px;
  height: ${(props): number => props.$height}px;
  ${(props): string =>
    props.$aspectRatio
      ? `aspect-ratio: ${props.$aspectRatio};`
      : 'width: auto;'}
  cursor: ${(props): string => (props.$interactive ? 'pointer' : 'default')};

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${(props): string => props.theme.palette['blue-600']};
  }
`;

/** Inner box — clips the image + hover overlay to the rounded corners. */
export const Clip = styled.div<
  ThemeProps & { $background: ThumbnailBackground; $source: boolean }
>`
  position: relative;
  display: inline-flex;
  overflow: hidden;
  height: 100%;
  ${(props): string => (props.$source ? 'width: auto;' : 'width: 100%;')}
  border-radius: ${TILE_BORDER_RADIUS}px;
  background-color: ${(props): string =>
    props.$background === 'subtle-grey'
      ? props.theme.palette['grey-050']
      : 'transparent'};
`;

export const ThumbnailImage = styled(ImageContent)<{
  $objectFit: ObjectFit;
  $source: boolean;
}>`
  display: block;
  object-fit: ${(props): ObjectFit => props.$objectFit};
  ${(props): string =>
    props.$source ? 'height: 100%; width: auto;' : 'width: 100%; height: 100%;'}
`;

export const EmptyPlaceholder = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${(props): string => props.theme.palette['grey-600']};
  background-color: ${(props): string => props.theme.palette['grey-050']};
`;

/** Hover affordance: a dim layer over the whole tile with a centered show icon. */
export const HoverOverlay = styled.div<ThemeProps>`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props): string => props.theme.palette.white};
  background-color: ${(props): string =>
    `${props.theme.palette['grey-900']}${HOVER_OVERLAY_ALPHA}`};
  opacity: 0;
  transition: opacity 0.15s ease;

  ${Tile}:hover & {
    opacity: 1;
  }
`;

export const DeleteButton = styled.button<ThemeProps>`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  /* Center the button on the thumbnail's top-right corner (overhanging). */
  transform: translate(50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${DELETE_BUTTON_SIZE}px;
  height: ${DELETE_BUTTON_SIZE}px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  /* Drives the icon's full-background fill (white X on a red disc). */
  color: ${(props): string => props.theme.palette['red-600']};
  opacity: 0;
  transition: opacity 0.15s ease;

  ${Tile}:hover &,
  ${Tile}:focus-within & {
    opacity: 1;
  }
`;
