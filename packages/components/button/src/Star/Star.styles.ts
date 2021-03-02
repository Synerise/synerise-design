import styled from 'styled-components';

export const IconWrapper = styled.span<{ active?: boolean; error?: boolean }>`
  &&&& svg {
    fill: ${({ theme, active, error }): string => {
      if (error) {
        return theme.palette['red-600'];
      }

      return active ? theme.palette['yellow-600'] : theme.palette['grey-300'];
    }};
  }

  .ant-btn-ghost[disabled] & .ds-icon svg {
    fill: ${({ theme }): string => theme.palette['grey-200']} !important;
  }

  /* disabled icon background - clipping with star shape */
  .ant-btn-ghost[disabled] &::before {
    clip-path: path(
      'M 19.606 9.598 l -4.794 -0.686 l -2.141 -4.276 a 0.781 0.781 0 0 0 -1.342 0 L 9.187 8.912 l -4.793 0.686 a 0.75 0.75 0 0 0 -0.414 1.284 l 3.462 3.325 l -0.817 4.691 a 0.751 0.751 0 0 0 0.74 0.88 a 0.742 0.742 0 0 0 0.344 -0.085 L 12 17.472 l 4.29 2.221 a 0.75 0.75 0 0 0 1.084 -0.795 l -0.816 -4.691 l 3.462 -3.325 a 0.75 0.75 0 0 0 -0.414 -1.284 z z'
    );
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    margin: 0;
    z-index: -1;
    background: ${({ theme }): string => theme.palette['grey-050']};
  }
`;

export default { IconWrapper };
