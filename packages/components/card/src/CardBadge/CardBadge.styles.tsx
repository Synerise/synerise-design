import styled from 'styled-components';

import { type BadgeStatus } from './CardBadge.types';

const background: Record<BadgeStatus, string> = {
  success: 'var(--ds-color-background-success-solid)',
  warning: 'var(--ds-color-background-warning-solid)',
  error: 'var(--ds-color-background-danger-solid)',
  default: 'transparent',
  checked: 'transparent',
};

const color: Record<BadgeStatus, string> = {
  success: 'var(--ds-color-text-onsolid-default)',
  warning: 'var(--ds-color-text-onsolid-default)',
  error: 'var(--ds-color-text-onsolid-default)',
  default: 'var(--ds-color-icon-base-muted)',
  checked: 'var(--ds-color-icon-base-muted)',
};

const boxShadow = (props: { status: BadgeStatus }) => {
  return props.status === 'default'
    ? 'var(--ds-color-border-base-stronghover) 0px 0px 0px 1.5px inset'
    : 'none';
};

export const CardBadge = styled.div<{ status: BadgeStatus }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => background[props.status]};
  box-shadow: ${(props) => boxShadow(props)};
  border-radius: 50%;
  &&& svg {
    color: ${(props) => color[props.status]};
  }
`;
