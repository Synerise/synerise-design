import styled from 'styled-components';

import type { BadgeStatus } from './CardBadge.types';

const background: Record<BadgeStatus, string> = {
  success: 'var(--ds-card-header-badge-success-bg)',
  warning: 'var(--ds-card-header-badge-warning-bg)',
  error: 'var(--ds-card-header-badge-error-bg)',
  default: 'var(--ds-card-header-badge-default-bg)',
  checked: 'var(--ds-card-header-badge-checked-bg)',
};

const color: Record<BadgeStatus, string> = {
  success: 'var(--ds-card-header-badge-success-icon)',
  warning: 'var(--ds-card-header-badge-warning-icon)',
  error: 'var(--ds-card-header-badge-error-icon)',
  default: 'var(--ds-card-header-badge-default-icon)',
  checked: 'var(--ds-card-header-badge-checked-icon)',
};

const boxShadow = (props: { status: BadgeStatus }) => {
  return props.status === 'default'
    ? 'var(--ds-card-header-badge-default-border) 0px 0px 0px 1.5px inset'
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
