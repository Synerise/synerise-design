import styled from 'styled-components';

import { Tag } from '@synerise/ds-tag/dist/Tag.styles';

export const TagIcon = styled.div<{ isDisabled?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  ${(props) => props.isDisabled && 'opacity: var(--ds-opacity-disabled);'}
  ${Tag} {
    margin-right: 4px;
  }
`;
