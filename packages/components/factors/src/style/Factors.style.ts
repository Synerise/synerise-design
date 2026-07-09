import styled from 'styled-components';

import { InputGroup } from '@synerise/ds-input';
import { OuterWrapper } from '@synerise/ds-input/dist/Input.styles';
import { InputGroupItem } from '@synerise/ds-input/dist/InputGroup.styles';

import { FactorInput } from '../FactorValue/FactorValue.style';

export const Group = styled(InputGroup)<{ withoutTypeSelector: boolean }>`
  &&& {
    display: flex;

    /* styled(InputGroup) applies this class to the InputGroupWrapper itself, so
       the group items are its direct children — target them straight from &&&
       (there is no nested InputGroupWrapper to reach through). */
    .ds-input-group-item-0 {
      ${(props): string => (props.withoutTypeSelector ? '' : 'flex: 0 0 auto')}
    }

    .ds-input-group-item-1 {
      .ant-btn {
        border-radius: 0 3px 3px 0;
      }
    }

    &.ds-factors-parameter,
    &.ds-factors-contextParameter,
    &.ds-factors-formula {
      ${InputGroupItem} {
        &.ds-input-group-item-1 {
          flex-grow: 0;
        }
      }
    }
    &.ds-factors-text,
    &.ds-factors-array {
      ${InputGroupItem} {
        &.ds-input-group-item-1 {
          min-width: 0;
        }
      }
    }

    ${OuterWrapper} {
      margin: 0;
    }
    ${FactorInput} {
      > * {
        border-radius: ${(props): string =>
          props.withoutTypeSelector ? '3px' : '0 3px 3px 0'};
      }
    }
  }
`;
