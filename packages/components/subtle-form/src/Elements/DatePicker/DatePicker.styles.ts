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

export const ContentAbove = styled.div<{ active: boolean }>`
  padding: 0 0 0 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props): string => (props.active ? `10px` : `8px`)};
`;

export const MaskedDatePlaceholder = styled.div`
  font-size: 13px;
  color: transparent;
  position: absolute;
  left: 0;
  top: 8px;
  transition: left 0.1s ease-in 0.2s, color 0.1s ease-in 0.2s;
`;
