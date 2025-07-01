import Alert from 'antd/lib/alert';
import React from 'react';
import styled, {
  type FlattenInterpolation,
  type ThemeProps,
  css,
} from 'styled-components';

import { type ThemePropsVars } from '@synerise/ds-core';

import { type Props } from './Alert.types';

const DARKER_COLORS = ['green', 'yellow'];

const getColor = (props: Props & { theme: ThemePropsVars }): string => {
  const { color, theme } = props;
  const hue = DARKER_COLORS.includes(color as string) ? '700' : '600';
  return theme.palette[`${color}-${hue}`];
};

export const AntdAlert = styled(
  (props: Props & { message: React.ReactNode }) => <Alert {...props} />,
)`
  ${(props): FlattenInterpolation<ThemeProps<Props>> | false =>
    Boolean(props.color) &&
    css`
      &&& {
        box-shadow: 0 0 0 1px ${props.theme.palette[`${props.color}-600`]};
        background-color: ${props.theme.palette[`${props.color}-050`]};
        color: ${getColor(props)};
        .ant-alert-icon {
          svg {
            color: ${getColor(props)};
            fill: ${getColor(props)};
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
