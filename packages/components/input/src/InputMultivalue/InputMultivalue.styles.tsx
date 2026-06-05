import styled, {
  type FlattenSimpleInterpolation,
  css,
} from 'styled-components';

export type InputWrapperProps = {
  error?: boolean;
  focus?: boolean;
  disabled?: boolean;
};

const errorInputStyle = (): string => `
  && {
    border-color: var(--ds-form-field-border-validated);
    box-shadow: inset 0 0 0 2px var(--ds-form-field-border-validated);
    background: var(--ds-form-field-bg-validated);
    border-radius: 4px;
  }
`;
const focusStyle = (): string => `
  && {
    box-shadow: inset 0 0 0 2px var(--ds-form-field-border-focus);
    border-color: var(--ds-form-field-border-focus);
    background: var(--ds-form-field-bg-focus);
  }
`;
const contentShrinkStyle = (): FlattenSimpleInterpolation => css`
  && {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;
const disabledStyled = (): FlattenSimpleInterpolation => css`
  &:hover,
  &,
  && > * {
    cursor: not-allowed;
  }
  opacity: 0.8;
  color: var(--ds-color-text-base-muted);
  background: var(--ds-color-background-base-subtle);
`;

const hoverStyle = (): FlattenSimpleInterpolation => css`
  &:hover {
    border-color: var(--ds-color-border-base-default);
    box-shadow: inset 0 0 0 1px var(--ds-form-field-border-hover);
  }
`;

export const ContentBelow = styled.div`
  margin-top: 8px;
  line-height: 13px;
`;

export const ErrorText = styled.div`
  color: var(--ds-color-text-danger-default);
  margin-bottom: 4px;
`;

export const Label = styled.label`
  color: var(--ds-color-text-base-default);
  font-weight: 500;
  display: block;
  white-space: nowrap;
`;

export const Description = styled.div`
  color: var(--ds-color-text-base-muted);
`;

export const ContentAbove = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;
export const IconWrapper = styled.div`
  overflow: hidden;
  width: 24px;
  margin-left: -16px;
  display: none;
  color: var(--ds-color-icon-danger-default);
`;
export const ValueText = styled.div<{ shrink?: boolean; disabled?: boolean }>`
  line-height: 22px;
  text-decoration: none;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
  white-space: nowrap;
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  box-shadow: inset 0 0 0 1px var(--ds-form-field-border-default);
  background-color: var(--ds-form-field-bg-default);
  width: 100%;
  border-radius: 3px;
  display: flex;
  padding: 2px 12px;
  min-height: 32px;
  flex-wrap: wrap;
  transition: 0.3s all;
  ${(props) => !props.disabled && hoverStyle()}
  ${(props) => (props.focus && !props.disabled ? focusStyle() : '')}
  ${(props) => (props.error ? errorInputStyle() : '')}
  ${(props) => !!props.disabled && disabledStyled()}
`;

export const ValueWrapper = styled.div<{
  disabled?: boolean;
}>`
  display: grid;
  height: 24px;
  & {
    background-color: ${(props) =>
    props.disabled
      ? 'var(--ds-color-background-base-mutedhover)'
      : 'var(--ds-color-background-base-muted)'};
  }
  border-radius: 3px;
  border: none;
  margin: 2px;
  white-space: nowrap;
  position: relative;
  padding: 0 8px;
  right: 8px;
  overflow: hidden;
  grid-template-columns: calc(100%) 0px;
  transition:
    background-color 0.1s ease-in-out,
    color 0.1s ease-in-out;

  &:hover {
    ${(props) =>
    !props.disabled &&
    css`
        ${ValueText} {
          max-width: calc(100% - 16px);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        ${IconWrapper} {
          display: block;
        }
        ${contentShrinkStyle()}
      `}
    background-color: var(--ds-color-background-base-mutedhover);
    color: ${(props) => !props.disabled && 'var(--ds-color-text-base-default)'};
    cursor: pointer;
  }
  ${(props) => !!props.disabled && disabledStyled()}
`;
export const BorderLessInput = styled.input<{ disabled?: boolean }>`
  box-shadow: none;
  border: none;
  min-width: 0;
  display: flex;
  flex: 1;
  margin-left: -8px;
  && {
    background-color: rgba(255, 255, 255, 0);
  }
  &::placeholder {
    color: var(--ds-form-field-text-placeholder);
  }
  ${(props) => !!props.disabled && disabledStyled()}
`;
