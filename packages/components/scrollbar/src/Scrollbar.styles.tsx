import styled from 'styled-components';

export const ScrollbarContent = styled.div<{ absolute: boolean }>`
  .simplebar-content-wrapper {
    padding-right: ${(props): string => (props.absolute ? '0 !important' : '')};
  }
`;

export const Scrollbar = styled.div``;
