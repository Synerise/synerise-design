import styled, { css } from 'styled-components';

export const SelectContainer = styled.div<{ active: boolean }>`
  position: relative;
  min-height: 32px;
  width: 100%;
  ${(props) =>
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
