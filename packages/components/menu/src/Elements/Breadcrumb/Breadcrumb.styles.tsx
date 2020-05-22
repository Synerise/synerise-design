import styled from 'styled-components';
import * as React from 'react';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Text from '../Item/Text/Text';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = (): void => {};

export const disableDefaultClickingStyles = (props: ThemeProps): string => `
  &, &:focus, &:hover {
    background: ${props.theme.palette.white} !important;
    box-shadow: inset 0 0 0 2px transparent !important;
  } 
`;

export const ArrowRight = styled.div<{ visible: boolean }>`
  transition: opacity 0.3s ease;
  opacity: ${(props): string => (props.visible ? '1' : '0')};
`;

export const BreadcrumbContent = styled.div<{ prefixel?: boolean }>`
  display: flex;
`;
export const Description = styled.div`
  direction: ltr;
  width: 100%;
  font-weight: 400;
  color: ${(props): string => props.theme.palette['grey-600']};
  .search-highlight {
    font-weight: 500;
  }
  text-overflow: ellipsis;
  overflow: hidden;
`;
export const ContentWrapper = styled.div<{ gradientOverlap?: boolean }>`
  position: relative;
  &::before {
    pointer-events: none;
    content: ${(props): string => (props.gradientOverlap ? `''` : 'none')};
    position: absolute;
    display: block;
    width: 50px;
    height: 18px;
    transition: opacity 0.3s ease-in-out;
    background-image: ${(props): string => `linear-gradient( to right,
    ${props.theme.palette['grey-050']},
    rgba(0,0,0,0) 100%
  )`};
  }
  &::after {
    pointer-events: none;
    content: ${(props): string => (props.gradientOverlap ? `''` : 'none')};
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 50px;
    height: 18px;
    transition: opacity 0.3s ease-in-out;
    background-image: ${(props): string => `linear-gradient( to right,
    ${props.theme.palette.white},
    rgba(0,0,0,0) 100%
  )`};
  }
`;
export const BreadcrumbName = styled.div`
  direction: ltr;
  font-weight: 400;
  color: ${(props): string => props.theme.palette['grey-600']};
  .search-highlight {
    font-weight: 500;
  }
`;

export const Breadcrumb = styled(({ children, disabled, onPathClick, compact, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Text disabled={disabled} onItemHover={NOOP} onClick={NOOP} {...rest}>
    {children}
  </Text>
))`
  min-height: 50px;
  ${BreadcrumbContent} {
    direction: ${(props): string => (props.compact ? 'rtl' : 'ltr')};
    flex-wrap: ${(props): string => (props.compact ? 'no-wrap' : 'wrap')};
  }
  &:hover {
    ${ArrowRight} > .ds-icon > svg {
      fill: ${(props): string => (props.disabled ? props.theme.palette['grey-600'] : props.theme.palette['blue-600'])};
    }
    ${BreadcrumbName}, ${Description} {
      color: ${(props): string => (props.disabled ? props.theme.palette['grey-600'] : props.theme.palette['blue-600'])};
    }
    ${ContentWrapper}::after {
      opacity: 0;
    }
    ${ContentWrapper}::before {
      opacity: 0;
    }
  }
  &:focus:active {
    ${ContentWrapper}::before {
      background-image: ${(props): string => `linear-gradient( to right,
    ${props.theme.palette['grey-100']},
    rgba(0,0,0,0) 100%
  )`};
    }
  }
  ${(props): string | false => !!props.onPathClick && disableDefaultClickingStyles(props)}
`;

export const BreadcrumbRoute = styled.div`
  display: flex;
  padding-top:
  height: 18px;
  .active{
    font-weight: 500;
  }
`;
