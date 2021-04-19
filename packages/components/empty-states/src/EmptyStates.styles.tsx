import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { EmptyStatesSize, FontSize } from './EmptyStates.types';

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
  justify-content: ${(props): string => (props.labelPosition === 'bottom' ? 'center' : 'flex-start')};
  text-align: center;
  padding-bottom: 8px;
`;
export const HeaderWrapper = styled.div<{ fontSize?: EmptyStatesSize; size?: EmptyStatesSize }>`
  display: flex;
  line-height: 16px;
  color: ${(props): string => props.theme.palette['grey-800']};
  font-size: ${(props): string => FontSize[props.fontSize as string] || FONT_SIZE_DEFAULT}px;
  font-weight: 500;
  padding-bottom: ${(props): string => (props.fontSize === EmptyStatesSize.SMALL ? '12px' : '18px')};
`;
export const ButtonWrapper = styled.div`
  padding-top: 12px;
  display: flex;
`;
export const EmptyStatesWrapper = styled.div<{ labelPosition: 'bottom' | 'right'; mode?: 'absolute' }>`
  display: flex;
  flex-direction: ${(props): string => mapElementsPosition[props.labelPosition]};
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
export const EmptyStatesIconContainer = styled.div<{ size?: EmptyStatesSize }>`
  margin-bottom: ${(props): string => (props.size === EmptyStatesSize.SMALL ? '8px' : '40px')};
`;
export const StatusIconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
 
`;
