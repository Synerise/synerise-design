import styled from 'styled-components';

export const BackToTopWrapper = styled.div<{ $visible?: boolean }>`
  display: ${(props) => (props.$visible ? 'flex' : 'none')};
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 2;

  &&&& > .ds-table-back-to-top-button {
    transform: none;
  }
`;
