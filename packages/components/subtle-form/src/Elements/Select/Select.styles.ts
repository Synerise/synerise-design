import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const SelectContainer = styled.div<{ active: boolean }>`
  position: relative;
  width: 100%;
  ${(props): false | FlattenSimpleInterpolation =>
    props.active &&
    css`
      margin: -2px 0 0 -1px;
    `}

  div.ant-select-selector {
    transition: border 0s linear !important;
  }
`;

export const ContentAbove = styled.div<{ active: boolean }>`
  padding: 0 0 0 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props): string => (props.active ? `10px` : `8px`)};
`;
