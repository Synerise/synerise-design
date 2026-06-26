import styled, { css } from 'styled-components';

import { type CarouselEffect } from './Carousel.types';

export const Root = styled.div`
  position: relative;
  display: block;
  width: 100%;
  box-sizing: border-box;
`;

/** Viewport — clips the track for the scrollx effect. */
export const List = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
`;

export const Track = styled.div<{
  $effect: CarouselEffect;
  $index: number;
  $slidesToShow: number;
}>`
  ${({ $effect, $index, $slidesToShow }) =>
    $effect === 'fade'
      ? css`
          position: relative;
          display: block;
        `
      : css`
          display: flex;
          flex-wrap: nowrap;
          transform: translateX(-${($index * 100) / $slidesToShow}%);
          transition: transform 0.5s ease;
        `}
`;

export const Slide = styled.div<{
  $effect: CarouselEffect;
  $active: boolean;
  $slidesToShow: number;
}>`
  box-sizing: border-box;

  ${({ $effect, $active, $slidesToShow }) =>
    $effect === 'fade'
      ? css`
          width: 100%;
          transition: opacity 0.5s ease;
          ${$active
            ? css`
                position: relative;
                opacity: 1;
                z-index: 1;
              `
            : css`
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                opacity: 0;
                z-index: 0;
                pointer-events: none;
              `}
        `
      : css`
          flex: 0 0 ${100 / $slidesToShow}%;
          max-width: ${100 / $slidesToShow}%;
        `}
`;

export const Dots = styled.ul`
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const Dot = styled.li<{ $active: boolean }>`
  display: inline-flex;

  button {
    width: 16px;
    height: 3px;
    padding: 0;
    border: 0;
    border-radius: 2px;
    cursor: pointer;
    background: ${({ $active, theme }) =>
      $active ? theme.palette['blue-600'] : theme.palette['grey-300']};
    transition: background 0.2s ease;
  }

  &:hover button {
    background: ${({ $active, theme }) =>
      $active ? theme.palette['blue-600'] : theme.palette['grey-400']};
  }
`;
