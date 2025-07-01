import styled, {
  type FlattenSimpleInterpolation,
  css,
} from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';

import { AlertSize, FontSize } from './AlertInfo.types';

const FONT_SIZE_DEFAULT = 14;
const mapElementsPosition = {
  right: 'row',
  bottom: 'column',
};

export const TextWrapper = styled.div<{ labelPosition: 'bottom' | 'right' }>`
  display: flex;
  line-height: 16px;
  max-width: 440px;
  word-wrap: break-word;
  justify-content: ${(props): string =>
    props.labelPosition === 'bottom' ? 'center' : 'flex-start'};
  text-align: center;
`;
export const HeaderWrapper = styled.div<{
  fontSize?: AlertSize;
  size?: AlertSize;
}>`
  display: flex;
  line-height: 16px;
  color: ${(props): string => props.theme.palette['grey-800']};
  font-size: ${(props): string =>
    FontSize[props.fontSize as string] || FONT_SIZE_DEFAULT}px;
  font-weight: 500;
  margin-top: ${(props): string =>
    props.size === AlertSize.SMALL ? '0px' : '30px'};
  padding: ${(props): string =>
    props.fontSize === AlertSize.SMALL ? '4px 0 12px' : '8px 0 18px'};
`;
export const ButtonWrapper = styled.div`
  padding-top: 12px;
`;
export const AlertWrapper = styled.div<{
  labelPosition: 'bottom' | 'right';
  mode?: 'absolute';
}>`
  display: flex;
  flex-direction: ${(props): string =>
    mapElementsPosition[props.labelPosition]};
  align-items: center;
  justify-content: center;
  ${(props): FlattenSimpleInterpolation | false =>
    props.mode === 'absolute' &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
    `};
`;
export const AlertIconContainer = styled.div`
  margin: 0 0 12px;
`;
export const StatusIconContainer = styled.div<{
  iconColor: string;
  background: string;
}>`
  background-color: ${(props): string => props.theme.palette[props.background]};
  width: 40px;
  height: 40px;
  border-radius: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  && {
    ${IconContainer} {
      fill: ${(props): string => props.theme.palette[props.iconColor]};
    }
  }
`;
