import * as React from 'react';
import { SimpleColumnChart } from '../SimpleColumnChart';
import { colors } from '../common/ChartStyles.styles';
import * as S from './ComparisionColumnChart.styles';
import { Props } from './ComparisionColumnChart.types';

const ComparisionColumnChart: React.FC<Props> = ({
  data,
  chartItemHeight,
  chartItemWidth,
  spacing,
  chartItemMinWidth,
}) => {
  const [inactiveSeries, setInactiveSeries] = React.useState<number[]>([]);
  const dataExists = data && data.length;
  return (
    <S.Wrapper>
      <S.ChartWrapper>
        {dataExists &&
          data.map((item, i) => {
            return (
              <SimpleColumnChart
                key={i}
                chartItemHeight={chartItemHeight}
                chartItemWidth={chartItemWidth}
                items={item}
                showBorder={false}
                inactiveSeries={inactiveSeries}
                title={item.meta && item.meta.title}
                chartItemMinWidth={chartItemMinWidth}
                spacing={spacing}
              />
            );
          })}
      </S.ChartWrapper>
      <S.ChartLegend>
        {dataExists &&
          data[0].data.map((item, i) => {
            const currentInactiveSeries = [...inactiveSeries];
            const exists = (currentInactiveSeries as number[]).includes(i);
            const newInactiveSeries = !exists
              ? [...currentInactiveSeries, i]
              : currentInactiveSeries.filter(el => el !== i);
            const setActiveSerie = (): void => {
              setInactiveSeries(newInactiveSeries);
            };
            return (
              <S.LegendItem onClick={setActiveSerie} inactive={exists} key={i}>
                <S.LegendColor color={colors[i]} inactive={exists} />
                <S.LegendText>{item.name}</S.LegendText>
              </S.LegendItem>
            );
          })}
      </S.ChartLegend>
    </S.Wrapper>
  );
};

export default ComparisionColumnChart;
