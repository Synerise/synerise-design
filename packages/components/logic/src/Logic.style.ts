import styled from 'styled-components';

export const Logic = styled.div<{ readOnly?: boolean }>`
  user-select: none;
  position: relative;
  .ds-title {
    cursor: pointer;

    ${({ readOnly, theme }): string =>
      !readOnly
        ? `&:after {
      position: absolute;
      bottom: -2px;
      width: 100%;
      content: '';
      height: 1px;
      left: 1px;
      background-image: linear-gradient(
        to right,
        ${theme.palette['grey-600']} 25%,
        ${theme.palette.white} 0%
      );
      background-position: top;
      background-size: 4px 1px;
      background-repeat: repeat-x;
    }`
        : ''}
  }

  ${({ readOnly, theme }): string =>
    !readOnly
      ? ` &:hover {
    .ds-title {
      color: ${theme.palette['blue-700']};
      &:after {
        background-image: linear-gradient(
          to right,
          ${theme.palette['blue-700']} 25%,
          ${theme.palette.white} 0%
        );
      }
    }
  }`
      : ''}
`;
