import {
  IconContainer,
  Container as CardContainer,
  PaddingWrapper,
  ChildrenContainer,
  HeaderContent,
  Header,
  Title,
} from '@synerise/ds-card/dist/Card/Card.styles';
// import Divider from '@synerise/ds-divider';
// import { DividerProps } from '@synerise/ds-divider/dist/Divider.types';

import styled from 'styled-components';

import * as S from '@synerise/ds-tooltip/dist/Tooltip.styles';
import { AntdButton } from "@synerise/ds-button/dist/Button.styles";

export const Flex = styled.div`
  display: flex;
`;

export const FlexGrow1 = styled.div`
  flex-grow: 1;
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const ActionButtonContainer = styled.div`
  margin: 8px 0px 8px 0px;
`

export const InfoCardWrapper = styled.div<{ footerText?: string }>`
  ${CardContainer} {
    background-color: white;
    margin-bottom: 1px;
    padding-top: 0px;
    font-weight: 400;
    min-width: 250px;
    &.custom-description ${ChildrenContainer} {
      margin-top: 8px;
    }
    padding: 16px 16px 8px 16px; // right is 16px as divider ends there
    border-radius: 3px;
    box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.1); // gray-900
  }
  ${PaddingWrapper} {
    padding-top: 0px;
  }
  ${Header} {
    padding: 0px 0px 1px 0px;
    margin-bottom: 8px; // TBD maybe 4?
  }
  ${IconContainer} {
    align-self: center;
    margin-left: 10px;
    margin-right: 10px;
  }
  ${HeaderContent} {
    margin: 0px;
  }
  ${Title}${Title} {
    margin-bottom: 0px;
    font-size: 14px;
  }
  ${AntdButton} {
    width: 32px;
    height: 32px;
  }
  .ds-button {
    background: transparent;
  }
  .btn-focus, .btn-focus:hover {
    box-shadow: unset;
  }
`;

export const ExtraInfo = styled.div`
  margin-top: 8px;
  margin-bottom: 1px;
`;

// export const DividerWithMargin = styled<DividerProps>(Divider)`
// export const DividerWithMargin = styled(Divider)`
//   ${(props): string => (props as any).isCustomDescription ? `margin-top: 16px;` : ''}
//   margin-bottom: 16px;
// `;
// export const DividerWithMargin = styled(DividerProps)`
//   ${(props): string => (props as any).isCustomDescription ? `margin-top: 16px;` : ''}
//   margin-bottom: 16px;
// `;

export const TooltipComponentClassName = S.TooltipComponent;
