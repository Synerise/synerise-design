import type { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import type { BroadcastBarType } from './BroadcastBar.types';

const TYPE_TO_TOKEN_VARIANT: Record<BroadcastBarType, string> = {
  success: 'success',
  warning: 'warning',
  negative: 'error',
};

const variantOf = (type?: BroadcastBarType): string =>
  TYPE_TO_TOKEN_VARIANT[type ?? 'success'] ?? 'success';

const getColorBackground = (type?: BroadcastBarType): string =>
  `var(--ds-broadcast-bar-variant-${variantOf(type)}-bg)`;
const getColorText = (type?: BroadcastBarType): string =>
  `var(--ds-broadcast-bar-variant-${variantOf(type)}-text)`;
const getColorIcon = (type?: BroadcastBarType): string =>
  `var(--ds-broadcast-bar-variant-${variantOf(type)}-icon)`;

export const AlertContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  color: inherit;
`;
export const AllContent = styled.div<{
  type?: BroadcastBarType;
  close?: boolean | ReactNode;
}>`
  display: flex;
  ${(props) =>
    props.close &&
    css`
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    `};
  color: ${(props) => getColorText(props.type)};
`;
export const IconWrapper = styled.div<{
  type?: BroadcastBarType;
}>`
  margin: 8px 12px;
  color: ${(props) => getColorIcon(props.type)};
`;
export const IconCloseWrapper = styled.div<{ type?: BroadcastBarType }>`
  margin: 3px 5px 2px;
  cursor: pointer;
  color: ${(props) => getColorIcon(props.type)};
`;
export const ButtonWrapper = styled.div`
  margin: 6px 8px;
  display: flex;
`;
export const ButtonCloseWrapper = styled.div`
  margin: 6px 8px;
  display: flex;
`;
export const Wrapper = styled.div<{ type?: BroadcastBarType }>`
  margin-top: 10px;
  color: ${(props) => getColorText(props.type)};
`;
export const Container = styled.div<{
  type?: BroadcastBarType;
  close?: boolean;
}>`
  width: 100%;
  display: flex;
  justify-content: ${(props) => (props.close ? 'space-between' : 'center')};
  position: relative;
  background-color: ${(props) => getColorBackground(props.type)};
`;
export const WrapperBroadcastBar = styled.div<{
  type?: BroadcastBarType;
  close?: boolean;
}>`
  font-size: 13px;
  ${(props) =>
    props.close &&
    css`
      margin-left: auto;
    `};
  color: ${(props) => getColorText(props.type)};
`;

export const AlertDescription = styled.span`
  display: flex;
  max-width: 800px;
  white-space: normal;
  font-size: 13px;
  line-height: 1.39;
  font-weight: 500;
  color: inherit;
`;
