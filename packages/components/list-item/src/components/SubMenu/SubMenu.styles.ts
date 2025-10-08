import styled from 'styled-components';

export const SubMenuContainer = styled.div<{
  isOpen?: boolean;
}>`
  max-height: ${(props) => (props.isOpen ? '999' : '0')}px;
  overflow: hidden;
  transition: max-height 0.3s ease;
`;
export const SubMenuList = styled.div``;
