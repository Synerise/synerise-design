import styled from 'styled-components';

export const MatchingWrapper = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
  color: ${(props): string => props.theme.palette['grey-800']};
  text-align: left;
  user-select: none;
  &:first-letter {
    text-transform: uppercase;
  }
`;

export const Toggle = styled.span<{ matching: boolean }>`
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
  color: ${(props): string => props.theme.palette[`blue-600`]};
  transition: color 0.1s ease-in-out;
  position: relative;
  display: inline-flex;
  &:after {
    position: absolute;
    bottom: -2px;
    width: 100%;
    content: '';
    height: 1px;
    left: 1px;
    background-image: linear-gradient(
      to right,
      ${(props): string => props.theme.palette['blue-600']} 25%,
      ${(props): string => props.theme.palette.white} 0%
    );
    background-position: top;
    background-size: 4px 1px;
    background-repeat: repeat-x;
  }
  &:hover {
    color: ${(props): string => props.theme.palette[`blue-700`]};
    &:after {
      background-image: linear-gradient(
        to right,
        ${(props): string => props.theme.palette['blue-700']} 25%,
        ${(props): string => props.theme.palette.white} 0%
      );
    }
  }
`;
