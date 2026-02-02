import styled, { css } from 'styled-components';

import Divider from '@synerise/ds-divider';
import Panel from '@synerise/ds-panel';
import DSSkeleton from '@synerise/ds-skeleton';
import { Title } from '@synerise/ds-typography';

const splitStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Skeleton = styled(DSSkeleton)<{ $width?: number }>`
  padding: 0;
  width: ${(props) => props.$width || '100'}px;
`;

export const EstimationDivider = styled(Divider)`
  margin: 8px 0;
`;
export const EstimationTitle = styled(Title)`
  margin: 0;
`;
export const EstimationWrapper = styled.div<{ isLoading?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const Bold = styled.span`
  font-weight: 500;
`;
export const EstimationContent = styled(Panel)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const EstimationHead = styled.div`
  ${splitStyles}
`;
export const EstimationBody = styled.div``;
export const EstimationFooter = styled.div`
  ${splitStyles}
`;
export const EstimationCalculated = styled.div``;
export const EstimationCalculatedDate = styled(Title)`
  margin: 0;
  display: inline;
`;
export const EstimationLeftSide = styled.div``;
export const EstimationRightSide = styled.div`
  display: flex;
  gap: 8px;
`;
