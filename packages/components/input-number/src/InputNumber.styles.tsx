import React, { forwardRef } from 'react';
import styled from 'styled-components';
import BaseAntInputNumber, { InputNumberProps } from 'antd/lib/input-number';
import { ThemeProps } from '@synerise/ds-core';

export const InputNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
`;

const NumberOnlyBaseAntInputNumber = forwardRef<HTMLInputElement, InputNumberProps<number>>(
  (props: InputNumberProps<number>, ref) => <BaseAntInputNumber<number> {...props} ref={ref} />
);

export const AntdInputNumber = styled(NumberOnlyBaseAntInputNumber)`
  color: ${props => props.theme.palette['grey-700']};

  input,
  input:focus {
    ${(props: { error: boolean } & ThemeProps) =>
      !!props.error &&
      `
      background: ${props.theme.palette['red-050']};
      border: 0;
    `};
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

export const InputNumberWrapper = styled.div<{ prefixel: boolean; suffixel: boolean }>`
  display: flex;
  align-items: center;

  ${Prefixel}, ${Suffixel} {
    background: ${(props: ThemeProps) => props.theme.palette['grey-050']};
    display: flex;
    align-items: center;
    align-self: stretch;
    padding: 0 12px;
  }

  ${props =>
    props.prefixel &&
    `
    ${AntdInputNumber} {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  `}

  ${props =>
    props.suffixel &&
    `
    ${AntdInputNumber} {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  `}
`;
