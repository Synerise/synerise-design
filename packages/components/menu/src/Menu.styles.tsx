import { Menu } from 'antd';
import { type PropsWithChildren, type ReactNode } from 'react';
import styled, {
  type FlattenSimpleInterpolation,
  css,
} from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';

import { type AntdMenuProps, type MenuDividerProps } from './Menu.types';

type SubMenuProps = PropsWithChildren<{
  ordered?: boolean | undefined;
  disabled?: boolean | undefined;
  danger?: boolean | undefined;
  prefixel?: ReactNode;
  title: string | ReactNode;
  tabIndex?: number;
}>;

const overflowStyles = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const arrowDownSvgWithCustomColor = (color: string): string => {
  const colorValueForSvg = color.replace(/#/, '%23');
  const iconWithColor = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' >/><path fill='none' d='M0 0h24v24H0z' /><path style='fill: ${colorValueForSvg};' d='M14.71973,9.84473,12,12.56445,9.28027,9.84473a.74992.74992,0,0,0-1.06054,1.06054l3.25,3.25a.74971.74971,0,0,0,1.06054,0l3.25-3.25a.74992.74992,0,0,0-1.06054-1.06054Z'/></svg>`;
  return iconWithColor;
};

export const MenuDivider = styled.div<{ level?: number }>`
  height: 1px;
  width: ${(props): string =>
    props?.level && props?.level > 1 ? '75%' : '100%'};
  margin: ${(props: MenuDividerProps): string =>
      props.higher ? '16px' : '8px'}
    ${(props): string => (props?.level && props?.level > 1 ? '35px' : '0px')};
  border-top: 1px dashed ${(props): string => props.theme.palette['grey-300']};
`;

export const AntdMenu = styled(Menu)<AntdMenuProps>`
  ${(props: AntdMenuProps & ThemeProps): FlattenSimpleInterpolation | false =>
    Boolean(props.asDropdownMenu) &&
    !props.asInfoCardContainer &&
    css`
      && {
        padding: 8px;
        width: 194px;
    `}
  ${(props: AntdMenuProps & ThemeProps): FlattenSimpleInterpolation | false =>
    !!props.ordered &&
    css`
      &,
      ul {
        counter-reset: custom-counter;

        li:not(.ds-submenu-title) {
          counter-increment: custom-counter;

          &::before {
            content: '0' counter(custom-counter) '. \\a0';
            line-height: 1.39;
            font-weight: normal;
            color: ${props.theme.palette['grey-500']};
          }
        }

        li.ant-menu-submenu,
        li.-submenu {
          &::before {
            content: '';
          }
        }
      }
    `}
  > li {
    > .ant-menu-submenu-title,
    > .-submenu-title {
      padding-left: 12px !important;
    }
    &:not(.ant-menu-submenu) {
      padding-left: 12px !important;
    }
  }
  .ant-menu-submenu-title,
  .-submenu-title {
    display: flex;
    ${overflowStyles}
    .ds-submenu-title-wrapper {
      ${overflowStyles}
      .ds-submenu-title {
        padding-top: 5px;
        padding-bottom: 5px;
        ${overflowStyles}
      }
    }
  }
  &&& .ant-menu-item-selected,
  &&& .-item-selected {
    &:focus:not(:active) {
      color: ${(props): string => props.theme.palette['blue-600']};
      background: ${(props): string => props.theme.palette['blue-050']};
      box-shadow: inset 0 0 0 2px
        ${(props): string => props.theme.palette['blue-600']};
      &::before {
        color: ${(props): string => props.theme.palette['blue-600']};
      }
    }
  }
  && {
    .ant-menu-submenu-open,
    .-submenu-open {
      .ant-menu-inline,
      .-inline,
      .ant-menu-vertical,
      .-vertical,
      .ant-menu-vertical-left,
      .-vertical-left {
        border-right-width: 0px;
        margin: 8px 0 8px 0;
        padding-left: 24px;
      }
    }
  }

  ${(props: AntdMenuProps & ThemeProps): FlattenSimpleInterpolation | false =>
    Boolean(props.asInfoCardContainer) &&
    css`
      &&& li.ds-menu-item {
        padding: 0 !important;
      }
    `}
`;

export const SubMenuItem = styled(Menu.SubMenu)<SubMenuProps>`
  &&& {
    color: ${(props): string => props.theme.palette['grey-700']};
    opacity: ${(props): string => (props.disabled ? '0.4' : '1')};
    cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'pointer')};
    font-weight: 500;
    border-radius: 3px;
    transition: background-color 0.2s ease-out;
    && .ant-menu-submenu-title:hover, && .-submenu-title:hover {
      && > i.ant-menu-submenu-arrow, && > i.-submenu-arrow {
         background-image: url("${(props): string =>
           props.disabled
             ? arrowDownSvgWithCustomColor(props.theme.palette['grey-400'])
             : arrowDownSvgWithCustomColor(props.theme.palette['blue-600'])}");
      }
        .ds-submenu-title-wrapper > .ds-submenu-title {
            color: ${(props): string => props.theme.palette['blue-600']};
            .ds-menu-prefix {
              svg {
                fill: ${(props): string => props.theme.palette['blue-600']};
              }
         }
      }
    }
    > .ant-menu-submenu-title, > .-submenu-title {
      line-height: 1.39;
      height: auto;
      margin: 0;
      padding-bottom: 2px;
      padding-top: 2px;
      max-width: 100%;
      align-items: center;

      .ds-submenu-title-wrapper > .ds-submenu-title:focus:not(:active) {
         box-shadow: inset 0 0 0 2px transparent;
         background: transparent;
      }

      ${(
        props: SubMenuProps & ThemeProps,
      ): FlattenSimpleInterpolation | false =>
        !!props.ordered &&
        css`
          &::before {
            content: '0' counter(custom-counter) '. \\a0';
            line-height: 1.39;
            font-weight: normal;
            color: ${props.theme.palette['grey-500']};
          }
        `}
    }
    .ant-menu-item, .-item {
      padding-right:5px;
      padding-left: 10px !important;
      
    }
      
    .ant-menu-title-content {
      .ant-menu-item, .-item {
        margin-left: 0;
      }
    }

    .ds-menu-prefix {
      margin-left: 0px ;
    }
    
    &.ant-menu-item-selected, &.-item-selected {
      background:inherit;
      .ant-menu-submenu-title, .-submenu-title {
          &:focus,
          &:active {
            background: ${(props): string => props.theme.palette['blue-050']};
            &::before {
            color: ${(props): string => props.theme.palette['blue-600']};
          }
        }
        & > .ds-menu-prefix {
        svg {
          fill: ${(props): string => props.theme.palette['blue-600']};
        }
      }

    
          &::after {
            content: none;
          } 
        }
      }
    }
    
    ${(props): string | false =>
      !props.disabled &&
      `
    &:focus {
       > .ant-menu-submenu-title, > .-submenu-title {
         box-shadow: inset 0 0 0 2px ${props.theme.palette['blue-600']};
      }
    }
    `}
    i {
      right: 12px;
    }
    > .ant-menu-submenu-title:hover, > .-submenu-title:hover {
      color: ${(props): string => props.theme.palette['blue-600']};
    }
    &&.ant-menu-submenu-open > .ant-menu-submenu-title, &&.-submenu-open > .-submenu-title {
      &:not(:hover) {
        color: ${(props): string => props.theme.palette['grey-700']};
      }
      background:${(props): string => props.theme.palette['blue-050']};
      .ds-menu-content-wrapper {
      color: ${(props): string => props.theme.palette['blue-600']};
      background: ${(props): string => props.theme.palette['blue-050']};
        .ds-menu-prefix {
          svg {
            fill: ${(props): string => props.theme.palette['blue-600']};
          }
        }
        .ds-check-icon{
          svg {
            fill: ${(props): string => props.theme.palette['green-600']};
          }
        }
      }

      
      & > i.ant-menu-submenu-arrow, & > i.-submenu-arrow {
         transform: rotate(180deg);
         background-image: url("${(props): string =>
           props.disabled
             ? arrowDownSvgWithCustomColor(props.theme.palette['grey-400'])
             : arrowDownSvgWithCustomColor(props.theme.palette['blue-600'])}");
      }
    }
    > .ant-menu-submenu-title, > .-submenu-title {
      border-radius: 3px;
      & > i.ant-menu-submenu-arrow, & > i.-submenu-arrow {
          transform: rotate(0deg);
          top:calc(50% - 12px);
          right:5px;
          height:24px;
          width:24px;
      }
      & > i.ant-menu-submenu-arrow::after, & > i.-submenu-arrow::after,
      & > i.ant-menu-submenu-arrow::before, & > i.-submenu-arrow::before {
              background-image: none;
              display:none;
      }

      &:hover > i.ant-menu-submenu-arrow::after, &:hover > i.-submenu-arrow::after,
      &:hover > i.ant-menu-submenu-arrow::before, &:hover > i.-submenu-arrow::before {
          background-image: none;
      }
      &:hover {
        color: ${(props): string => props.theme.palette['blue-600']};
        background: ${(props): string => props.theme.palette['grey-050']};
      }
      & > i.ant-menu-submenu-arrow, & > i.-submenu-arrow{
        background-image: url("${(props): string => arrowDownSvgWithCustomColor(props.theme.palette['grey-400'])}");
      }
      &:hover > i.ant-menu-submenu-arrow, &:hover > i.-submenu-arrow{
        background-image: url("${(props): string => arrowDownSvgWithCustomColor(props.theme.palette['blue-600'])}");
      }
    }
     &&.ant-menu-submenu-open > .ant-menu-submenu-title:hover, &&.-submenu-open > .-submenu-title:hover {
      & > i.ant-menu-submenu-arrow, & > i.-submenu-arrow{
        background-image: url("${(props): string => arrowDownSvgWithCustomColor(props.theme.palette['blue-600'])}");
      }
     }

    > li.ant-menu-submenu, > li.-submenu {
      &:hover {
        background: none !important;
      }
    }
    ${(props): string =>
      props.disabled
        ? `
     > * {
        pointer-events:none;
     }`
        : ``}

    > ul {
      li {
        i {
          right: 12px;
        }
        > .ant-menu-submenu, > .-submenu {
          &:hover {
            ${(props): string | false =>
              !props.disabled &&
              `
              color: ${props.danger ? props.theme.palette['red-600'] : props.theme.palette['blue-600']};
              background: ${props.danger ? props.theme.palette['red-050'] : props.theme.palette['grey-050']};
           `}
          }
        }
      }
    }
  }
`;
