import styled from 'styled-components';

import { type ThemePropsVars } from '@synerise/ds-core';

import { type BadgeStatus } from './CardBadge.types';

const background: Record<BadgeStatus, string> = {
  success: 'green-600',
  warning: 'yellow-600',
  error: 'red-600',
  default: 'transparent',
  checked: 'transparent',
};

const color: Record<BadgeStatus, string> = {
  success: 'white',
  warning: 'white',
  error: 'white',
  default: 'grey-400',
  checked: 'grey-400',
};

const boxShadow = (props: { status: BadgeStatus; theme: ThemePropsVars }) => {
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
  background-color: ${(props) => props.theme.palette[background[props.status]]};
  box-shadow: ${(props) => boxShadow(props)};
  border-radius: 50%;
  &&& svg {
    color: ${(props) => props.theme.palette[color[props.status]]};
  }
`;
