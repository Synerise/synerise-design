import styled, { css } from 'styled-components';

import Icon, { type StyledIcon } from '@synerise/ds-icon';

export const Handler = styled.div<{ isHorizontal: boolean }>`
  display: flex;
  align-items: center;
  ${(props) =>
    props.isHorizontal
      ? css`
          width: 100%;
          height: 16px;
          justify-content: center;
        `
      : css`
          height: 100%;
          width: 16px;
        `}
  flex-grow: 1;
  z-index: 5;
  background-color: ${(props) => props.theme.palette['grey-200']};

  &:hover {
    ${(props) =>
      props.isHorizontal
        ? css`
            cursor: ns-resize;
          `
        : css`
            cursor: ew-resize;
          `}
    background-color: ${(props) => props.theme.palette['blue-100']};
  }
`;

export const HandlerIcon: StyledIcon<{ isHorizontal?: boolean }> = styled(
  Icon,
)<{ isHorizontal?: boolean }>`
  svg {
    fill: ${(props) => props.theme.palette['grey-600']};

    ${(props) =>
      props.isHorizontal &&
      css`
        -webkit-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        transform: rotate(90deg);
      `}
  }

  &:hover {
    color: ${(props) => props.theme.palette['blue-600']};
  }
`;
