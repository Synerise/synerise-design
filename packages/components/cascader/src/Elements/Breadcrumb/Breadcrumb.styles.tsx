import styled, { css } from 'styled-components';

import type { ThemeProps } from '@synerise/ds-core';
import ListItem, { type StyledListItem } from '@synerise/ds-list-item';
import { Inner } from '@synerise/ds-list-item/dist/components/Text/Text.styles';

const TRANSITION_FN = '0.3s ease-in-out';

export const PrefixWrapper = styled.div<{
  visible?: boolean;
  disabled?: boolean;
}>`
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
  transition:
    opacity ${TRANSITION_FN},
    color ${TRANSITION_FN};
  opacity: ${(props) => (props.visible ? '1' : '0')};
  color: var(--ds-color-icon-base-default);
`;

export const BreadcrumbContent = styled.div<{ prefixel?: boolean }>`
  display: flex;
  align-items: center;
`;

export const Description = styled.div`
  direction: ltr;
  width: 100%;
  font-weight: 400;
  color: var(--ds-color-text-base-muted);
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
    opacity: ${(props) => (props.gradientOverlap ? '1' : '0')};
    position: absolute;
    display: block;
    width: 50px;
    height: 18px;
    transition: opacity ${TRANSITION_FN};
    background-image: -webkit-linear-gradient(
      left,
      var(--ds-color-background-base-subtle) 0%,
      transparent 100%
    );
  }
  &::after {
    pointer-events: none;
    content: '';
    opacity: ${(props) => (props.gradientOverlap ? '1' : '0')};
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 50px;
    height: 18px;
    transition: opacity ${TRANSITION_FN};
    background-image: -webkit-linear-gradient(
      left,
      var(--ds-color-background-base-default) 0%,
      transparent 100%
    );
  }
`;
export const BreadcrumbName = styled.div`
  direction: ltr;
  font-weight: 400;
  transition: color ${TRANSITION_FN};
  color: var(--ds-color-text-base-muted);
  .search-highlight {
    font-weight: 500;
  }
`;
export const disableDefaultClickingStyles = (
  props: ThemeProps & { disabled?: boolean },
) => css`
  &, &:focus, &:hover {
    background: var(--ds-color-background-base-default) !important;
    box-shadow: inset 0 0 0 2px transparent !important;
        ${BreadcrumbName}, ${Description} {
      color: var(--ds-color-text-base-muted);
    }
    ${ArrowRight} {
      color: var(--ds-color-icon-base-default);
    }
  }
  ${BreadcrumbName}:hover, ${Description}:hover {
    color: ${props.disabled ? 'var(--ds-color-text-base-muted)' : 'var(--ds-color-text-brand-default)'};
  }
  &&&:hover {
    ${PrefixWrapper} {
      color: var(--ds-color-icon-base-default);
    }
  }
  &&& {
    ${PrefixWrapper}:hover {
      color: var(--ds-color-icon-brand-default);
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
type BreadcrumbProps = {
  clickable?: boolean;
  prefixel?: boolean;
  size?: string;
  disabled?: boolean;
  compact?: boolean;
  isNavigation?: boolean;
};

export const Breadcrumb: StyledListItem<BreadcrumbProps> = styled(
  ListItem,
)<BreadcrumbProps>`
  ${BreadcrumbContent} {
    direction: ${(props) => (props.compact ? 'rtl' : 'ltr')};
    flex-wrap: ${(props) => (props.compact ? 'no-wrap' : 'wrap')};
  }
  &:hover {
    ${ContentWrapper}::after {
      opacity: 0;
    }
    ${ContentWrapper}::before {
      opacity: 0;
    }
  }
  ${(props) =>
    props.isNavigation
      ? css`
          &:hover, &:active, &:focus, &:focus:active {
            ${Inner} {
              background: transparent;
            }
          }
          ${BreadcrumbName}, ${Description} {
            &:hover {
              color: ${props.disabled ? 'var(--ds-color-text-base-muted)' : 'var(--ds-color-text-brand-default)'};
            }
          }
          &&& {
            ${PrefixWrapper} {
              color: var(--ds-color-icon-base-default);
            }
            ${PrefixWrapper}:hover {
              color: var(--ds-color-icon-brand-default);
            }
            &:focus {
              ${Inner} {
                box-shadow: none;
              }
            }
          }
        `
      : css`
          &:hover {
            background: var(--ds-color-background-base-subtle);
            color: var(--ds-color-text-brand-default);
            ${ArrowRight} {
              color: ${
                props.disabled
                  ? 'var(--ds-color-icon-base-default)'
                  : 'var(--ds-color-icon-brand-default)'
              };
            }

            ${BreadcrumbName}, ${Description} {
              color: ${
                props.disabled
                  ? 'var(--ds-color-text-base-muted)'
                  : 'var(--ds-color-text-brand-default)'
              };
            }
          }
          &:focus:not(:active) {
            box-shadow: inset 0 0 0 2px var(--ds-color-border-brand-default);
          }
          &:focus:active {
            ${ContentWrapper}::before {
              background-image: ${`-webkit-linear-gradient( left, var(--ds-color-background-base-muted) 0%, transparent 100%)`};
            }
          }
        `}

  ${(props) =>
    props.clickable &&
    !props.isNavigation &&
    disableDefaultClickingStyles(props)}
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
