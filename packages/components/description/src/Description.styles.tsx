import styled, { FlattenSimpleInterpolation, css } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { RowLabel, RowWrapper } from './Row/DescriptionRow.styles';
import { DescriptionRatio, DescriptionType } from './Description';

const getColumnsWidth = (ratio: DescriptionRatio | null = null): string | false => {
  const mapRatioToWidth = {
    '20-80': '2fr 8fr',
    '30-70': '3fr 7fr',
    '40-60': '4fr 6fr',
    '50-50': '5fr 5fr',
    '60-40': '6fr 4fr',
    '70-30': '7fr 3fr',
    '80-20': '8fr 2fr',
    auto: 'auto auto',
  };
  return ratio !== null && mapRatioToWidth[ratio] ? mapRatioToWidth[ratio] : '1fr auto';
};

// eslint-disable-next-line import/prefer-default-export
export const Description = styled.div<{ type: DescriptionType; ratio?: DescriptionRatio }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  ${RowWrapper} {
    ${(props: ThemeProps & { type: DescriptionType; ratio?: DescriptionRatio }): FlattenSimpleInterpolation | false => {
      return props.type === 'table'
        ? css`
            display: grid;
            grid-column-gap: 16px;
            grid-template-columns: ${getColumnsWidth(props.ratio)};
          `
        : css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            ${RowLabel} {
              margin-right: 8px;
            }
          `;
    }}
  }
`;
