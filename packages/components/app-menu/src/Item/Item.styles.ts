import styled from 'styled-components';

export const ItemLink = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  padding: 8px;
  margin: 12px 0;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;

  .item__icon--active {
    opacity: 0;
  }
  .item__icon--in-active {
    opacity: 1;
  }

  &:hover,
  &.menu__item--active {
    .item__icon--active {
      opacity: 1;
    }
    .item__icon--in-active {
      opacity: 0;
    }
  }

  &:hover {
    background: ${(props): string => props.theme.palette['grey-050']};
  }

  > a {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;

export const ItemWrapper = styled.li`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  height: 64px;

  &:first-child {
    ${ItemLink} {
      margin-top: 8px;
    }
  }
`;

export default ItemWrapper;
