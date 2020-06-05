import * as React from 'react';
import Alert from 'antd/lib/alert';
import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { Props } from './Alert';

const DEFAULT_ALERT_TYPE = 'info';

export const AntdAlert = styled(({ type, mode, color, ...rest }: Props) => (
  <Alert {...rest} type={type !== 'custom' ? type : DEFAULT_ALERT_TYPE} />
))`
  ${(props): FlattenInterpolation<ThemeProps<Props>> | false =>
    Boolean(props.color) &&
    css`
      &&& {
        box-shadow: 0 0 0 1px ${props.theme.palette[`${props.color}-600`]};
        background-color: ${props.theme.palette[`${props.color}-050`]};
        color: ${props.theme.palette[`${props.color}-700`]};
        .ant-alert-icon {
          svg {
            color: ${props.theme.palette[`${props.color}-700`]};
            fill: ${props.theme.palette[`${props.color}-700`]};
          }
        }
      }
    `};

  ${(props): FlattenInterpolation<ThemeProps<Props>> | false =>
    (props.mode === 'background' || props.mode === 'clear' || !props.mode) &&
    css`
      &&& {
        box-shadow: none;
      }
    `};

  ${(props): FlattenInterpolation<ThemeProps<Props>> | false =>
    (props.mode === 'outline' || props.mode === 'clear') &&
    css`
      &&& {
        background: transparent;
      }
    `};
`;

export const AlertContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 3px 0;
  color: inherit;
`;

export const AlertMessage = styled.span`
  display: flex;
  font-size: 16px;
  line-height: 1.25;
  letter-spacing: -0.1px;
  font-weight: 500;
  margin-bottom: 2px;
  color: inherit;
`;

export const AlertDescription = styled.span`
  display: flex;
  font-size: 13px;
  line-height: 1.39;
  font-weight: normal;
  margin-bottom: 2px;
  color: inherit;
`;

export const AlertShowMore = styled.span`
  display: flex;
  font-size: 13px;
  font-weight: 500;
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 6px;
`;
