import styled from 'styled-components';

import { type ThemePropsVars } from '@synerise/ds-core';

import { type BadgeStatus } from './CardBadge.types';

const background = {
  success: 'green-600',
  warning: 'yellow-600',
  error: 'red-600',
  default: 'transparent',
};

const color = {
  success: 'white',
  warning: 'white',
  error: 'white',
  default: 'grey-400',
};

const boxShadow = (props: {
  status: BadgeStatus;
  theme: ThemePropsVars;
}): string => {
  return props.status === 'default'
    ? `${props.theme.palette['grey-400']} 0px 0px 0px 1.5px inset`
    : 'none';
};

export const CardBadge = styled.div<{ status: BadgeStatus }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props): string =>
    props.theme.palette[background[props.status]]};
  box-shadow: ${(props): string => boxShadow(props)};
  border-radius: 50%;
  &&& svg {
    color: ${(props): string => props.theme.palette[color[props.status]]};
    fill: ${(props): string => props.theme.palette[color[props.status]]};
  }
`;
