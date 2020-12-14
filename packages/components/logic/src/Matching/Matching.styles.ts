import styled from 'styled-components';

const getColor = (matching: boolean): string => (matching ? 'green' : 'red');

export const MatchingWrapper = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
  color: ${(props): string => props.theme.palette['grey-800']};
  display: inline-block;
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
  color: ${(props): string => props.theme.palette[`${getColor(props.matching)}-600`]};
  transition: color 0.1s ease-in-out;
  &:hover {
    color: ${(props): string => props.theme.palette[`${getColor(props.matching)}-700`]};
  }
`;
