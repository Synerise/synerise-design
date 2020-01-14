import styled from 'styled-components';

export const ItemWrapper = styled.li`
  padding: 0;
  margin: 0;
`;

export const ItemLink = styled.div`
  padding: 8px;
  margin: 12px 0;
  cursor: pointer;
  filter: grayscale(100%);
  opacity: 0.6;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;

  &:hover,
  &.menu__item--active {
    opacity: 1;
    filter: grayscale(0%);
  }

  &:hover {
    background: ${(props): string => props.theme.palette['grey-050']};
  }
`;

export default ItemWrapper;
