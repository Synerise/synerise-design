import styled, { css } from 'styled-components';

export const PanelsResizerContainer = styled.div<{ isHorizontal: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isHorizontal ? 'column' : 'row')};

  ${(props) =>
    props.isHorizontal
      ? css`
          width: -webkit-fill-available;
        `
      : css`
          flex: 1;
          height: -webkit-fill-available;
        `}

  overflow: hidden;
`;
