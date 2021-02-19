import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const TextTrigger = styled.div<{ inactiveColor: string; onFocus?: () => void }>`
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
  &&&:focus {
      .ds-title,
      svg {
        color: ${(props): string => props.theme.palette['blue-700']};
        fill: ${(props): string => props.theme.palette['blue-700']};
      }
    }
  }

  &:hover {
    .ds-title,
    svg {
      color: ${(props): string => props.theme.palette['blue-600']};
      fill: ${(props): string => props.theme.palette['blue-600']};
    }
  }
`;
