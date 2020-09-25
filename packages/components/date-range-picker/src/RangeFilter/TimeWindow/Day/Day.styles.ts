import styled from 'styled-components';

export const DeleteIcon = styled.div`
  display: inline-block;
  cursor: pointer;
  border-radius: 50%;
  background: ${props => props.theme.variable('@red-color')};
  color: #fff;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  border: 2px solid #fff;
  z-index: 1000;
  .icon {
    display: block;
    margin: 0 !important;
  }
`;

export const Container = styled.div`
  position: relative;
  &:not(:hover) {
    ${DeleteIcon} {
      display: none;
    }
  }
`;
export const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 45px;
  margin-left: -8px;
`;
export const IconWrapper = styled.div<{ active: boolean }>`
  position: absolute;
  top: 3px;
  right: 3px;
  &&& .ds-icon svg {
    fill: ${(props): string =>
      props.active ? props.theme.palette['red-600'] : props.theme.palette['green-600']} !important;
  }
`;
