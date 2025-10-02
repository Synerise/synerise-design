import styled from 'styled-components';

import Tag, { type TagShape } from '@synerise/ds-tag';

export const Container = styled.div`
  display: flex;
  margin-bottom: 24px;
  max-width: 100%;
`;

export const TagOverflow = styled.div`
  display: flex;
  height: 32px;
  align-items: center;
  max-width: 100%;
  min-width: 0;
  flex: 0 1 auto;
`;

export const LimitedTag = styled(Tag)`
  flex: 0 0 auto;
`;

export const TagsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  min-width: 0;
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
  min-width: 0;
  && .ds-tag {
    margin: 4px;
  }
`;
