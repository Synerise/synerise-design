import styled from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';

import { ItemLabel } from '../Item.styles';
import { ItemMeta } from '../ItemMeta/ItemMeta.styles';

export const SelectFilterItem = styled.div`
  margin-right: 12px;
  cursor: pointer;

  .selected-item-icon {
    position: relative;
    svg {
      position: relative;
    }
    &::before {
      display: flex;
      content: '';
      border-radius: 50%;
      background-color: var(--ds-color-background-success-solid);
      width: 16px;
      height: 16px;
      position: absolute;
      z-index: 0;
      top: 4px;
      left: 4px;
    }
  }
`;

export const MenuItem = styled.div<{ danger?: boolean }>`
  && {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 3px; 
    height: 32px;
    width: 100%;
    font-size: 13px;
    line-height: 1.38;
    font-weight: 500;
    cursor: pointer;
    padding: 0 8px;
    
    background-color: ${(props): string =>
      props.danger
        ? 'var(--ds-color-background-danger-subtle)'
        : 'var(--ds-color-background-base-default)'};
    color: ${(props): string =>
      props.danger
        ? 'var(--ds-color-text-danger-default)'
        : 'var(--ds-color-text-base-subtle)'};
    &:hover {
      background-color: background-color: ${(props): string =>
        props.danger
          ? 'var(--ds-color-background-danger-subtle)'
          : 'var(--ds-color-background-base-default)'};;
      color: ${(props): string =>
        props.danger
          ? 'var(--ds-color-text-danger-default)'
          : 'var(--ds-color-text-base-subtle)'};
    }
    
    ${IconContainer} {
      margin-right: 12px;
      svg {
        color: ${(props): string =>
          props.danger
            ? 'var(--ds-color-icon-danger-default)'
            : 'var(--ds-color-icon-base-default)'};
        fill: ${(props): string =>
          props.danger
            ? 'var(--ds-color-icon-danger-default)'
            : 'var(--ds-color-icon-base-default)'};
      }
    }
  }
`;

export const ItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  padding: 12px;
  max-height: 48px;

  &:hover {
    ${ItemLabel} {
      color: var(--ds-color-text-base-default);
    }
  }

  ${ItemMeta} {
    margin-right: 12px;
  }
`;
