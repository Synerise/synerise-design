import styled, { css } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core';

const TRANSITION_FN = '0.3s ease-in-out';

export const PrefixWrapper = styled.div<{ visible?: boolean; disabled?: boolean }>`
  display: flex;
  order: 1;
  opacity: 1;
  transition: opacity ${TRANSITION_FN};
  margin-top: -7px;
  margin-bottom: -7px;
  margin-left: -4px;
  margin-right: 12px;
  align-items: center;
`;
export const Highlight = styled.span``;

export const ArrowRight = styled.div<{ visible: boolean }>`
  transition: opacity ${TRANSITION_FN};
  opacity: ${props => (props.visible ? '1' : '0')};
  svg {
    transition: fill ${TRANSITION_FN};
  }
`;

export const BreadcrumbContent = styled.div<{ prefixel?: boolean }>`
  display: flex;
  align-items: center;
`;

export const Description = styled.div`
  direction: ltr;
  width: 100%;
  font-weight: 400;
  color: ${props => props.theme.palette['grey-600']};
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
    content: '';
    opacity: ${props => (props.gradientOverlap ? '1' : '0')};
    position: absolute;
    display: block;
    width: 50px;
    height: 18px;
    transition: opacity ${TRANSITION_FN};
    background-image: ${props =>
      `-webkit-linear-gradient( left, ${props.theme.palette['grey-050']} 0%, rgba(255,255,255,0) 100% )`};
  }
  &::after {
    pointer-events: none;
    content: '';
    opacity: ${props => (props.gradientOverlap ? '1' : '0')};
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 50px;
    height: 18px;
    transition: opacity ${TRANSITION_FN};
    background-image: ${props =>
      `-webkit-linear-gradient( left, ${props.theme.palette.white} 0%, rgba(255,255,255,0) 100% )`};
  }
`;
export const BreadcrumbName = styled.div`
  direction: ltr;
  font-weight: 400;
  transition: color ${TRANSITION_FN};
  color: ${props => props.theme.palette['grey-600']};
  .search-highlight {
    font-weight: 500;
  }
`;
export const disableDefaultClickingStyles = (props: ThemeProps & { disabled?: boolean }) => css`
  &, &:focus, &:hover {
    background: ${props.theme.palette.white} !important;
    box-shadow: inset 0 0 0 2px transparent !important;
        ${BreadcrumbName}, ${Description} {
      color: ${props.theme.palette['grey-600']};
    }
    ${ArrowRight} > .ds-icon > svg{
       fill: ${props.theme.palette['grey-600']};
    }
    
  } 
  ${BreadcrumbName}:hover, ${Description}:hover {
    color: ${props.disabled ? props.theme.palette['grey-600'] : props.theme.palette['blue-600']};
  }
  &&&:hover {
       ${PrefixWrapper} {
      .ds-icon > svg{
       fill: ${props.theme.palette['grey-600']} !important;
      }
    }
  }
  &&& {
   ${PrefixWrapper}:hover {
    .ds-icon > svg{
    fill: ${props.theme.palette['blue-600']} !important;
   }
  }
`;

export const OuterWrapper = styled.div`
  padding: 7px 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  user-select: none;
`;

export const InnerWrapper = styled.div`
  text-overflow: ellipsis;
  order: 2;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
  line-height: 1.39;
  min-height: 18px;
  user-select: none;
`;

export const Breadcrumb = styled.div<{
  clickable?: boolean;
  prefixel?: boolean;
  size?: string;
  disabled?: boolean;
  compact?: boolean;
}>`
  display: flex;
  align-items: center;
  min-width: 200px;
  margin: 0;
  padding-left: 12px;
  padding-right: 12px;
  font-size: 13px;
  line-height: 1.39;
  font-weight: 500;
  user-select: none;
  border-radius: 3px;
  transition: background-color 0.2s ease-out, color 0.2s ease-out;
  min-height: 50px;
  background: none;
  border: none;
  color: ${props => props.theme.palette['grey-700']};
  cursor: pointer;
  opacity: 1;

  ${BreadcrumbContent} {
    direction: ${props => (props.compact ? 'rtl' : 'ltr')};
    flex-wrap: ${props => (props.compact ? 'no-wrap' : 'wrap')};
  }

  & {
    .ds-icon {
      height: 18px;
      display: flex;
      align-items: center;
    }
  }

  &:hover {
    background: ${props => props.theme.palette['grey-050']};
    color: ${props => props.theme.palette['blue-600']};
    ${ArrowRight} > .ds-icon > svg {
      fill: ${props => (props.disabled ? props.theme.palette['grey-600'] : props.theme.palette['blue-600'])};
    }
    ${BreadcrumbName}, ${Description} {
      color: ${props => (props.disabled ? props.theme.palette['grey-600'] : props.theme.palette['blue-600'])};
    }
    ${ContentWrapper}::after {
      opacity: 0;
    }
    ${ContentWrapper}::before {
      opacity: 0;
    }
  }
  &:focus:not(:active) {
    box-shadow: inset 0 0 0 2px ${props => props.theme.palette['blue-600']};
  }
  &:focus:active {
    ${ContentWrapper}::before {
      background-image: ${props => `-webkit-linear-gradient( left,
    ${props.theme.palette['grey-100']} 0%,
    rgba(255,255,255,0) 100%
  )`};
    }
  }

  ${props => !!props.clickable && disableDefaultClickingStyles(props)}
`;

export const BreadcrumbRoute = styled.div`
  display: flex;
  align-items: center;
  padding-top:
  height: 18px;
  .active{
    font-weight: 500;
  }
`;
