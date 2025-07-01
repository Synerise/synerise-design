import AntdRadio from 'antd/lib/radio';
import React from 'react';
import styled, { type SimpleInterpolation, css } from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';
import { macro } from '@synerise/ds-typography/';

export const RadioWrapper = styled.div`
  & {
    display: block;
    margin-bottom: 15px;
  }
`;

export const Description = styled.div<{ disabled?: boolean }>`
  color: ${(props: ThemeProps): string => props.theme.palette['grey-600']};
  ${(props): string => (props.disabled ? `opacity: 0.4;` : '')}
  ${macro.small}
`;

// @deprecated - all styles are now defined in Description
export const AdditionalData = styled.div`
  margin: 4px 8px 15px 28px;
`;

export const AntRadio = styled(({ ...rest }) => <AntdRadio {...rest} />)`
  .ant-radio {
    height: 16px;
    top: 0;
  }
  .ant-radio + span {
    flex-grow: 1;
  }
`;

export const AntRadioGroup = styled(AntdRadio.Group)<{
  fullWidth?: boolean;
  big?: boolean;
}>`
  ${(props): SimpleInterpolation =>
    props.fullWidth &&
    css`
      && {
        display: flex;
        width: 100%;
        label {
          flex: 1;
          height: ${props.big ? '48px' : '32px'};
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
        }
      }
    `}
`;
