import type { ResizeProperty } from 'csstype';
import styled, {
  css,
  type FlattenSimpleInterpolation,
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
        border: 1px solid var(--ds-form-field-border-default);
        background-color: var(--ds-color-background-base-subtle);
      `;
    }
    if (props.isDisabled) {
      return css`
        border: 1px solid var(--ds-form-field-border-disabled);
        background-color: var(--ds-form-field-bg-disabled);
        cursor: not-allowed;
      `;
    }
    if (props.isFocused) {
      return css`
        box-shadow: inset 0 0 0 1px var(--ds-form-field-border-focus);
        border: 1px solid var(--ds-form-field-border-focus);
        background-color: var(--ds-form-field-bg-focus);
        &&& {
          textarea {
            &::-webkit-scrollbar-thumb {
              background-color: var(--ds-color-border-base-strong);
              border: 4px solid var(--ds-form-field-bg-focus) !important;
            }
          }
        }
      `;
    }
    if (props.hasError) {
      return css`
        background-color: var(--ds-form-field-bg-validated);
        box-shadow: inset 0 0 0 1px var(--ds-form-field-border-validated);
        border: 1px solid var(--ds-form-field-border-validated);
      `;
    }
    return css`
      border: 1px solid var(--ds-form-field-border-default);
      background-color: var(--ds-form-field-bg-default);
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
      /* native textarea doesn't inherit font-family — use the DS body font */
      font-family: inherit;
      font-size: 13px;
      font-variant-numeric: normal;
      &::placeholder,
      &::-webkit-input-placeholder {
        color: var(--ds-form-field-text-placeholder);
        line-height: 1.38;
      }
      &:-ms-input-placeholder {
        color: var(--ds-form-field-text-placeholder);
        line-height: 1.38;
        //duplicate to override firefox styles
      }
    }
  }
`;
