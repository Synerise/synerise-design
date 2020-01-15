import styled, { keyframes } from 'styled-components';

const bottom = keyframes`
  from {
    top: 0px;
  }

  to {
    top: -48px;
  }
`;

const top = keyframes`
  from {
    top: 0px;
  }

  to {
    top: 48px;
  }
`;

export const Wrapper = styled.ul`
  margin: 0;
  padding: 0;
  flex: 1 1 auto;
  overflow: hidden;

  &.animation--bottom {
    > *:not(.nav-button) {
      position: relative;
      animation: ${bottom} 0.1s ease-in-out forwards;
    }
  }

  &.animation--top {
    > *:not(.nav-button) {
      position: relative;
      animation: ${top} 0.1s ease-in-out forwards;
    }
  }
`;

export default Wrapper;
