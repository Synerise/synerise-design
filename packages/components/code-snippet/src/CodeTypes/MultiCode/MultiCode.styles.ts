import styled, {
  type FlattenSimpleInterpolation,
  css,
} from 'styled-components';

import Button, { type StyledButton } from '@synerise/ds-button';
import { IconContainer } from '@synerise/ds-icon';

import {
  BlockCodeWrapperSingle,
  CodeSnippetWrapperSingle,
  FONT_SIZE_DEFAULT,
  LINE_HEIGHT_DEFAULT,
  StyledCopyIcon,
} from '../SingleCode/SingleCode.styles';

export const ContentIconWrapper = styled.div`
  position: relative;
`;

export const CodeSnippetWrapperMulti = styled(CodeSnippetWrapperSingle)<{
  expanded?: boolean;
  isButtonVisible?: boolean;
}>`
  & {
    min-width: 250px;
    pre::before {
      background-color: ${(props): string => props.theme.palette['grey-100']};
      content: '';
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 28px;
      z-index: 10;
    }
    .content-animation {
      position: relative;
    }
    ${(props): false | string =>
      !!props.isButtonVisible &&
      `
        padding-bottom:7px;
        .content-animation::after{
            content:'';
            display:block;
            position:absolute;
            bottom:0;
            left:0;
            right:0;
            height:${LINE_HEIGHT_DEFAULT}px;
            background-color:${props.theme.palette['grey-100']};
            z-index:10;
        }
        `};
  }
`;
export const MultiIconCopy = styled(StyledCopyIcon)`
  && {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 13;
  }
`;

export const ExpanderButton: StyledButton = styled(Button)<{
  expanded?: boolean;
}>`
  && {
    position: relative;
    z-index: 15;
    top: -5px;

    ${IconContainer} {
      svg {
        transition: transform 0.2s linear;
        transform: rotate(
          ${(props): string => (props.expanded ? '180deg' : '0deg')}
        );
      }
    }
  }
`;

export const BlockCodeWrapperMulti = styled(BlockCodeWrapperSingle)<{
  isButtonVisible?: boolean;
}>`
  & {
    padding-bottom: ${(props): string =>
      props.isButtonVisible ? '17px' : '12px'};
  }
`;

export const PreBlock = styled.pre<{
  wrap?: boolean;
  expanded?: boolean;
  isButtonVisible?: boolean;
}>`
  & {
    font-family: 'IBM Plex Mono Regular', monospace;
    font-size: ${FONT_SIZE_DEFAULT}px;
    line-height: ${LINE_HEIGHT_DEFAULT}px;
    margin: 0;

    ${(props): FlattenSimpleInterpolation | false =>
      !!props.wrap &&
      css`
        white-space: pre-wrap;
        word-wrap: break-world;
      `};
    .ps__rail-x {
      height: ${LINE_HEIGHT_DEFAULT}px;
      z-index: 11;
      opacity: 0;
    }
    .ps__rail-x > .ps__thumb-x {
      bottom: ${(props): string => (props.isButtonVisible ? '10px' : '6px')};
    }
    .ps__rail-y {
      opacity: 0;
      z-index: 11;
    }
  }
`;
