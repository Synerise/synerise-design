import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const RemoveIconWrapper = styled.div<{ isHovered: boolean }>`
  opacity: ${(props): number => (props.isHovered ? 1 : 0)};
  transition: opacity 0.3s ease;

  .ds-icon {
    svg {
      fill: ${({ theme }): string => theme.palette['red-600']};
    }
  }
`;
