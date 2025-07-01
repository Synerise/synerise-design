import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  height: 24px;
  width: 24px;
  color: ${(props) => props.theme.palette['grey-600']};

  .item__icon {
    position: absolute;
    transition: opacity 0.3s ease-in-out;
  }
`;

export default Wrapper;
