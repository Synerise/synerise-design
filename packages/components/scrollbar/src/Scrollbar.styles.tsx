import styled from 'styled-components';

export const ScrollbarContent = styled.div``;

export const ScrollbarWrapper = styled.div<{ absolute?: boolean }>`
  padding-right: ${(props): string => (props.absolute ? '' : '11px !important')};
`;
