import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const SelectContainer = styled.div<{ active: boolean }>`
  position: relative;
  height: 32px;
  width: 100%;
  ${(props): false | FlattenSimpleInterpolation =>
    props.active &&
    css`
      margin: -2px 0 0 -1px;
    `}

  .ant-select-focused {
    .ds-status {
      margin: -1px 0 0 0;
    }
  }
  .ds-status {
    margin: 0;
  }
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
