import styled from 'styled-components';
import { Input } from '@synerise/ds-input';

// eslint-disable-next-line import/prefer-default-export
export const SearchInput = styled(Input)`
  &&:not(:hover) {
    border: 1px solid transparent;
    border-bottom: 1px solid ${(props): string => props.theme.palette['grey-100']};
  }

  &&:focus {
    border: 1px solid ${(props): string => props.theme.palette['blue-600']};
    box-shadow: inset 0 0 0 1px ${(props): string => props.theme.palette['blue-600']};
  }

  && {
    padding: 25px 20px;
    border-radius: 0;
    background-color: ${(props): string => props.theme.palette['grey-050']};
  }
`;
