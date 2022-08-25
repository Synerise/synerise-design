import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Logic = styled.div`
  user-select: none;
  position: relative;
  .ds-title {
    cursor: pointer;
    &:after {
      position: absolute;
      bottom: -2px;
      width: 100%;
      content: '';
      height: 1px;
      left: 1px;
      background-image: linear-gradient(
        to right,
        ${(props): string => props.theme.palette['grey-600']} 25%,
        ${(props): string => props.theme.palette.white} 0%
      );
      background-position: top;
      background-size: 4px 1px;
      background-repeat: repeat-x;
    }
  }
  &:hover {
    .ds-title {
      color: ${(props): string => props.theme.palette['blue-700']};
      &:after {
        background-image: linear-gradient(
          to right,
          ${(props): string => props.theme.palette['blue-700']} 25%,
          ${(props): string => props.theme.palette.white} 0%
        );
      }
    }
  }
`;
