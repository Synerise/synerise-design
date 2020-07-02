import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div``;

export const ClearIconWrapper = styled.div`
  .ds-icon svg {
    fill: ${(props): string => props.theme.palette['red-600']};
  }
  &&:hover {
    .ds-icon svg {
      fill: ${(props): string => props.theme.palette['red-600']};
    }
  }
`;
