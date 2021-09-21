import * as React from 'react';
import * as Highcharts from 'highcharts';
import { HighchartsChart, HighchartsProvider, SankeySeries, Tooltip, XAxis, YAxis } from 'react-jsx-highcharts';
import Sankey from 'highcharts/modules/sankey';
import { merge } from 'lodash';

import { SeriesClickEventObject } from 'highcharts';
import { SankeyChartDrilldown } from './SankeyChartDrilldown';
import { Defs } from './SankeyChartDefs';
import { defaultChartConfig } from './DefaultChartConfig';
import { SankeyChartSteps } from './SankeyChartSteps';
import { ChartStyles } from './SankeyChart.styles';
import { getNodeXCoords } from './SankeyChartHelpers';
import { ChartType, SankeyChartProps, SankeyChartState } from './SankeyChart.types';
import { DEFAULT_EXPORTING_OPTIONS } from '../common/chartsConfig';

Sankey(Highcharts);

class SankeyChart extends React.PureComponent<SankeyChartProps, SankeyChartState> {
  chart: undefined | ChartType;

  state: SankeyChartState = {
    nodeXCoords: null,
    isModalVisible: false,
    nodeEventObject: null,
  };

  getChart = (chart: ChartType): void => {
    this.chart = chart;
  };

  handleAfterSankeyInit = (): void => {
    const { nodeColumns } = (this.chart as ChartType).series[0];
    const nodeXCoords = getNodeXCoords(nodeColumns);
    this.setState({ nodeXCoords });
  };

  handleShowModal = (e: SeriesClickEventObject): void => {
    const { onClick } = this.props;
    this.setState({
      isModalVisible: true,
      nodeEventObject: e,
    });

    onClick(e);
  };

  handleModalAppearence = (flag: boolean): void => {
    this.setState({ isModalVisible: flag });
  };

  render(): JSX.Element {
    const { isModalDisabled, chartData, series, isOpenInCRMDisabled, openInCRM } = this.props;
    const { nodeXCoords, isModalVisible, nodeEventObject } = this.state;
    const tooltipConfig = merge(defaultChartConfig.tooltip, chartData.tooltip);
    const plotOptionsConfig = merge(defaultChartConfig.plotOptions, chartData.plotOptions);

    const { isDrillDownDisabled, drillDown } = this.props;
    return (
      <HighchartsProvider Highcharts={Highcharts}>
        <ChartStyles>
          <SankeyChartSteps nodeXCoords={nodeXCoords} />
          <Defs />
          <HighchartsChart
            /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
            // @ts-ignore
            plotOptions={plotOptionsConfig}
            /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
            // @ts-ignore
            callback={this.getChart}
            exporting={DEFAULT_EXPORTING_OPTIONS}
          >
            <Tooltip {...tooltipConfig} />
            <XAxis {...chartData.xAxis} />
            <YAxis>
              <SankeySeries
                data={series.data}
                name={chartData.name}
                keys={series.keys}
                onAfterRender={this.handleAfterSankeyInit}
                onClick={this.handleShowModal}
              />
            </YAxis>
          </HighchartsChart>
          {isModalVisible && !isModalDisabled && (
            <SankeyChartDrilldown
              visible={isModalVisible}
              /* eslint-disable-next-line react/jsx-handler-names */
              setVisible={this.handleModalAppearence}
              eventObj={nodeEventObject}
              isDrillDownDisabled={isDrillDownDisabled}
              drillDown={drillDown}
              isOpenInCRMDisabled={isOpenInCRMDisabled}
              openInCRM={openInCRM}
            />
          )}
        </ChartStyles>
      </HighchartsProvider>
    );
  }
}

export default SankeyChart;
