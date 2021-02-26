import styled from 'styled-components';

export const ItemWrapper = styled.li`
  margin: 5px 0 5px 2px;
  display: list-item;
  justify-content: flex-start;
  align-items: center;
`;
export const IndexFormatterWrapper = styled.span<{ listStyle?: string }>`
  margin-right: 6px;
`;
