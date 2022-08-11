import styled from 'styled-components';

export const ScrollbarContent = styled.div``;

export const ScrollbarWrapper = styled.div<{ absolute?: boolean; loading?: boolean }>`
  padding-right: ${(props): string => (props.absolute ? '' : '11px !important')};
  & > * {
    opacity: ${(props): string => (props.loading ? '0.2' : '1')};
    transition: all 0.25s ease-in-out;
  }
`;
