import styled, { css } from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';
import { Text, Label as TypographyLabel } from '@synerise/ds-typography';

export const Container = styled.div`
  width: 100%;
  display: flex;
`;
export const UploaderContainer = styled.div`
  align-items: center;
  padding-right: 14px;
`;
export const Description = styled(Text)<{ hasError?: boolean }>`
  && {
    margin: ${(props) => (props.hasError ? '4px 0 8px' : '16px 0 8px')};
    display: block;
    color: var(--ds-color-text-neutral-default);
  }
`;

export const DropAreaContainer = styled.div<{ canUploadMore: boolean }>`
  width: 100%;
  margin: ${(props) => (props.canUploadMore ? '12px 0 8px' : '0')};
`;

export const DropAreaLabel = styled(Text)`
  color: var(--ds-color-text-base-subtle);
  font-weight: 500;
`;

export const LargeDropAreaLabel = styled(TypographyLabel)`
  && {
    font-size: 14px;
    margin: 4px 0 0;
    display: block;
    color: var(--ds-color-text-base-subtle);
  }
`;

export const LargeDropAreaDescription = styled(Text)`
  && {
    margin: 4px 0 0;
    display: block;
    color: var(--ds-color-text-base-subtle);
  }
`;

export const DropAreaButton = styled.button<{
  isDropping?: boolean;
  hasError?: boolean;
  mode: string;
  pressed: boolean;
  filesLength: number;
}>`
  align-items: center;
  border: 1px dashed var(--ds-color-border-base-stronghover);
  padding: 11px 12px;
  border-radius: 3px;
  cursor: pointer;
  background-color: transparent;
  width: 80px;
  height: 80px;
  transition: height 0.3s;

  ${(props) =>
    props.mode === 'multi-large' &&
    props.filesLength === 0 &&
    `
      height: 108px;
      flex-direction: column;
      text-align: center;
      justify-content: center;
  `};

  ${IconContainer} {
    color: var(--ds-color-text-base-default);
  }

  span {
    display: inline-block;
    margin: 0 0 0 12px;
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
      height: ${props.mode === 'multi-large' ? '200px' : '80px'};
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
  }
`;
