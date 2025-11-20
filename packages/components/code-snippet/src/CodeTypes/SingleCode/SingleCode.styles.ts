import styled from 'styled-components';

import CopyIcon from '@synerise/ds-copy-icon';

import { FontSize } from '../../CodeSnippet.types';

export const FONT_SIZE_DEFAULT = FontSize.SMALL;
export const LINE_HEIGHT_DEFAULT = 17;
export const ICON_CLASSNAME = 'copy';

export const ContentIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledCopyIcon = styled(CopyIcon)`
  && {
    cursor: pointer;
    background-color: ${(props): string => props.theme.palette['grey-100']};
    color: ${(props): string => props.theme.palette['grey-400']};
  }

  &:hover {
    color: ${(props): string => props.theme.palette['blue-600']};
  }
`;

export const CodeSnippetWrapperSingle = styled.div<{
  fontSize?: FontSize;
}>`
  & {
    height: 100%;
    background-color: ${(props): string => props.theme.palette['grey-100']};
    border-radius: 3px;
    padding: 12px 8px 0 12px;

    .content-animation {
      position: relative;
    }
    ${(props): false | string =>
      !!props.fontSize &&
      `
        padding-top: ${props.fontSize === FontSize.SMALL ? '4px' : '12px'};
        padding-bottom: ${props.fontSize === FontSize.SMALL ? '4px' : '12px'};
    `};
  }
`;

export const BlockCodeWrapperSingle = styled.code<{
  fontSize?: FontSize;
}>`
  & {
    display: block;
    font-family: 'IBM Plex Mono Regular', monospace;
    font-size: ${(props): string => `${props.fontSize || FONT_SIZE_DEFAULT}px`};
    line-height: ${LINE_HEIGHT_DEFAULT}px;
    color: ${(props): string => props.theme.palette[`grey-600`]};
    ${(props): false | string =>
      !!props.fontSize &&
      `
      padding-right: 4px;
      line-height:24px;
      `};
  }
`;
