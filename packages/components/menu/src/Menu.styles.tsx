import * as React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { Menu } from 'antd';

type SubMenuProps = {
  ordered?: boolean | undefined;
  disabled?: boolean | undefined;
  danger?: boolean | undefined;
  prefixel?: React.ReactNode;
  title: string | React.ReactNode;
  tabIndex?: number;
};

type AntdMenuProps = {
  ordered?: boolean | undefined;
  asDropdownMenu?: boolean;
};

export const prefixelWrapper = styled.div``;

const arrowDownSvgWithCustomColor = (color: string): string => {
  const colorValueForSvg = color.replace(/#/, '%23');
  const iconWithColor = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' >/><path fill='none' d='M0 0h24v24H0z' /><path style='fill: ${colorValueForSvg};' d='M14.71973,9.84473,12,12.56445,9.28027,9.84473a.74992.74992,0,0,0-1.06054,1.06054l3.25,3.25a.74971.74971,0,0,0,1.06054,0l3.25-3.25a.74992.74992,0,0,0-1.06054-1.06054Z'/></svg>`;
  return iconWithColor;
};

export const MenuDivider = styled.div`
  height: 1px;
  width: 100%;
  margin: 8px 0;
  border-top: 1px dashed ${(props): string => props.theme.palette['grey-300']};
`;

export const AntdMenu = styled(Menu)<AntdMenuProps>`
  ${(props: AntdMenuProps & ThemeProps): FlattenSimpleInterpolation | false =>
    Boolean(props.asDropdownMenu) &&
    css`
      padding: 8px;
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

        li.ant-menu-submenu {
          &::before {
            content: '';
          }
        }
      }
    `}
  > li {
    > .ant-menu-submenu-title {
      padding-left: 12px !important;
    }
    &:not(.ant-menu-submenu) {
      padding-left: 12px !important;
    }
  }
  .ant-menu-submenu-title {
    display: flex;
  }
  && {
    .ant-menu-inline,
    .ant-menu-vertical,
    .ant-menu-vertical-left {
      border-right-width: 0px;
    }
  }
`;

export const SubMenuItem = styled(Menu.SubMenu)<SubMenuProps>`
  &&& {
    color: ${(props): string => props.theme.palette['grey-700']};
    opacity: ${(props): string => (props.disabled ? '0.4' : '1')};
    cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'pointer')};
    font-weight: 500;
    border-radius: 3px;
    transition: background-color 0.2s ease-out;
    && .ant-menu-submenu-title:hover {
      && > i.ant-menu-submenu-arrow {
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
    > .ant-menu-submenu-title {
      line-height: 1.39;
      height: auto;
      margin: 0;
      padding-bottom: 7px;
      padding-top: 7px;
      max-width: 100%;

      .ds-submenu-title-wrapper > .ds-submenu-title:focus:not(:active) {
         box-shadow: inset 0 0 0 2px transparent;
         background: transparent;
      }

      ${(props: SubMenuProps & ThemeProps): FlattenSimpleInterpolation | false =>
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
    .ant-menu-item {
      padding-right:5px;
    }
    
    &.ant-menu-item-selected {
      background:inherit;
      .ant-menu-submenu-title {
          &::before {
            color: ${(props): string => props.theme.palette['blue-600']};
          }
          .ds-submenu-title {
            color: ${(props): string => props.theme.palette['blue-600']};
          .ds-menu-prefix {
            svg {
               fill: ${(props): string => props.theme.palette['blue-600']};
            }
          }
          &:focus,
          &:active {
            background: ${(props): string => props.theme.palette['grey-050']};
            &::before {
            color: ${(props): string => props.theme.palette['grey-600']};
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
       > .ant-menu-submenu-title{
         box-shadow: inset 0 0 0 2px ${props.theme.palette['blue-600']};
      }
    }
    `}
    i {
      right: 12px;
    }
    > .ant-menu-submenu-title:hover {
      color: ${(props): string => props.theme.palette['blue-600']};
    }
    &&.ant-menu-submenu-open > .ant-menu-submenu-title {
      &:not(:hover) {
        color: ${(props): string => props.theme.palette['grey-700']};
      }
      background:${(props): string => props.theme.palette['grey-050']};
      
      & > i.ant-menu-submenu-arrow {
         transform: rotate(180deg);
         background-image: url("${(props): string =>
           props.disabled
             ? arrowDownSvgWithCustomColor(props.theme.palette['grey-400'])
             : arrowDownSvgWithCustomColor(props.theme.palette['grey-500'])}");
      }
    }
    > .ant-menu-submenu-title {
      border-radius: 3px;
      & > i.ant-menu-submenu-arrow {
          transform: rotate(0deg);
          top:5px;
          right:5px;
          height:24px;
          width:24px;
      }
      & > i.ant-menu-submenu-arrow::after,
      & > i.ant-menu-submenu-arrow::before {
              background-image: none;
              display:none;
      }

      &:hover > i.ant-menu-submenu-arrow::after,
      &:hover > i.ant-menu-submenu-arrow::before{
          background-image: none;
      }
      &:hover {
        color: ${(props): string => props.theme.palette['blue-600']};
        background: ${(props): string => props.theme.palette['grey-050']};
      }
      & > i.ant-menu-submenu-arrow{
        background-image: url("${(props): string => arrowDownSvgWithCustomColor(props.theme.palette['grey-400'])}");
      }
      &:hover > i.ant-menu-submenu-arrow{
        background-image: url("${(props): string => arrowDownSvgWithCustomColor(props.theme.palette['blue-600'])}");
      }
    }
     &&.ant-menu-submenu-open > .ant-menu-submenu-title:hover {
      & > i.ant-menu-submenu-arrow{
        background-image: url("${(props): string => arrowDownSvgWithCustomColor(props.theme.palette['blue-600'])}");
      }
     }

    > li.ant-menu-submenu {
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
        > .ant-menu-submenu {
          &:hover {
            ${(props): string | false =>
              !props.disabled &&
              `
              ${prefixelWrapper} {
                svg {
                  fill: ${props.danger ? props.theme.palette['red-600'] : props.theme.palette['blue-600']};
                }
              }
              color: ${props.danger ? props.theme.palette['red-600'] : props.theme.palette['blue-600']};
              background: ${props.danger ? props.theme.palette['red-050'] : props.theme.palette['grey-050']};
           `}
          }
        }
      }
    }
  }
`;
