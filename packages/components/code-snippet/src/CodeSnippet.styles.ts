import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Button from '@synerise/ds-button';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';
import { FontSize, CodeSnippetType } from './CodeSnippet.types';

export const FONT_SIZE_DEFAULT = FontSize.SMALL;
export const LINE_HEIGHT_DEFAULT = 17;

export const ContentIconWrapper = styled.div<{
  type?: string;
}>`
  ${(props): false | string =>
    props.type === CodeSnippetType.MULTI_LINE &&
    `
    position:relative;
    `};
  ${(props): false | string =>
    props.type === CodeSnippetType.SINGLE_LINE &&
    `
        display:flex;
        justify-content:space-between;
        align-items:center;
      `};
`;

export const CodeSnippetWrapper = styled.div<{
  type?: string;
  fontSize?: FontSize;
  expanded?: boolean;
  isButtonVisible?: boolean;
}>`
  & {
    height: 100%;
    background-color: ${(props): string => props.theme.palette['grey-100']};
    border-radius: 3px;
    padding: 12px 8px 0 12px;

    ${(props): false | string =>
      props.type === CodeSnippetType.MULTI_LINE &&
      `
        min-width:250px;
        pre::before{
          background-color: ${props.theme.palette['grey-100']};
          content:'';
          display:block;
          position:absolute;
          top:0;
          bottom:0;
          right:0;
          width:28px;
          z-index:10;
        }
        `};
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

    ${(props): false | string =>
      props.type === CodeSnippetType.SINGLE_LINE &&
      `
        padding-top: ${props.fontSize === FontSize.SMALL ? '4px' : '12px'};
        padding-bottom: ${props.fontSize === FontSize.SMALL ? '4px' : '12px'};
      `};
  }
  .copy {
    ${(props): false | string =>
      props.type === CodeSnippetType.MULTI_LINE &&
      `
        position:absolute;
        top:0;
        right:0;
        z-index:13;
    `};

    cursor: pointer;
    background-color: ${(props): string => props.theme.palette['grey-100']};
    svg {
      fill: ${(props): string => props.theme.palette['grey-600']};
    }
  }

  .copy:hover {
    svg {
      fill: ${(props): string => props.theme.palette['blue-600']};
    }
  }
`;

export const ExpanderButton = styled(Button)<{
  expanded?: boolean;
}>`
  && {
    position: relative;
    z-index: 15;
    top: -5px;

    ${IconContainer} {
      svg {
        transition: transform 0.2s linear;
        transform: rotate(${(props): string => (props.expanded ? '180deg' : '0deg')});
      }
    }
  }
`;

export const InlineCodeWrapper = styled.code`
  & {
    font-size: 12px;
    font-family: Monaco;
    display: inline-block;
    padding: 0 4px;
    margin-right: 4px;
    color: #e31a5d;
    background-color: rgba(245, 41, 34, 0.2);
  }
`;
export const BlockCodeWrapper = styled.code<{
  type?: CodeSnippetType;
  fontSize?: FontSize;
  isButtonVisible?: boolean;
}>`
  & {
    display: block;
    font-family: Monaco;
    font-size: ${(props): string => `${props.fontSize || FONT_SIZE_DEFAULT}px`};
    line-height: ${LINE_HEIGHT_DEFAULT}px;
    color: ${(props): string => props.theme.palette[`grey-700`]};
    ${(props): false | string =>
      props.type === CodeSnippetType.SINGLE_LINE &&
      `
      padding-right: 4px;
      line-height:24px;
      `};
    ${(props): false | string =>
      props.type === CodeSnippetType.MULTI_LINE &&
      `
        padding-bottom:${props.isButtonVisible ? '17px' : '12px'};
    `};
  }
`;

export const PreBlock = styled.pre<{
  wrap?: boolean;
  expanded?: boolean;
  isButtonVisible?: boolean;
}>`
  & {
    font-family: Monaco;
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
