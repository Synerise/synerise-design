import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const SelectContainer = styled.div<{ active: boolean; disabled: boolean }>`
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

  ${(props): FlattenSimpleInterpolation | false =>
    !!props.disabled &&
    css`
      && {
        cursor: not-allowed;
      }
    `}
`;

export const ContentAbove = styled.div<{ active: boolean }>`
  padding: 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props): string => (props.active ? `10px` : `8px`)};
`;

export const MaskedDatePlaceholder = styled.div<{ disabled?: boolean }>`
  font-size: 13px;
  color: transparent;
  position: absolute;
  left: 0;
  top: 8px;
  transition: ${(props): string | false =>
    props.disabled ? 'none' : 'left 0.1s ease-in 0.2s, color 0.1s ease-in 0.2s'};
`;
