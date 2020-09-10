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
