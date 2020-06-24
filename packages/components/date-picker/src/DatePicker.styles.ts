import styled, { css } from 'styled-components';

export const borderStyle = css``;

export const Container = styled.div`
  background-color: ${(props): string => props.theme.palette.white};
  user-select: none;
  display: grid;
  grid-template-rows: 48px 240px 1fr;
  align-items: stretch;
  justify-content: stretch;
  min-width: 280px;
  > *:not(:last-child) {
    border-bottom: 1px solid ${(props): string => props.theme.palette['grey-200']};
  }
`;

export const OverlayContainer = styled.div``;
export const InputWrapper = styled.div``;
