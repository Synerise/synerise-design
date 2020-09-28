import styled from 'styled-components';

export const Placeholder = styled.div<{height?: number}>`
  display: flex;
  width: 100%;
  height: ${(props): string => props.height ? `${props.height}px` : '50vh'};
`;
