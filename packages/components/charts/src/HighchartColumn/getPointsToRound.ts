import { NullishPointData, missingIndexes } from './highchartsRoundedCorners';

const SecondSeriesContainsSameValueIndexAsFirst = (
  secondSeries: NullishPointData[],
  firstSeriesPoint: NullishPointData
): boolean => secondSeries && secondSeries.filter(p => p.valueIndex === firstSeriesPoint.valueIndex).length > 0;

const pointShouldBeRounded = ({
  nullishPointsConfig,
  idx,
  pointCandidate,
}: {
  nullishPointsConfig: { [key: number]: NullishPointData[] };
  idx: number;
  pointCandidate: NullishPointData;
}): boolean => {
  return (
    !nullishPointsConfig[idx + 1] ||
    (nullishPointsConfig[idx + 1] &&
      !nullishPointsConfig[idx + 1].map(p => p.valueIndex).includes(pointCandidate.valueIndex))
  );
};

const getNextCandidate = (
  nullishPointsConfig: { [key: number]: NullishPointData[] },
  pointCandidate: NullishPointData
): NullishPointData => {
  let dynamicColorIndex = 2;

  // eslint-disable-next-line no-restricted-syntax
  for (const index of Object.keys(nullishPointsConfig)) {
    const idx = Number(index);

    if (
      idx > dynamicColorIndex &&
      nullishPointsConfig[idx] &&
      nullishPointsConfig[pointCandidate.colorIndex + dynamicColorIndex]
        .map(p => p.valueIndex)
        .includes(pointCandidate.valueIndex)
    ) {
      dynamicColorIndex += 1;
    }
  }

  return nullishPointsConfig[pointCandidate.colorIndex + 1] &&
    nullishPointsConfig[pointCandidate.colorIndex + 1].map(p => p.valueIndex).includes(pointCandidate.valueIndex)
    ? {
        ...pointCandidate,
        colorIndex: Math.min(pointCandidate.colorIndex + dynamicColorIndex, missingIndexes[0] || Infinity),
      }
    : { ...pointCandidate, colorIndex: pointCandidate.colorIndex + 1 };
};

export const getPointsToRound = (nullishPointsConfig: { [key: number]: NullishPointData[] }): NullishPointData[] => {
  const secondSeriesColorIndex = 1;

  return nullishPointsConfig[0].map((firstSeriesPoint: NullishPointData) => {
    // indexes > 1, check required to find specific point to round
    if (SecondSeriesContainsSameValueIndexAsFirst(nullishPointsConfig[1], firstSeriesPoint)) {
      const candidates: NullishPointData[] = [];
      // initial candidate is copy of point from 1 series with colorIndex + 1
      let pointCandidate = { ...firstSeriesPoint, colorIndex: secondSeriesColorIndex };

      // eslint-disable-next-line no-restricted-syntax
      for (const index of Object.keys(nullishPointsConfig)) {
        const idx = Number(index);

        // missingIndexes[0] - lowest series index where all points y != 0; points from indexes above dont need rounding
        if (idx > 0 && idx < missingIndexes[0] && nullishPointsConfig[idx]) {
          pointCandidate = {
            ...pointCandidate,
            colorIndex: idx + 1,
          };

          // add candidate if no such index key in config
          // or if config has greater index data where all valueIndexes differs from pointCandidate.valueIndex
          if (pointShouldBeRounded({ nullishPointsConfig, pointCandidate, idx })) {
            candidates.push(pointCandidate);
          }
        }
      }

      // if no candidates[0] -> return point with adjusted colorIndex
      return candidates[0] || getNextCandidate(nullishPointsConfig, pointCandidate);
    }
    return { ...firstSeriesPoint, colorIndex: secondSeriesColorIndex };
  });
};
