import styled from 'styled-components';

export const WrapperPageHeaderBack = styled.div`
  margin-right: 49px;
  display: flex;
  align-items: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 1px;
    height: 40px;
    right: -25px;
    background-color: ${(props): string => props.theme.palette['grey-300']};
  }

  && {
    button {
      display: flex;
      align-items: center;
      padding: 0 4px;
    }
  }
`;
