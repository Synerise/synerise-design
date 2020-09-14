import styled from 'styled-components';

export const FixedGrid = styled.div<{visible: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 24px;
  display: ${(props): string => props.visible ? 'block' : 'none'};
`;

export const Item = styled.div`
  width: 100%;
  position: relative;
  height: 100vh;
  background-color: ${(props): string => props.theme.palette['blue-600']};
  opacity: 0.1;
`;
