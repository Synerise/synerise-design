import * as React from 'react';
import { Box } from '@rebass/grid';

import HighchartsLine from '../HighchartsLine/HighchartsLine';
import * as S from '../SimpleColumnChart/SimpleColumnChart.styles';
import { SimpleChartProps } from '../SimpleAreaChart/SimpleAreaChart.types';

const SimpleLineChart: React.FC<SimpleChartProps> = ({
  chartItemHeight = '150px',
  chartItemMaxWidth = '600px',
  chartItemMinWidth = '400px',
  chartItemWidth = '400px',
  chartData,
  contentMaxHeight,
  getHighchartsChart,
  strokeStyles,
  spacing,
  showBorder,
  title,
  titleProps,
  wrapperStyles,
}) => {
  return (
    <S.Wrapper
      chartItemHeight={chartItemHeight}
      chartItemMinWidth={chartItemMinWidth}
      chartItemMaxWidth={chartItemMaxWidth}
      chartItemWidth={chartItemWidth}
      showBorder={showBorder}
      style={wrapperStyles}
    >
      <S.Content maxHeight={contentMaxHeight} spacing={spacing}>
        {title && <Box {...(titleProps || {})}>{title}</Box>}
        <HighchartsLine chartData={chartData} getHighchartsChart={getHighchartsChart} strokeStyles={strokeStyles} />
      </S.Content>
    </S.Wrapper>
  );
};

export default SimpleLineChart;
