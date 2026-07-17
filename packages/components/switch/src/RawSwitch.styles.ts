import styled, {
  type FlattenSimpleInterpolation,
  css,
  keyframes,
} from 'styled-components';

type ToggleProps = {
  $checked?: boolean;
  $error?: boolean;
  $loading?: boolean;
};

const trackBackground = (props: ToggleProps, hovered: boolean): string => {
  const { $checked, $error } = props;
  if ($error) {
    return 'var(--ds-form-switch-bg-error)';
  }
  if ($checked) {
    return hovered
      ? 'var(--ds-form-switch-bg-selectedhover)'
      : 'var(--ds-form-switch-bg-selected)';
  }
  return hovered
    ? 'var(--ds-form-switch-bg-hover)'
    : 'var(--ds-form-switch-bg-default)';
};

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Toggle = styled.button<ToggleProps>`
  position: relative;
  box-sizing: border-box;
  min-width: 28px;
  width: 28px;
  height: 16px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 8px;
  background-color: ${(props): string => trackBackground(props, false)};
  cursor: pointer;
  vertical-align: middle;
  outline: none;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${(props): string => trackBackground(props, true)};
  }

  &:focus-visible {
    border-color: var(--ds-color-focus-base-default);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: var(--ds-form-switch-disabled-opacity);
  }

  ${(props): FlattenSimpleInterpolation | false =>
    !!props.$loading &&
    css`
      cursor: default;
    `}
`;

export const Handle = styled.span<{ $checked?: boolean }>`
  position: absolute;
  top: 0;
  left: ${(props): string => (props.$checked ? 'calc(100% - 12px)' : '0')};
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--ds-form-switch-handle-bg);
  transition: left 0.2s ease;
`;

export const Spinner = styled.span`
  position: absolute;
  top: 1px;
  left: 1px;
  width: 10px;
  height: 10px;
  border: 1.5px solid var(--ds-color-border-base-stronghover);
  border-top-color: var(--ds-color-background-success-solid);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
