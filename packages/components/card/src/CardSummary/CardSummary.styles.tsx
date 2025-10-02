import styled from 'styled-components';

import DSIcon from '@synerise/ds-icon';
import { Tag } from '@synerise/ds-tag/dist/Tag.styles';
import { Text, Title, macro } from '@synerise/ds-typography';

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
  min-height: 32px;
`;

export const CardSummaryItemDetails = styled.div`
  &:before {
    content: '•';
  }
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const CardSummaryItemLabelValueWrapper = styled.span`
  align-self: center;
  word-break: break-all;
  display: flex;
  align-items: center;
`;

export const CardSummaryItemLabel = styled(Text)`
  line-height: 24px;
  margin-right: 4px;
`;

export const CardSummaryItemValue = styled.span`
  ${macro.h200}
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const IconWrapper = styled.div``;

export const Icon = styled(DSIcon)<{ isOpen: boolean }>`
  transform: rotate(${(props) => (props.isOpen ? '180' : '0')}deg);
`;
export const CardSummaryItemObjects = styled.div`
  --cols: 4;
  --gap: 8px;

  display: flex;
  flex-wrap: wrap;
  gap: 0 var(--gap);
  margin: 8px 0 8px 16px;
`;
export const CardSummaryItemObject = styled.div`
  flex-basis: calc(
    100% / var(--cols) - var(--gap) / var(--cols) * (var(--cols) - 1)
  );
  min-width: 0;
  ${Tag} {
    margin-left: 0;
  }
`;
