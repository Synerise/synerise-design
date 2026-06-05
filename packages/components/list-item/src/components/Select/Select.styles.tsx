import styled from 'styled-components';

import Text from '../Text/Text';
import { SuffixWrapper } from '../Text/Text.styles';

export const SelectItem = styled(Text)`
  & {
    ${SuffixWrapper} > * {
      opacity: 0;
      transition:
        opacity 0.3s ease-in-out,
        color 0.3s ease-in-out;
    }
  }
  &:hover,
  &:focus {
    ${SuffixWrapper} > * {
      opacity: 1;
      color: var(--ds-list-item-role-normal-text-hover);
    }
  }
`;
