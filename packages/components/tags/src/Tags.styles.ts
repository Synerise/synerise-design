import styled from 'styled-components';

import { type TagShape } from '@synerise/ds-tag';

export const Container = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

export const TagOverflow = styled.div`
  display: flex;
  height: 32px;
  align-items: center;
`;

export const TagsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Title = styled.div<{ shape?: TagShape }>`
  color: ${(props): string => props.theme.palette['grey-800']};
  font-weight: 500;
  display: block;
  margin: 6px 4px 0 0;
`;

export const SelectedTags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  && .ds-tag {
    margin: 4px;
  }
`;
