import styled from 'styled-components';

import { type ThemePropsVars } from '@synerise/ds-core';

import { type DividerType } from '../Divider.types';

const getDashed = (dashed: boolean, theme: ThemePropsVars) => {
  if (dashed) {
    return `1px dashed ${theme.palette['grey-400']};`;
  }
  return `1px solid ${theme.palette['grey-300']}`;
};

export const Line = styled.div<{
  marginTop?: number;
  marginBottom?: number;
  type?: DividerType;
  dashed?: boolean;
}>`
  display: ${(props) => (props.type === 'vertical' ? 'inline-block' : 'flex')};
  vertical-align: ${(props) =>
    props.type === 'vertical' ? 'middle' : undefined};
  margin: ${(props) => (props.type === 'vertical' ? '0 8px' : '0')};
  margin-bottom: ${(props) => props.marginBottom}px;
  margin-top: ${(props) => props.marginTop}px;
  width: ${(props) => (props.type === 'horizontal' ? '100%' : '0')};
  height: ${(props) => (props.type === 'vertical' ? '0.9em' : '0')};
  ${(props) =>
    props.type === 'horizontal' &&
    `border-bottom: ${getDashed(props.dashed!, props.theme)}`};
  ${(props) =>
    props.type === 'vertical' &&
    `border-left: ${getDashed(props.dashed!, props.theme)}`};
`;
