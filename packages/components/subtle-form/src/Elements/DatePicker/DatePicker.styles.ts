import styled, { css } from 'styled-components';

export const SelectContainer = styled.div<{
  active: boolean;
  disabled: boolean;
}>`
  position: relative;
  min-height: 32px;
  width: 100%;
  ${(props) =>
    props.active &&
    css`
      margin: -2px 0 0 -1px;
    `}

  > div {
    margin: 0;
  }

  ${(props) =>
    !!props.disabled &&
    css`
      && {
        cursor: not-allowed;
      }
    `}
`;

export const MaskedDatePlaceholder = styled.div<{ disabled?: boolean }>`
  font-size: 13px;
  color: transparent;
  position: absolute;
  left: 0;
  top: 8px;
  transition: ${(props) =>
    props.disabled
      ? 'none'
      : 'left 0.1s ease-in 0.2s, color 0.1s ease-in 0.2s'};
`;
