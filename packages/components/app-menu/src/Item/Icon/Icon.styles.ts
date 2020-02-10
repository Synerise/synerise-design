import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  height: 24px;
  width: 24px;

  .item__icon {
    position: absolute;
    transition: opacity 0.3s ease-in-out;
  }
`;

export default Wrapper;
