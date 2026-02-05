import styled from 'styled-components';

import { Creator } from '@synerise/ds-button';
import { ButtonLabel } from '@synerise/ds-button/dist/Button.styles';
import { type StyledContentItem } from '@synerise/ds-manageable-list';
import DSContentItem from '@synerise/ds-manageable-list/dist/Item/ContentItem/ContentItem';

export const ContentItem: StyledContentItem = styled(DSContentItem)`
  margin-bottom: 0;
`;

export const BadgeWrapper = styled.div`
  margin-right: 16px;
  margin-bottom: -2px;
`;

export const Title = styled.h3`
  font-size: 16px;
  line-height: 1.39;
  color: ${(props): string => props.theme.palette['grey-800']};
  margin-bottom: 1em;
`;

export const SuffixText = styled.span`
  color: ${(props): string => props.theme.palette['blue-600']};
  font-weight: 500;
  margin-right: 16px;
`;
export const CreatorButton = styled(Creator)`
  ${ButtonLabel} {
    justify-content: flex-start;
  }
`;
export const Container = styled.div`
  padding: 16px 24px 24px;
`;
