import styled from 'styled-components';
import BaseAnimateHeight from 'react-animate-height';
import { Title, Text } from '@synerise/ds-typography';
import DSIcon from '@synerise/ds-icon';

import { Tag } from '@synerise/ds-tag/dist/Tag.styles';

export const AnimateHeight = styled(BaseAnimateHeight)<{ isOpen: boolean; duration: number }>`
  margin-top: ${props => (props.isOpen ? '0' : '-8px')};
  transition: margin ${props => props.duration}ms;
`;
export const CardSummaryWrapper = styled.div``;
export const CardSummaryTitle = styled(Title)``;
export const CardSummaryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const CardSummaryItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const CardSummaryItemDetails = styled.div`
  &:before {
    content: '•';
    margin-right: 8px;
  }
  display: flex;
  gap: 4px;
  line-height: 24px;
`;
export const CardSummaryItemLabel = styled(Text)`
  line-height: 24px;
`;
export const CardSummaryItemValue = styled(Text)`
  line-height: 24px;
  font-weight: 500;
`;

export const Icon = styled(DSIcon)<{ isOpen: boolean }>`
  transform: rotate(${props => (props.isOpen ? '180' : '0')}deg);
`;
export const CardSummaryItemObjects = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 16px;
`;
export const CardSummaryItemObject = styled.div`
  flex-basis: 25%;
  min-width: 0;
  ${Tag} {
    margin-left: 0;
  }
`;
