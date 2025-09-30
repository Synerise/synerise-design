import styled from 'styled-components';

import { type DividerType } from '../Divider.types';

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
  width: ${(props) => (props.type === 'horizontal' ? '100%' : '1px')};
  height: ${(props) => (props.type === 'vertical' ? '0.9em' : '1px')};
  color: ${(props) =>
    props.dashed
      ? props.theme.palette['grey-400']
      : props.theme.palette['grey-300']};
`;
