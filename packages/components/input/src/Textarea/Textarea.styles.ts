import { type ResizeProperty } from 'csstype';
import styled, {
  type FlattenSimpleInterpolation,
  css,
} from 'styled-components';

export const TextareaWrapper = styled.div<{
  resize?: ResizeProperty;
  isDisabled: boolean;
  isFocused: boolean;
  hasError: boolean;
  isReadOnly?: boolean;
}>`
  position: relative;
  overflow: hidden;
  resize: ${(props): string => (props.resize ? props.resize : 'vertical')};
  border-radius: 3px;
  transition:
    background-color 0.3s ease-in-out,
    border 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
  ${(props): FlattenSimpleInterpolation => {
    if (props.isReadOnly) {
      return css`
        border: 1px solid ${props.theme.palette['grey-300']};
        background-color: ${props.theme.palette['grey-050']};
      `;
    }
    if (props.isDisabled) {
      return css`
        border: 1px solid #dbe0e3;
        background-color: #f9fafb;
        cursor: not-allowed;
      `;
    }
    if (props.isFocused) {
      return css`
        box-shadow: inset 0 0 0 1px ${props.theme.palette['blue-600']};
        border: 1px solid ${props.theme.palette['blue-600']};
        background-color: ${props.theme.palette['blue-050']};
        &&& {
          textarea {
            &::-webkit-scrollbar-thumb {
              background-color: #e1e3e6;
              border: 4px solid ${props.theme.palette['blue-050']} !important;
            }
          }
        }
      `;
    }
    if (props.hasError) {
      return css`
        background-color: ${props.theme.palette['red-050']};
        box-shadow: inset 0 0 0 1px ${props.theme.palette['red-600']};
        border: 1px solid ${props.theme.palette['red-600']};
      `;
    }
    return css`
      border: 1px solid #dbe0e3;
      background-color: #fff;
    `;
  }}

  .scrollbar-container {
    height: 100%;
    top: 1px;
    bottom: 0;
    right: 1px;
    .ps__rail-y,
    .ps__thumb-x,
    .ps__rail-x {
      height: calc(100% - 1px);
      max-height: 9px;
    }
    & > .textarea-scrollbar {
      &,
      & > div {
        height: calc(100% - 2px);
      }
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
      word-wrap: break-word;
      overflow-wrap: break-word;
      font-variant-numeric: normal;
      ::placeholder,
      ::-webkit-input-placeholder {
        line-height: 1.38;
      }
      :-ms-input-placeholder {
        line-height: 1.38;
        //duplicate to override firefox styles
      }
    }

    .ant-input-textarea {
      height: 100%;
    }
  }
`;
