import * as React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Menu } from 'antd';
import { Inner, SuffixWraper } from './Elements/Text/Text.styles';

type SubMenuProps = {
  ordered?: boolean | undefined;
  disabled?: boolean | undefined;
  danger?: boolean | undefined;
  prefixel?: React.ReactNode;
  title: string | React.ReactNode;
  childrenCollapsed?: boolean;
};

type AntdMenuProps = {
  ordered?: boolean | undefined;
  height?: number;
};

export const prefixelWrapper = styled.div``;

const arrowDownSvgWithCustomColor = (color: string): string => {
  const colorValueForSvg = color.replace(/#/, '%23');
  const iconWithColor = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' >/><path fill='none' d='M0 0h24v24H0z' /><path style='fill: ${colorValueForSvg};' d='M14.71973,9.84473,12,12.56445,9.28027,9.84473a.74992.74992,0,0,0-1.06054,1.06054l3.25,3.25a.74971.74971,0,0,0,1.06054,0l3.25-3.25a.74992.74992,0,0,0-1.06054-1.06054Z'/></svg>`;
  return iconWithColor;
};

export const AntdMenu = styled(Menu)<AntdMenuProps>`
  ${(props: AntdMenuProps & ThemeProps): FlattenSimpleInterpolation | false =>
    props.ordered !== undefined &&
    css`
      &,
      ul {
        counter-reset: custom-counter;

        li {
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
    ${(props): string | false => !!props.height && `height:${props.height}px;`}
    ${(props): string | false => !!props.height && `overflow-y: scroll;`}
  > li {
    > .ant-menu-submenu-title {
      padding-left: 12px !important;
    }
    &:not(.ant-menu-submenu) {
      padding-left: 12px !important;
    }
  }
`;

export const SubMenuItem = styled(SubMenu)<SubMenuProps>`
  &&& {
    color: ${(props): string => props.theme.palette['grey-700']};
    opacity: ${(props): string => (props.disabled ? '0.4' : '1')};
    cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'pointer')};
    font-weight: 500;
    border-radius: 3px;
    transition: background-color 0.3s ease-out;

    .ant-menu-submenu-title {
      line-height: 1.39;
      height: auto;
      margin: 0;
      padding-bottom: 7px;
      padding-top: 7px;
      max-width: 100%;

      ${(props: SubMenuProps & ThemeProps): FlattenSimpleInterpolation | false =>
        props.ordered !== undefined &&
        css`
          &::before {
            content: '0' counter(custom-counter) '. \\a0';
            line-height: 1.39;
            font-weight: normal;
            color: ${props.theme.palette['grey-500']};
          }
        `}
    }

    &:focus {
      border: 2px solid ${(props): string => props.theme.palette['blue-600']};
    }

    i {
      right: 12px;
    }
    .ant-menu-submenu-title:not(:hover){
      color: ${(props): string =>
        props.childrenCollapsed ? props.theme.palette['grey-700'] : props.theme.palette['blue-600']};
    }
    .ant-menu-submenu-title {
      ${(props): string | false => !props.childrenCollapsed && `background:${props.theme.palette['grey-050']};`}
      border-radius: 3px;
      & > i.ant-menu-submenu-arrow {
          transform: ${(props): string => (props.childrenCollapsed ? `rotate(0deg)` : `rotate(180deg)`)};
          top:5px;
          right:5px;
          height:24px;
          width:24px;
          background-image: url("${(props): string =>
            props.childrenCollapsed
              ? arrowDownSvgWithCustomColor(props.theme.palette['grey-400'])
              : arrowDownSvgWithCustomColor(props.theme.palette['blue-600'])}");
      }
      & > i.ant-menu-submenu-arrow::after,
      & > i.ant-menu-submenu-arrow::before {
              background-image: none;
      }

      &:hover > i.ant-menu-submenu-arrow::after,
      &:hover > i.ant-menu-submenu-arrow::before{
          background-image: none;
      }
      &:hover {
        color: ${(props): string => props.theme.palette['blue-600']};
        background: ${(props): string => props.theme.palette['grey-050']};
      }
      &:hover > i.ant-menu-submenu-arrow{
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
        .ant-menu-submenu-title {
          text-indent: ${(props): string => (props.ordered ? '0' : '-24px')};
        }
      }
    }

    > ul {
      li {
        ${SuffixWraper} {
          transform: ${(props): string => (props.ordered ? 'translateX(0)' : 'translateX(24px)')};
        }
        ${Inner} {
          margin-left: ${(props): string => (props.ordered ? '0' : '-24px')};
        }
        i {
          right: ${(props): string => (props.ordered ? '12px' : '-12px')};
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
