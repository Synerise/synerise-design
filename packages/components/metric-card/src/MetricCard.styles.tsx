import styled, { css } from 'styled-components';

import Copy from '@synerise/ds-copy-icon';
import InlineAlert from '@synerise/ds-inline-alert';
import Panel from '@synerise/ds-panel';
import Skeleton from '@synerise/ds-skeleton';
import { Text } from '@synerise/ds-typography';

export const WrapperFormattedNumber = styled.div`
  display: inline;
`;

export const WrapperNumber = styled.div`
  display: none;
`;

export const MetricContainer = styled(Panel)`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
`;
export const CopyIcon = styled(Copy)`
  margin-left: 8px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s ease;
`;

export const MetricSkeleton = styled(Skeleton)`
  padding: 0 0 2px;
  width: 50%;
`;

export const MetricInlineAlert = styled(InlineAlert)`
  padding: 8px 0 2px;
`;

export const MetricContent = styled.div<{ copyable?: boolean }>`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 0 4px 2px 0;
  ${CopyIcon} {
    ${(props) => {
      return (
        props.copyable &&
        css`
          cursor: pointer;
        `
      );
    }}
  }
  &.hovered {
    ${CopyIcon} {
      visibility: visible;
      opacity: 1;
    }
    ${WrapperFormattedNumber} {
      display: none;
    }
    ${WrapperNumber} {
      display: inline;
    }
  }
`;
export const MetricValue = styled(Text)`
  color: ${(props): string => props.theme.palette['grey-800']};
  font-size: 32px;
  line-height: 100%;
  padding-bottom: 2px;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  justify-content: start;
`;

export const MetricHeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleWrapper = styled.div<{ header?: boolean }>`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  min-height: 32px;
`;

export const IconWrapper = styled.span`
  display: inline-block;
  color: ${(props): string => props.theme.palette['grey-400']};
  cursor: pointer;
`;

export const HeaderRightSide = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

export const WrapperCopyIcon = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;
