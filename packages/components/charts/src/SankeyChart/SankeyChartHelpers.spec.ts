import { formatLabel, getNodeXCoords, nodeTooltipFormatter, ribbonTooltipFormatter } from './SankeyChartHelpers';

const RegularLabelSankeyBody = {
  color: '#fff',
  key: 'page visit wow',
  point: { shapeArgs: { height: 100 } },
};

const smallHeightLabelSankeyBody = {
  color: '#fff',
  key: 'coca cola',
  point: { shapeArgs: { height: 10 } },
};

const labelContent = { label: 'label', weightPercent: 33, drilldown: { name: 'name', value: 'Android' } };

const labelContentWithoutDrilldown = { label: 'label', weightPercent: 33 };

const nodeColumns1 = [{ 0: { nodeX: 0 } }, { 0: { nodeX: 50 } }, { 0: { nodeX: 100 } }, { 0: { nodeX: 150 } }];

const nodeColumns2 = [{ 0: { nodeX: -50 } }, { 0: { nodeX: 200 } }, { 0: { nodeX: 1000 } }, { 0: { nodeX: 70000 } }];

const nodeTooltipData = {
  header: { title: 'Title', value: 50, percent: 50 },
  from: {
    translation: 'from',
    value: [{ title: 'Custom', value: 30, percent: 100, color: '#efcfce' }],
  },
  to: {
    translation: 'to',
    value: [{ title: 'Custom', value: 30, percent: 100, color: '#efcfce' }],
  },
};

const ribbonTooltipData = {
  header: { title: 'Ribbon', percent: 78 },
  from: {
    translation: 'from',
    value: [{ title: 'Ribbon', percent: 155, color: '#fcc444' }],
  },
  to: {
    translation: 'to',
    value: [{ title: 'Ribbon', percent: 165, color: '#efcfce' }],
  },
};

describe('formatLabel', () => {
  it('Return proper html string when height is more than 32px with drilldown text', () => {
    const newNode = document.createElement('div');
    newNode.innerHTML = formatLabel(RegularLabelSankeyBody as never, labelContent);
    const wrapperDiv = newNode.querySelector('div') as Element;
    const drilldownSpan = newNode.querySelector('.sankey-node-label-drilldown');
    const weightPercentSpan = newNode.querySelector('.sankey-node-label-percent') as Element;
    const labelSpan = newNode.querySelector('.sankey-node-label-name') as Element;

    expect(wrapperDiv.getAttribute('id')).toBe('page-visit-wow-node');
    expect(wrapperDiv.getAttribute('style')).toBe(
      `pointer-events:none;height:100px;min-height:16px;top:-89px;border-right:3px solid #fff;`
    );
    expect(drilldownSpan).toBeTruthy();
    expect(weightPercentSpan.innerHTML).toBe('33%');
    expect(labelSpan.innerHTML).toBe('label');
  });

  it('Return proper html string when height is more than 32px without drilldown text', () => {
    const newNode = document.createElement('div');
    newNode.innerHTML = formatLabel(smallHeightLabelSankeyBody as never, labelContentWithoutDrilldown);
    const wrapperDiv = newNode.querySelector('div') as Element;
    const drilldownSpan = newNode.querySelector('.sankey-node-label-drilldown');
    const weightPercentSpan = newNode.querySelector('.sankey-node-label-percent') as Element;
    const labelSpan = newNode.querySelector('.sankey-node-label-name') as Element;

    expect(wrapperDiv.getAttribute('id')).toBe('coca-cola-node');
    expect(wrapperDiv.getAttribute('style')).toBe(
      'pointer-events:none;height:10px;min-height:16px;;border-right:3px solid #fff;padding:1px 1px 1px 10px;flex-direction:row;align-items:center;justify-content:flex-start;'
    );
    expect(drilldownSpan).toBeFalsy();
    expect(weightPercentSpan.innerHTML).toBe('33%');
    expect(labelSpan.innerHTML).toBe('label');
  });
});

describe('getNodeXCoords', () => {
  it('returns proper values', () => {
    expect(getNodeXCoords(nodeColumns1 as never)).toEqual([0, -70, -140, -210]);
    expect(getNodeXCoords(nodeColumns2 as never)).toEqual([-50, 80, 760, 69640]);
  });
});

describe('nodeTooltipFormatter', () => {
  it('Return proper html string', () => {
    const newNode = document.createElement('div');
    newNode.innerHTML = nodeTooltipFormatter(nodeTooltipData);
    const HeaderTitleFirstChild = newNode.querySelector('.sankey-tooltip-header > span:first-child') as Element;
    const HeaderTitleLastChild = newNode.querySelector('.sankey-tooltip-header > span:last-child') as Element;
    const ContentDescDot = newNode.querySelector('.sankey-tooltip-item-desc > span:first-child') as Element;
    const ContentDesc = newNode.querySelector('.sankey-tooltip-item-desc > span:last-child') as Element;
    const StatsCount = newNode.querySelector('.sankey-tooltip-item-stats > span:first-child') as Element;
    const StatsPercent = newNode.querySelector('.sankey-tooltip-item-stats > span:last-child') as Element;

    expect(HeaderTitleFirstChild.innerHTML).toBe('Title');
    expect(HeaderTitleLastChild.innerHTML).toContain('50%');
    expect(ContentDescDot.getAttribute('style')).toContain('color: #efcfce; font-size: 16px;');
    expect(ContentDesc.innerHTML).toBe('Custom');
    expect(StatsCount.innerHTML).toBe('30');
    expect(StatsPercent.innerHTML).toBe('100%');
  });
});

describe('ribbonTooltipFormatter', () => {
  it('Return proper html string', () => {
    const newNode = document.createElement('div');
    newNode.innerHTML = ribbonTooltipFormatter(ribbonTooltipData);
    const HeaderTitleFirstChild = newNode.querySelector('.sankey-tooltip-header > span:first-child') as Element;
    const HeaderTitleLastChild = newNode.querySelector('.sankey-tooltip-header > span:last-child') as Element;
    const ContentDescDot = newNode.querySelector('.sankey-tooltip-item-desc > span:first-child') as Element;
    const ContentDesc = newNode.querySelector('.sankey-tooltip-item-desc > span:last-child') as Element;
    const StatsPercent = newNode.querySelector('.sankey-tooltip-item-stats > span:last-child') as Element;

    expect(HeaderTitleFirstChild.innerHTML).toBe('Ribbon');
    expect(HeaderTitleLastChild.innerHTML).toContain('78%');
    expect(ContentDescDot.getAttribute('style')).toContain('color: #fcc444; font-size: 16px;');
    expect(ContentDesc.innerHTML).toBe('Ribbon');
    expect(StatsPercent.innerHTML).toBe('155%');
  });
});
