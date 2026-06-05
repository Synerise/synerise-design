import styled from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';

import Text from '../Text/Text';
import { Inner, PrefixWrapper, Wrapper } from '../Text/Text.styles';

export const DangerItem = styled(Text)`
  &&& {
    ${Inner} {
      color: var(--ds-list-item-role-delete-text-default);
      ${Wrapper} {
        color: var(--ds-list-item-role-delete-text-default);
      }
      ${PrefixWrapper} {
        color: var(--ds-list-item-role-delete-icon-default);
      }
      &:hover {
        ${(props) =>
          !props.disabled &&
          `
            ${PrefixWrapper} > ${IconContainer} {
              color: var(--ds-list-item-role-delete-icon-hover);
            }
            background: var(--ds-list-item-role-delete-bg-hover);
        `}
      }
      &:focus-visible {
        ${(props) =>
          !props.disabled &&
          `
            ${PrefixWrapper} > ${IconContainer} {
              color: var(--ds-list-item-role-delete-icon-focused);
            }
            background: var(--ds-list-item-role-delete-bg-focused) !important;
        `}
      }
      &:focus-visible:active {
        ${(props) =>
          !props.disabled &&
          `
            background: var(--ds-list-item-role-delete-bg-active) !important;
        `}
      }
    }
  }
`;
