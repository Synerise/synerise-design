import styled from 'styled-components';
import { Title, Text, macro } from '@synerise/ds-typography';
import DSIcon from '@synerise/ds-icon';

import { Tag } from '@synerise/ds-tag/dist/Tag.styles';

export const CardSummaryWrapper = styled.div``;
export const CardSummaryTitle = styled(Title)``;
export const CardSummaryList = styled.div``;
export const CardSummaryItemWrapper = styled.div``;

export const ValueButtonWrapper = styled.div`
  align-self: flex-start;
`;

export const CardSummaryItemDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CardSummaryItemDetails = styled.div`
  &:before {
    content: '•';
    margin-right: 8px;
  }
  display: flex;
  gap: 4px;
  line-height: 24px;
  padding: 4px 0;
`;

export const CardSummaryItemLabelValueWrapper = styled.span`
  align-self: center;
  word-break: break-all;
`;

export const CardSummaryItemLabel = styled(Text)`
  line-height: 24px;
  margin-right: 4px;
`;

export const CardSummaryItemValue = styled.span`
  ${macro.h200}
  line-height: 24px;
`;

export const IconWrapper = styled.div`
  display: inline-block;
  height: 24px;
`;

export const Icon = styled(DSIcon)<{ isOpen: boolean }>`
  transform: rotate(${props => (props.isOpen ? '180' : '0')}deg);
`;
export const CardSummaryItemObjects = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 16px;
  margin-top: 8px;
`;
export const CardSummaryItemObject = styled.div`
  flex-basis: 25%;
  min-width: 0;
  ${Tag} {
    margin-left: 0;
  }
`;
