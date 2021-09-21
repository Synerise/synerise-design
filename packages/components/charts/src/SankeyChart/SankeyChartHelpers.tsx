import { nodeLabelArgs, Node, SankeyTooltip, SankeyObj, SankeyChartBody, LabelContent } from './SankeyChart.types';

export const nodeLabelClasses = [
  'sankey-node-label',
  'sankey-node-label-name',
  'sankey-node-label-percent',
  'sankey-node-label-drilldown',
];

const minHeightStyle = `padding:1px 1px 1px 10px;flex-direction:row;align-items:center;justify-content:flex-start;`;
const minHeight = 'min-height:16px;';
const MIN_HEIGHT = 65;

export const formatNodeLabel = ({ id, height, top, color, label, weightPercent, drilldown }: nodeLabelArgs): string => {
  return `
  <div
    id="${id}-node"
    class="sankey-node-label" 
    style="pointer-events:none;height:${height}px;${minHeight}${
    height > 11 ? `top:-${top}px` : ''
  };border-right:3px solid ${color};${height < MIN_HEIGHT ? `${minHeightStyle}` : ''}"
  >
    <span class="sankey-node-label-name">${label}</span>
    ${drilldown && height > MIN_HEIGHT ? `<span class="sankey-node-label-drilldown">${drilldown.value}</span>` : ''}
    <span class="sankey-node-label-percent">${weightPercent}%</span>
  </div>
  `;
};

export function formatLabel(sankeyBody: SankeyChartBody, labelContent: LabelContent): string {
  const { label, weightPercent, drilldown } = labelContent;
  const { color } = sankeyBody;
  const { height } = sankeyBody.point.shapeArgs;
  const top = height - 11;
  const id = sankeyBody.key.replace(/ /g, '-');
  return formatNodeLabel({ id, height, top, color, label, weightPercent, drilldown });
}

export const getNodeXCoords = (nodeColumns: Node[]): number[] => {
  return nodeColumns.map((node: Node, i: number) => {
    const { nodeX } = node[0];
    return nodeX === 0 ? nodeX : nodeX - i * 120;
  });
};

const tooltipHeaderFormatter = (config: SankeyObj): string => `
  <div class="sankey-tooltip-header">
    <span>${config.title}</span>
    <span>
      ${config.value} <span class="bold">${config.percent}%</span>
    </span>
  </div>
`;

const tooltipContentFormatter = (config: SankeyObj, isNode = false): string => `
  <div class="sankey-tooltip-item">
    <div class="sankey-tooltip-item-desc">
      <span style="color: ${config.color}; font-size: 16px;">\u25CF</span> 
      <span>${config.title}</span>
    </div>
    <div class="sankey-tooltip-item-stats">
      ${isNode && config.value ? `<span>${config.value}</span>` : ''}
      <span>${config.percent}%</span>
    </div>
  </div>
  ${config.drilldown ? `<span class="drilldown">${config.drilldown.value || ''}</span>` : ''}
`;

const renderChartKeysData = (tooltipData: SankeyTooltip): string => `
  ${
    tooltipData.chartKeys && tooltipData.chartKeys.length > 0
      ? `
        <div class="sankey-tooltip-chartKeys">
          ${tooltipData.chartKeys
            .map(
              key => `
            <div class="sankey-tooltip-chartKeys-item">
              <span>${key.title}</span>
              <span>${key.value}</span>
            </div>
          `
            )
            .join('')}
        </div>`
      : ''
  }
`;

const renderFromData = (tooltipData: SankeyTooltip, isNode?: boolean): string => `
  ${
    tooltipData.from.value.length > 0
      ? `
        <div class="sankey-tooltip-block">
          <span>${tooltipData.from.translation.toUpperCase()}</span>
          ${tooltipData.from.value.map(fromConfig => tooltipContentFormatter(fromConfig, isNode)).join('')}
        </div>`
      : ''
  }
`;

const renderToData = (tooltipData: SankeyTooltip, isNode?: boolean): string => `
  ${
    tooltipData.to.value.length > 0
      ? `
        <div class="sankey-tooltip-block">
          <span>${tooltipData.to.translation.toUpperCase()}</span>
          ${tooltipData.to.value.map(toConfig => tooltipContentFormatter(toConfig, isNode)).join('')}
        </div>`
      : ''
  }
`;

export const nodeTooltipFormatter = (tooltipData: SankeyTooltip): string => {
  const { from, to, header } = tooltipData;

  return `
        <div class="sankey-tooltip">
          ${tooltipHeaderFormatter(header)}
          <div class="sankey-tooltip-content">
        ${
          header.drilldown
            ? `<div class="sankey-tooltip-block">
            <span style="display: block; color: #000">${header.drilldown.name}</span>
            <span class="drilldown-name">${header.drilldown.value}</span>
            </div>`
            : ''
        }
            ${renderFromData(tooltipData, true)}
            ${from.value.length > 0 && to.value.length > 0 ? '<div class="sankey-tooltip-separator"></div>' : ''}
            ${renderToData(tooltipData, true)}
          </div>
        </div>
      `;
};

export const ribbonTooltipFormatter = (tooltipData: SankeyTooltip): string => {
  const { chartKeys, header } = tooltipData;

  return `
        <div class="sankey-tooltip">
          ${tooltipHeaderFormatter(header)}
          <div class="sankey-tooltip-content">
            ${renderFromData(tooltipData)}
            ${renderToData(tooltipData)}
            ${chartKeys && chartKeys.length > 0 ? '<div class="sankey-tooltip-separator"></div>' : ''}
            ${renderChartKeysData(tooltipData)}
          </div>
        </div>
      `;
};
