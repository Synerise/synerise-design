import { SankeyChartBody } from './SankeyChart.types';
import { formatLabel, nodeTooltipFormatter, ribbonTooltipFormatter } from './SankeyChartHelpers';

const defaultNodeTooltipConfig = {
  header: {
    title: 'Title',
    value: 0,
    percent: 0,
  },
  from: {
    translation: 'From',
    value: [],
  },
  to: {
    translation: 'To',
    value: [],
  },
};

const defaultRibbonTooltipConfig = {
  header: {
    title: 'Flow value',
    value: 0,
    percent: 0,
  },
  from: {
    translation: 'From',
    value: [],
  },
  to: {
    translation: 'To',
    value: [],
  },
  chartKeys: [],
};

const defaultNodeLabelConfig = {
  label: 'Label title',
  weightPercent: 100,
  drilldown: {
    name: 'segment',
    value: 'value',
  },
};

const plotOptionsDataLabels = {
  className: 'sankey-node',
  inside: true,
  nodeFormatter: (node: SankeyChartBody): string => {
    return formatLabel(node, defaultNodeLabelConfig);
  },
  padding: 0,
  useHTML: true,
  verticalAlign: 'bottom',
};

const plotOptionsSankeyConfig = {
  borderRadius: 3,
  clip: false,
  colors: ['#13bab4', '#dc23da', '#ffba00', '#05c00e'],
  cursor: 'pointer',
  curveFactor: 0.25,
  dataLabels: plotOptionsDataLabels,
  linkOpacity: 0.3,
  nodeWidth: 120,
  tooltip: {
    headerFormat: null,
    nodeFormatter: (): string => {
      return nodeTooltipFormatter(defaultNodeTooltipConfig);
    },
    pointFormatter: (): string => {
      return ribbonTooltipFormatter(defaultRibbonTooltipConfig);
    },
    useHTML: true,
  },
};

const plotOptionsSeriesConfig = {
  className: 'sankey-series',
  clip: false,
};

// eslint-disable-next-line import/prefer-default-export
export const defaultChartConfig = {
  id: 'sankey',
  name: 'sankey',
  plotOptions: {
    sankey: plotOptionsSankeyConfig,
    series: plotOptionsSeriesConfig,
  },
  tooltip: {
    borderWidth: 0,
    borderRadius: 4,
    padding: 0,
    shadow: false,
    useHTML: true,
    hideDelay: 200,
    distance: 16,
  },
};
