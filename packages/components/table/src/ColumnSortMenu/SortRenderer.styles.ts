import styled from 'styled-components';

export const ClearItemWrapper = styled.div`
  &&&&:hover .ds-menu-item {
    border-radius: 3px;
    background-color: ${({ theme }): string => theme.palette['red-050']};
  }

  &&&&:hover .ds-menu-item .ds-menu-content {
    color: ${({ theme }): string => theme.palette['red-600']};
  }

  &&&& .ds-menu-item .ds-menu-content-wrapper .ds-menu-prefix svg {
    fill: ${({ theme }): string => theme.palette['grey-600']};
  }

  &&&&:hover .ds-menu-item .ds-menu-content-wrapper .ds-menu-prefix span svg {
    fill: ${({ theme }): string => theme.palette['red-600']} !important;
  }
`;

export default { ClearItemWrapper };
