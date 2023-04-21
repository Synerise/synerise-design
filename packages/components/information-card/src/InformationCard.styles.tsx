import type { ReactHTML } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {
  IconContainer,
  Container as CardContainer,
  PaddingWrapper,
  HeaderContent,
  Header,
  Title,
} from '@synerise/ds-card/dist/Card/Card.styles';
import * as S from '@synerise/ds-tooltip/dist/Tooltip.styles';
import { AntdButton } from '@synerise/ds-button/dist/Button.styles';

export const Flex = styled.div`
  display: flex;
`;

export const FlexGrow = styled.div<ReactHTML['div'] & { grow?: number }>`
  flex-grow: ${({ grow = 1 }): number => grow};
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const ActionButtonContainer = styled.div`
  margin: 8px 0 8px 0;
`;

export const InfoCardWrapper = styled.div<{ footerText?: string; asTooltip?: boolean }>`
  margin-left: ${(props): string => (props.asTooltip ? '0' : '8px')};
  width: 294px;

  ${CardContainer} {
    background-color: white;
    margin-bottom: 1px;
    font-weight: 400;
    padding: 16px 16px 8px 16px; // right is 16px as divider ends there
    border-radius: 3px;
    box-shadow: ${(props): string => (props.asTooltip ? 'unset' : '0 16px 32px 0 rgba(35, 41, 54, 0.1)')}; // gray-900
  }

  ${PaddingWrapper} {
    padding-top: 0;
  }
  ${Header} {
    padding: 0 0 1px 0;
    margin-bottom: 8px;
  }
  ${IconContainer} {
    align-self: center;
    margin-left: 10px;
    margin-right: 10px;
  }
  ${HeaderContent} {
    margin: 0;
  }
  ${Title}${Title} {
    margin-bottom: 0;
    font-size: 14px;
  }
  ${AntdButton} {
    width: 32px;
    height: 32px;
  }
  .ds-button {
    background: transparent;
  }
  .btn-focus,
  .btn-focus:hover {
    box-shadow: unset;
  }
`;

export const AlertWrapper = styled.div`
  padding-bottom: 8px;
  :empty {
    display: none;
  }
`;
export const NonEditableWrapper = styled.div`
  padding-bottom: 8px;
  :empty {
    display: none;
  }
`;

export const DescriptionWrapper = styled.div``;

/**
 * This component can be used to style container with popovers/tooltips to disable arrow.
 */
export const HidePopoverArrowWrapper = styled.div`
  .ant-popover-arrow-content,
  .ant-tooltip-arrow-content {
    display: none;
  }
`;

/**
 * Should be mounted in application where.
 */
export const GlobalCSSHidePopoverArrow = createGlobalStyle`
  .ant-popover-arrow-content,.ant-tooltip-arrow-content {
    display: none;
}`;

export const ExtraInfo = styled.div`
  margin-bottom: 1px;
`;

export const TooltipComponentClassName = S.TooltipComponent;
