import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const SelectContainer = styled.div<{ active: boolean }>`
  position: relative;
  width: 100%;
  ${(props): false | FlattenSimpleInterpolation =>
  props.active &&
  css`
      margin: -2px 0 0 -1px;
    `}

  > div {
    margin: 0;
  }
`;