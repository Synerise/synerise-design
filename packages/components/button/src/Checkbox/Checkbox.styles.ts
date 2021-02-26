import styled from 'styled-components';

export const IconWrapper = styled.span<{ active?: boolean; error?: boolean }>`
  &&&& svg {
    fill: ${({ theme, active, error }): string => {
      if (error) {
        return theme.palette['red-600'];
      }

      return active ? theme.palette['blue-600'] : theme.palette['grey-300'];
    }};
  }

  .ant-btn-ghost[disabled] & .ds-icon svg {
    fill: ${({ theme }): string => theme.palette['grey-200']} !important;
  }

  /* disabled icon background */
  .ant-btn-ghost[disabled] &::before {
    content: '';
    display: 'block';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    margin: 5px;
    z-index: -1;
    background: ${({ theme }): string => theme.palette['grey-050']};
  }
`;

export default { IconWrapper };
