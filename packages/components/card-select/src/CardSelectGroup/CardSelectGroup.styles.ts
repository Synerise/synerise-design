import styled from 'styled-components';

export const CardSelectGroupWrapper = styled.div<{
  itemsCount?: number;
  size: 'small' | 'medium' | 'large';
  columns: number | null;
}>`
  padding: 24px;
  display: grid;
  grid-template-columns: ${(props) =>
    new Array(props.columns || props.itemsCount).fill('1fr').join(' ')};
  gap: ${(props) => (props.size === 'small' ? '16px' : '24px')};
`;

// @deprecated - use CardSelectGroupWrapper instead
export const CardGroup = CardSelectGroupWrapper;
