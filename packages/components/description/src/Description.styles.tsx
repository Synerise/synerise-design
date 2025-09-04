import styled, {
  type FlattenSimpleInterpolation,
  css,
} from 'styled-components';

import {
  type DescriptionRatio,
  type DescriptionType,
} from './Description.types';
import {
  PrefixWrapper,
  RowLabel,
  RowValue,
  RowWrapper,
  SuffixWrapper,
  ValueWrapper,
} from './Row/DescriptionRow.styles';

const getColumnsWidth = (
  ratio: DescriptionRatio | null = null,
): string | false => {
  const mapRatioToWidth = {
    '25-75': '25% 75%',
    '50-50': '50% 50%',
    auto: 'auto auto',
  };
  return ratio !== null && mapRatioToWidth[ratio]
    ? mapRatioToWidth[ratio]
    : '1fr auto';
};

const tableStyles = (
  ratio?: DescriptionRatio,
): FlattenSimpleInterpolation => css`
  ${RowWrapper} {
    display: grid;
    grid-column-gap: 16px;
    grid-template-columns: ${getColumnsWidth(ratio)};
  }
`;

const inlineStyles = (): FlattenSimpleInterpolation => css`
  ${RowWrapper} {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    ${RowLabel} {
      margin-right: 8px;
    }
    ${RowValue} {
      display: -webkit-box;
      flex: 1;
      overflow-x: visible;
    }
  }
`;
const cornerStyles = (): FlattenSimpleInterpolation => css`
  ${RowWrapper} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Description = styled.div<{
  type: DescriptionType;
  ratio?: DescriptionRatio;
  singleRow: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  ${PrefixWrapper},
  ${SuffixWrapper},
  ${ValueWrapper},
  ${RowLabel} {
    padding: ${(props): string => (props.singleRow ? '0' : '7px 0')};
  }
  ${(props) => {
    switch (props.type) {
      case 'table': {
        return tableStyles(props.ratio);
      }
      case 'inline': {
        return inlineStyles();
      }
      case 'corner': {
        return cornerStyles();
      }
      default:
        return inlineStyles();
    }
  }}
`;
