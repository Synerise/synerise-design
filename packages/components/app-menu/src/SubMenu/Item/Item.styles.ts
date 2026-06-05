import styled from 'styled-components';

import { macro } from '@synerise/ds-typography';

export const ItemAction = styled.span`
  margin-top: -4px;
  margin-right: -4px;
  float: right;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

export const Wrapper = styled.div`
  ${macro.h200};
  width: 100%;
  padding: 8px 12px;
  margin: 0 0 1px;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover,
  &.sub-menu__item--active {
    background: var(--ds-app-menu-icon-bg-hover);
    color: var(--ds-color-text-brand-default);
    opacity: 1;

    ${ItemAction} {
      opacity: 1;
    }
  }
`;
