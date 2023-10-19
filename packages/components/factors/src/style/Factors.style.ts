import styled from 'styled-components';
import { InputGroup } from '@synerise/ds-input';
import { OuterWrapper } from '@synerise/ds-input/dist/Input.styles';
import { FactorInput } from '../FactorValue/FactorValue.style';

// eslint-disable-next-line import/prefer-default-export
export const Group = styled(InputGroup)<{ withoutTypeSelector: boolean }>`
  &&& {
    display: flex;
    ${OuterWrapper} {
      margin: 0;
    }
    ${FactorInput} {
      width: auto;
      > * {
        border-radius: ${(props): string => (props.withoutTypeSelector ? '3px' : '0 3px 3px 0')};
      }
    }
  }
`;
