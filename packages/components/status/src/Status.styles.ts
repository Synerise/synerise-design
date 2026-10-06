import styled, { css, type StyledComponent } from 'styled-components';

import Tag, { type TagProps } from '@synerise/ds-tag';

import type { StatusType } from './Status.types';

const TYPE_TO_TOKEN_VARIANT: Record<Exclude<StatusType, 'custom'>, string> = {
  primary: 'info',
  info: 'info',
  danger: 'error',
  warning: 'warning',
  success: 'success',
  default: 'neutral',
  disabled: 'neutral',
};

const variantText = (type: StatusType): string | null => {
  if (type === 'custom') {
    return null;
  }
  return `var(--ds-status-pill-variant-${TYPE_TO_TOKEN_VARIANT[type]}-text)`;
};

const variantBorder = (type: StatusType, dashed?: boolean): string | null => {
  if (type === 'custom') {
    return null;
  }
  const style = dashed ? 'dashed' : 'solid';
  return `var(--ds-status-pill-variant-${TYPE_TO_TOKEN_VARIANT[type]}-border-${style})`;
};

type StyledTagProps = { type: StatusType; dashed?: boolean };

export const StatusTag: StyledComponent<
  React.ForwardRefExoticComponent<
    TagProps &
      Omit<React.HTMLAttributes<HTMLDivElement>, keyof TagProps> &
      React.RefAttributes<HTMLDivElement>
  >,
  object,
  StyledTagProps,
  never
> = styled(Tag)<StyledTagProps>`
  && {
    transition: opacity 0.25s;
    border: ${(props) => (props.dashed ? '1px dashed' : '1px solid')};
    ${(props) => {
      const text = variantText(props.type);
      const border = variantBorder(props.type, props.dashed);

      return (
        text &&
        border &&
        css`
          color: ${text};
          border-color: ${border};
        `
      );
    }}
  }
`;
