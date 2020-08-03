import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const TextareaWrapper = styled.div<{ isDisabled: boolean; isFocused: boolean; hasError: boolean }>`
  position: relative;
  overflow: auto;
  resize: vertical;
  border-radius: 3px;
  transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  ${(props): FlattenSimpleInterpolation => {
    if (props.isDisabled)
      return css`
        border: 1px solid #dbe0e3;
        background-color: #f9fafb;
        cursor: not-allowed;
      `;
    if (props.isFocused)
      return css`
        box-shadow: inset 0 0 0 1px ${props.theme.palette['blue-600']};
        border: 1px solid ${props.theme.palette['blue-600']};
        background-color: ${props.theme.palette['blue-050']};
      `;
    if (props.hasError)
      return css`
        background-color: ${props.theme.palette['red-050']};
        box-shadow: inset 0 0 0 1px ${props.theme.palette['red-600']};
        border: 1px solid ${props.theme.palette['red-600']};
      `;
    return css`
      border: 1px solid #dbe0e3;
      background-color: #fff;
    `;
  }}

  .scrollbar-container {
    min-height: 100%;
    div {
      height: 100%;
    }
  }
  &&& {
    textarea {
      position: relative;
      min-height: 100%;
      resize: none;
      background: transparent;
      border: 0;
      box-shadow: none;
      outline: 0;
    }
  }
`;
