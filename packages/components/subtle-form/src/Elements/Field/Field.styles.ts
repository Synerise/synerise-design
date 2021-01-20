import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const ContentAbove = styled.div<{ active?: boolean }>`
  padding: 0 0 0 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props): string => (props.active ? `10px` : `8px`)};
`;
