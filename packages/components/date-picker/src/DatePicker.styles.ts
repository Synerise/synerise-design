import styled, { css } from 'styled-components';

export const borderStyle = css`
  ${props => props.theme.variable('@border-width-base')}
  ${props => props.theme.variable('@border-style-base')}
  ${props => props.theme.variable('@border-color-base')}
`;


export const Container = styled.div`
  background-color: white;
  user-select: none;
  display: grid;
  grid-template-rows: 48px 240px 1fr;
  align-items: stretch;
  justify-content: stretch;

  > *:not(:last-child) {
    border-bottom: ${borderStyle};
  }
`;

