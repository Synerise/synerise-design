import styled, { type StyledComponent, css } from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';
import Tag, { type TagProps } from '@synerise/ds-tag';

import type { StatusType } from './Status.types';

const typeColor = (props: ThemeProps & { type: StatusType }) =>
  ({
    primary: props.theme.palette['blue-600'],
    danger: props.theme.palette['red-600'],
    warning: props.theme.palette['yellow-700'],
    success: props.theme.palette['green-700'],
    info: props.theme.palette['blue-600'],
    default: props.theme.palette['grey-500'],
    disabled: props.theme.palette['grey-500'],
    custom: null,
  })[props.type];

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
      const color = typeColor(props);

      return (
        color &&
        css`
          color: ${color};
          border-color: ${color};
        `
      );
    }}
  }
`;
