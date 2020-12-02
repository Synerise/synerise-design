import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const TextTrigger = styled.div<{ inactiveColor: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .ds-title {
    margin: 0;
  }
  .ds-title,
  svg {
    color: ${(props): string => props.inactiveColor};
    fill: ${(props): string => props.inactiveColor};
  }

  &:hover {
    .ds-title,
    svg {
      color: ${(props): string => props.theme.palette['blue-600']};
      fill: ${(props): string => props.theme.palette['blue-600']};
    }
  }
`;
