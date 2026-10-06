import styled, { css } from 'styled-components';

import Button, { type StyledButton } from '@synerise/ds-button';
import { IconContainer } from '@synerise/ds-icon';
import { Text, Label as TypographyLabel } from '@synerise/ds-typography';

export const Container = styled.div`
  width: 100%;
`;

export const Description = styled(Text)<{ hasError?: boolean }>`
  && {
    margin: ${(props) => (props.hasError ? '4px 0 8px' : '8px 0 8px')};
    display: block;
    color: var(--ds-color-text-neutral-default);
  }
`;

export const DropAreaContainer = styled.div<{ canUploadMore: boolean }>`
  width: 100%;
  margin: ${(props) => (props.canUploadMore ? '12px 0 8px' : '0')};
`;

export const DropAreaLabel = styled(Text)`
  && {
    color: var(--ds-color-text-base-muted);
    font-weight: 500;
  }
`;

export const LargeDropAreaLabel = styled(TypographyLabel)`
  && {
    font-size: 14px;
    margin: 4px 0 0;
    display: block;
    color: var(--ds-color-text-base-default);
  }
`;

export const LargeDropAreaDescription = styled(Text)`
  && {
    margin: 4px 0 0;
    display: block;
    color: var(--ds-color-text-base-muted);
  }
`;

export const DropAreaButton = styled.button<{
  isDropping?: boolean;
  hasError?: boolean;
  mode: string;
  pressed: boolean;
  filesLength: number;
  hidden: boolean;
}>`
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  align-items: center;
  border: 1px dashed var(--ds-color-border-base-stronghover);
  padding: 11px 12px;
  border-radius: 3px;
  cursor: pointer;
  background-color: transparent;
  width: 100%;
  height: 48px;
  transition: height 0.03s;

  ${(props) =>
    props.mode === 'multi-large' &&
    props.filesLength === 0 &&
    `
      height: 160px;
      flex-direction: column;
      text-align: center;
      justify-content: center;
  `};

  ${(props) =>
    props.mode !== 'multi-large' &&
    `
      gap: 12px;
  `};

  ${IconContainer} {
    color: var(--ds-color-text-base-subtle);
  }

  ${(props) =>
    props.hasError &&
    `
      background-color: var(--ds-color-background-danger-subtle);
      border-color: var(--ds-color-border-danger-default);
    `}
  ${(props) =>
    props.pressed &&
    !props.disabled &&
    css`
      &&&:active,
      &&& {
        background-color: var(--ds-file-uploader-bg-pressed);
      }
    `}


  &:hover:not(:disabled) {
    background-color: var(--ds-file-uploader-bg-hover);
    border-color: var(--ds-color-border-base-stronghover);

    ${DropAreaLabel}, ${LargeDropAreaLabel} {
      color: var(--ds-color-text-base-subtle);
    }

    ${IconContainer} {
      color: var(--ds-color-text-base-subtle);
    }
  }

  &:disabled {
    background-color: var(--ds-color-background-base-subtle);
    ${LargeDropAreaLabel} {
      color: var(--ds-color-text-base-disabled);
    }
  }

  &&:active {
    color: var(--ds-color-text-danger-default);
    border-color: var(--ds-color-border-base-stronghover);
    background-color: var(--ds-color-background-base-subtle);
  }

  &:focus:not(:active):not(:disabled) {
    border-color: var(--ds-color-border-brand-default);
    background-color: var(--ds-color-background-brand-subtle);
  }

  &:disabled {
    span,
    ${IconContainer} {
      opacity: 0.4;
    }
  }

  ${(props) =>
    props.isDropping &&
    !props.disabled &&
    `
      height: ${props.mode === 'multi-large' && props.filesLength === 0 ? '160px' : 'auto'};
      background-color: var(--ds-color-background-brand-subtle) !important;
      border-color: var(--ds-color-border-brand-strong) !important;

      span, ${DropAreaLabel}, ${LargeDropAreaLabel}, ${LargeDropAreaDescription} {
        color: var(--ds-color-text-brand-default) !important;
      }

      ${IconContainer} {
        color: var(--ds-color-icon-brand-default) !important;
      }
    `}
`;

export const ErrorMessage = styled(Text)`
  && {
    margin: 8px 0 0;
    display: block;
    color: var(--ds-color-text-danger-default);
  }
`;

export const Label = styled(TypographyLabel)`
  && {
    cursor: initial;
    margin: 0 0 8px;
    display: flex;
    align-items: center;

    ${IconContainer} {
      color: var(--ds-color-icon-base-muted);
    }
  }
`;

export const UploadButton: StyledButton = styled(Button)``;
