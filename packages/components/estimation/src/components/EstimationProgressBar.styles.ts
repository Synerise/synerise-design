import styled from 'styled-components';

import { Multivalue } from '@synerise/ds-progress-bar';

export const EstimationProgressBar = styled(Multivalue)`
  height: auto;
  padding: 0;
  margin: 14px 0 8px;
`;
export const EstimationProgressBarLegend = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 4px;
`;
