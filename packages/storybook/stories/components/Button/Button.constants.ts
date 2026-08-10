import styled from 'styled-components';

import { customColors } from '@synerise/ds-tokens/names';

export const BUTTON_TYPES = [
  'primary',
  'secondary',
  'tertiary',
  'tertiary-white',
  'ghost-primary',
  'ghost',
  'ghost-white',
  'custom-color',
  'custom-color-ghost',
  'danger',
  'success',
  'warning',
];

export const BUTTON_CUSTOM_COLORS = [
  'blue',
  'grey',
  'red',
  'green',
  'yellow',
  'pink',
  'mars',
  'orange',
  'fern',
  'cyan',
  'purple',
  'violet',
];

export const Matrix = styled.div`
  display: flex;
`;
export const MatrixColumn = styled.div`
  display: flex;

  flex-direction: column;
`;
export const MatrixCell = styled.div<{ type?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 60px;
  padding: 10px;
  ${(props) =>
    (props.type === 'ghost-white' || props.type === 'tertiary-white') &&
    `
      background: ${customColors.grey['600']};
      color: var(--ds-color-text-onsolid-default);
    `}
`;

export const ButtonTypeWrapper = styled.div<{ type?: string }>`
  padding: 20px 10px;
  ${(props) =>
    (props.type === 'ghost-white' || props.type === 'tertiary-white') &&
    `
      background: ${customColors.grey['600']};
      color: var(--ds-color-text-onsolid-default);
    `}
  border-bottom: solid 1px var(--ds-color-border-base-default);
  &:last-of-type {
    border: 0;
  }
`;
