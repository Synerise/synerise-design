import styled from 'styled-components';
import { Tag } from '@synerise/ds-tags';

const typeColor = (props): string =>
  ({
    primary: props.theme.palette['blue-600'],
    danger: props.theme.palette['red-600'],
    warning: props.theme.palette['yellow-600'],
    success: props.theme.palette['green-600'],
    disabled: props.theme.palette['grey-500'],
  }[props.type]);

// eslint-disable-next-line import/prefer-default-export
export const StatusTag = styled(Tag)<{ type: string }>`
  && {
    transition: opacity 0.25s;
    color: ${typeColor};
    border-color: ${typeColor};

    &:hover {
      opacity: 0.8;
    }
  }
`;
