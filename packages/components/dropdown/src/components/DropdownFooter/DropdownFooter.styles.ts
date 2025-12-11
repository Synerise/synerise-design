import styled from 'styled-components';

export const DropdownFooterWrapper = styled.div<{ split?: boolean }>`
  background: ${(props) => props.theme.palette['grey-100']};
  height: 48px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.split ? 'space-between' : 'flex-end')};
`;
export const DropdownFooterLeft = styled.div``;
export const DropdownFooterRight = styled.div``;
