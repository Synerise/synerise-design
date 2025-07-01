import styled, {
  type FlattenSimpleInterpolation,
  css,
} from 'styled-components';

import { type ThemeProps, type ThemePropsVars } from '@synerise/ds-core';

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
    '20-80': '2fr 8fr',
    '30-70': '3fr 7fr',
    '40-60': '4fr 6fr',
    '50-50': '5fr 5fr',
    '60-40': '6fr 4fr',
    '70-30': '7fr 3fr',
    '80-20': '8fr 2fr',
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

const dottedListStyles = (
  theme: ThemePropsVars,
): FlattenSimpleInterpolation => css`
  ${inlineStyles()};
  ${RowWrapper} {
    ${RowLabel} {
      display: none;
    }
    &::before {
      position: relative;
      width: 14px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      content: '·';
      color: ${theme.palette['grey-600']};
      margin-right: 8px;
    }
  }
`;
const numberedListStyles = (
  theme: ThemePropsVars,
): FlattenSimpleInterpolation => css`
  ${inlineStyles()};
  counter-reset: count-description-rows;
  ${RowWrapper} {
    ${RowLabel} {
      display: none;
    }
    counter-increment: count-description-rows;
    &::before {
      position: relative;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      content: counter(count-description-rows, decimal-leading-zero) ':';
      color: ${theme.palette['grey-600']};
      margin-right: 8px;
    }
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
  ${(
    props: ThemeProps & { type: DescriptionType; ratio?: DescriptionRatio },
  ): FlattenSimpleInterpolation | false => {
    switch (props.type) {
      case 'table': {
        return tableStyles(props.ratio);
      }
      case 'inline': {
        return inlineStyles();
      }
      case 'dotted-list': {
        return dottedListStyles(props.theme);
      }
      case 'numbered-list': {
        return numberedListStyles(props.theme);
      }
      default:
        return false;
    }
  }}
`;
