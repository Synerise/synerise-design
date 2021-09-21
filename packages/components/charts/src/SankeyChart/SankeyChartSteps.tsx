import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import Loader from '@synerise/ds-loader';
import { SankeyStepsWrapper, Step, DottedLine } from './SankeyChart.styles';

type Props = {
  nodeXCoords: number[] | null;
};

const StepWithDottedLine = (nodeXCoords: number[], i: number): React.ReactNode => {
  if (i === nodeXCoords.length - 1) {
    return (
      <React.Fragment key={nodeXCoords[i]}>
        <DottedLine width={nodeXCoords[i] - nodeXCoords[i - 1]} />
        <Step>
          <FormattedMessage id="SNRS.SANKEY_CHART.STEP" /> {i}
        </Step>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment key={nodeXCoords[i]}>
      <DottedLine width={nodeXCoords[i + 1] - nodeXCoords[i]} />
      <Step>
        <FormattedMessage id="SNRS.SANKEY_CHART.STEP" /> {i}
      </Step>
    </React.Fragment>
  );
};

// eslint-disable-next-line import/prefer-default-export
export const SankeyChartSteps: React.FC<Props> = ({ nodeXCoords }) => {
  return (
    <SankeyStepsWrapper>
      {nodeXCoords ? (
        nodeXCoords.map((x, i) => {
          if (i === 0) {
            return (
              <Step key={x}>
                <FormattedMessage id="SNRS.SANKEY_CHART.START" />
              </Step>
            );
          }
          return StepWithDottedLine(nodeXCoords, i);
        })
      ) : (
        <Loader />
      )}
    </SankeyStepsWrapper>
  );
};
