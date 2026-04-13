import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: grid;
`;

export const Slot = styled.div<{ visible: boolean }>`
  grid-area: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: opacity 0.15s ease;
  ${(props) =>
    props.visible
      ? css`
          opacity: 1;
          pointer-events: auto;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `};
`;
