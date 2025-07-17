import styled from 'styled-components';

export const FirstButtonWrapper = styled.div`
  margin-right: 8px;
`;
export const NumberWrapper = styled.div`
  margin-left: 4px;
  color: ${(props) => props.theme.palette['grey-400']};
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(
      to right,
      ${(props) => props.theme.palette['grey-400']} 20%,
      rgba(255, 255, 255, 0) 10%
    );
    background-color: transparent;
    background-position: bottom left;
    background-size: 5px 1px;
    background-repeat: repeat-x;
    color: ${(props) => props.theme.palette['grey-700']};
  }
`;

export const ButtonsWrapper = styled.div`
  padding: 16px 0 0 0;
  display: flex;
`;

export const IconOrderWrapper = styled.div`
  display: none;
  margin: -4px 0;
  svg {
    fill: ${(props) => props.theme.palette['grey-700']};
  }
  &:hover {
    svg {
      fill: ${(props) => props.theme.palette['blue-600']};
      cursor: pointer;
    }
  }
`;
export const OrderWrapper = styled.div`
  display: flex;
  &:hover {
    ${IconOrderWrapper} {
      display: block;
    }
    ${NumberWrapper} {
      background-image: linear-gradient(
        to right,
        ${(props) => props.theme.palette['grey-400']} 20%,
        rgba(255, 255, 255, 0) 10%
      );
      background-color: transparent;
      background-position: bottom left;
      background-size: 5px 1px;
      background-repeat: repeat-x;
      color: ${(props) => props.theme.palette['grey-700']};
    }
  }
`;
export const Wrapper = styled.div`
  margin-top: 10px;
  color: ${(props) => props.theme.palette['grey-700']};
`;
