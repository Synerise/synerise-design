import styled from 'styled-components';
import { Tag } from '@synerise/ds-tag/dist/Tag.styles';

// eslint-disable-next-line import/prefer-default-export
export const TagIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  ${Tag} {
    margin-right: 4px;
  }
`;
