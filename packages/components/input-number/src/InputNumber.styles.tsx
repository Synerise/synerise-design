import BaseAntInputNumber, {
  type InputNumberProps,
} from 'antd/lib/input-number';
import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';
import { type AutoResizeProp } from '@synerise/ds-input';
import { autoresizeConfObjToCss } from '@synerise/ds-input/dist/Input.styles';

export const InputNumberContainer = styled.div<{ autoResize?: AutoResizeProp }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;

  &&& .ant-input-number-input {
    padding: ${(props) => (props.autoResize ? '0' : '6px 11px')};
  }
`;

export const InputNumberAutosize = styled.div<{ autoResize?: AutoResizeProp }>`
  &&& .ant-input-number {
    width: ${(props) => (props.autoResize ? '100%' : '200px')};
    ${(props) => autoresizeConfObjToCss({ ...props, boxSizing: 'border-box' })};
    grid-area: 1 / 1;
  }

  input {
    text-indent: 4px;
  }
  input.ant-input-number-input {
    letter-spacing: normal;
    font-feature-settings: 'tnum' 0;
    font-variant-numeric: proportional-nums;
  }
`;

const NumberOnlyBaseAntInputNumber = forwardRef<
  HTMLInputElement,
  InputNumberProps<number>
>((props: InputNumberProps<number>, ref) => (
  <BaseAntInputNumber<number> {...props} ref={ref} />
));

export const AntdInputNumber = styled(NumberOnlyBaseAntInputNumber)`
  color: ${(props) => props.theme.palette['grey-700']};

  input,
  input:focus {
    ${(props: { error: boolean } & ThemeProps) =>
      !!props.error &&
      `
      background: ${props.theme.palette['red-050']};
      border: 0;
    `};
  }

  .ant-input-number-group-addon {
    background-color: ${(props: ThemeProps) => props.theme.palette['grey-050']};
    padding: 0 12px;
  }
`;

export const Prefixel = styled.div`
  border: 1px solid ${(props: ThemeProps) => props.theme.palette['grey-300']};
  border-radius: 3px 0 0 3px;
  border-right-width: 0;
`;

export const Suffixel = styled.div`
  border: 1px solid ${(props: ThemeProps) => props.theme.palette['grey-300']};
  border-radius: 0 3px 3px 0;
  border-left-width: 0;
`;

export const InputNumberWrapper = styled.div``;
