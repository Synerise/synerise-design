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
  &:hover {
    color: ${(props): string => props.theme.palette[`blue-700`]};
  }
`;
