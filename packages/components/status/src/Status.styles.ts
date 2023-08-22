import styled from 'styled-components';
import { Tag } from '@synerise/ds-tags';
import { ThemeProps } from '@synerise/ds-core';
import type { StatusType } from './Status.types';

const typeColor = (props: ThemeProps & { type: StatusType }): string =>
  ({
    primary: props.theme.palette['blue-600'],
    danger: props.theme.palette['red-600'],
    warning: props.theme.palette['yellow-600'],
    success: props.theme.palette['green-600'],
    default: props.theme.palette['grey-500'],
    disabled: props.theme.palette['grey-500'],
  }[props.type]);

export const StatusTag = styled(Tag)<{ type: StatusType }>`
  && {
    transition: opacity 0.25s;
    color: ${typeColor};
    border-color: ${typeColor};
  }
`;
