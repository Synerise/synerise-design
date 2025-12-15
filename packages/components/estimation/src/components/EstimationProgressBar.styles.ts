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
export const EstimationProgressBarLegendItem = styled.div<{ dotColor: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  &:before {
    content: '';
    width: 10px;
    height: 10px;
    background: ${(props) => props.dotColor};
    border-radius: 0.5em;
    border: solid 2px ${(props) => props.theme.palette['white']};
  }
`;
