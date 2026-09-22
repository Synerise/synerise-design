import styled from 'styled-components';

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
      background: ${props.theme.palette['grey-600']};
      color: #fff;
    `}
`;

export const ButtonTypeWrapper = styled.div<{ type?: string }>`
  padding: 20px 10px;
  ${(props) =>
    (props.type === 'ghost-white' || props.type === 'tertiary-white') &&
    `
      background: ${props.theme.palette['grey-600']};
      color: #fff;
    `}
  border-bottom: solid 1px #ccc;
  &:last-of-type {
    border: 0;
  }
`;

/**
 * The square sizes of `mode="single-icon"`, paired with the width each one must resolve to.
 * Shared by the docs story and the visual test so the two cannot drift apart.
 */
export const SINGLE_ICON_SIZES = [
  { size: 'small', label: 'small — 28px', width: 28 },
  { size: undefined, label: 'default — 32px', width: 32 },
  { size: 'large', label: 'large — 48px', width: 48 },
] as const;
