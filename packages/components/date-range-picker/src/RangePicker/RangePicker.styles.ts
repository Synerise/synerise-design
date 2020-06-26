import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

const borderStyle = css``;
const borderedSidesStyle = css`
  border-bottom: ${borderStyle};

  & > *:not(:last-child) {
    border-right: ${borderStyle};
  }
`;

export const Sides = styled.div<{ bordered?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;

  ${(props): FlattenSimpleInterpolation | null => (props.bordered ? borderedSidesStyle : null)};
`;

export const Side = styled.div`
  display: grid;
  grid-template-rows: 48px 240px;
  align-items: stretch;
  justify-content: stretch;

  > *:not(:last-child) {
    border-bottom: ${borderStyle};
  }
`;
