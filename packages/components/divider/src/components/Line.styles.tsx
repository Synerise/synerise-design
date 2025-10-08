import styled from 'styled-components';

import { type DividerType } from '../Divider.types';

export const Line = styled.div<{
  marginTop?: number;
  marginBottom?: number;
  withSideMargin?: boolean;
  type?: DividerType;
  dashed?: boolean;
}>`
  display: ${(props) => (props.type === 'vertical' ? 'inline-block' : 'block')};
  vertical-align: ${(props) =>
    props.type === 'vertical' ? 'middle' : undefined};
  ${(props) =>
    props.type === 'vertical'
      ? `
        margin: 0 8px;
      `
      : `
      margin: 0 ${props.withSideMargin ? '12px' : '0px'};
      `}
  margin-bottom: ${(props) => props.marginBottom || 0}px;
  margin-top: ${(props) => props.marginTop || 0}px;
  width: ${(props) => (props.type === 'horizontal' ? 'auto' : '1px')};
  height: ${(props) => (props.type === 'vertical' ? '0.9em' : '1px')};
  overflow: hidden;
  color: ${(props) =>
    props.dashed
      ? props.theme.palette['grey-400']
      : props.theme.palette['grey-300']};
`;
