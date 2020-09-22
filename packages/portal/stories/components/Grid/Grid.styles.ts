import styled from 'styled-components';

export const FixedGrid = styled.div<{visible: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 24px;
  display: ${(props): string => props.visible ? 'block' : 'none'};
  z-index: -1;
`;

export const Item = styled.div`
  width: 100%;
  position: relative;
  height: 100vh;
  background-color: ${(props): string => props.theme.palette['grey-200']};
  opacity: 0.3;
`;

export const GridItem = styled.div`
  background-color: transparent;
  z-index: 1;
  border: 1px dashed ${(props): string => props.theme.palette.black};
  padding: 8px 0 8px 8px;
  * {
    font-size: 10px;
  }
   &&& {
    .ds-description-label {
      margin-right: 2px;
    }
   }
`;
