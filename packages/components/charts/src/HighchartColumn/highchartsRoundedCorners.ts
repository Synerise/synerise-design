import { getPointsToRound } from './getPointsToRound';

export type NullishPointData = {
  colorIndex: number;
  valueIndex: number;
};

type Point = {
  colorIndex: number;
  category: string;
  id: string;
  options: {
    y: number;
    valueIndex: number;
  };
};

let nullishPoints: NullishPointData[][] = [];
let pointsToRound: NullishPointData[] = [];
export let missingIndexes: number[] = [];

const pointNeedsRounding = (point: Point, pointsToRound: NullishPointData[]) => {
  return (
    pointsToRound.filter(p => p && p.colorIndex === point.colorIndex && p.valueIndex === point.options.valueIndex)
      .length > 0
  );
};

const getDataFromNullishPoints = (points: Point[]) => {
  return points.reduce<NullishPointData[]>(
    (acc, p) => (p.options.y === 0 ? [...acc, { colorIndex: p.colorIndex, valueIndex: p.options.valueIndex }] : acc),
    []
  );
};

const createConfigFromNullishPoints = (nullishPoints: NullishPointData[][]) =>
  nullishPoints.reduce<{ [key: number]: NullishPointData[] }>((res, pointsArr, i) => {
    if (pointsArr.length === 0) {
      missingIndexes.push(i);
      return res;
    }

    return { ...res, [i]: pointsArr };
  }, {});

function roundedCorners(H: any) {
  let rel = H.relativeLength;

  H.wrap(H.seriesTypes.column.prototype, 'translate', function(proceed: any) {
    // @ts-ignore
    const self = this;
    proceed.call(self);

    const {
      borderRadiusTopLeft,
      borderRadiusTopRight,
      borderRadiusBottomRight,
      borderRadiusBottomLeft,
      topMargin = 0,
      bottomMargin = 0,
    } = self.options;

    const nullishPointsData = getDataFromNullishPoints(self.points);
    nullishPoints.push(nullishPointsData);
    const nullishPointsConfig = createConfigFromNullishPoints(nullishPoints);

    // if config contains data with index 0 -> some custom logic for rounding specific points needed
    if (nullishPointsConfig[0]) {
      pointsToRound = getPointsToRound(nullishPointsConfig);
    }

    const roundPointCorners = (point: any) => {
      const roundBoolean = pointsToRound.length > 0 && pointNeedsRounding(point, pointsToRound);
      let { width: w, height: h, x, y } = point.shapeArgs;
      let rTopLeft = rel(borderRadiusTopLeft || roundBoolean ? self.yAxis.series[0].options.borderRadiusTopLeft : 0, w);
      let rTopRight = rel(
        borderRadiusTopRight || roundBoolean ? self.yAxis.series[0].options.borderRadiusTopRight : 0,
        w
      );
      let rBottomRight = rel(borderRadiusBottomRight || 0, w);
      let rBottomLeft = rel(borderRadiusBottomLeft || 0, w);

      if (rTopLeft || rTopRight || rBottomRight || rBottomLeft || roundBoolean) {
        let maxR = Math.min(w, h) / 2;

        if (rTopLeft > maxR) {
          rTopLeft = maxR;
        }

        if (rTopRight > maxR) {
          rTopRight = maxR;
        }

        if (rBottomRight > maxR) {
          rBottomRight = maxR;
        }

        if (rBottomLeft > maxR) {
          rBottomLeft = maxR;
        }

        // Preserve the box for data labels
        point.dlBox = point.shapeArgs;
        point.shapeType = 'path';
        point.shapeArgs = {
          d: [
            'M',
            x + rTopLeft,
            y + topMargin,
            // top side
            'L',
            x + w - rTopRight,
            y + topMargin,
            // top right corner
            'C',
            x + w - rTopRight / 2,
            y,
            x + w,
            y + rTopRight / 2,
            x + w,
            y + rTopRight,
            // right side
            'L',
            x + w,
            y + h - rBottomRight,
            // bottom right corner
            'C',
            x + w,
            y + h - rBottomRight / 2,
            x + w - rBottomRight / 2,
            y + h,
            x + w - rBottomRight,
            y + h + bottomMargin,
            // bottom side
            'L',
            x + rBottomLeft,
            y + h + bottomMargin,
            // bottom left corner
            'C',
            x + rBottomLeft / 2,
            y + h,
            x,
            y + h - rBottomLeft / 2,
            x,
            y + h - rBottomLeft,
            // left side
            'L',
            x,
            y + rTopLeft,
            // top left corner
            'C',
            x,
            y + rTopLeft / 2,
            x + rTopLeft / 2,
            y,
            x + rTopLeft,
            y,
            'Z',
          ],
        };
      }
    };

    self.points.forEach(roundPointCorners);
  });
}

export default roundedCorners;
