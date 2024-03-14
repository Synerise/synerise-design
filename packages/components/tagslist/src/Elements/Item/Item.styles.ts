import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Menu from '@synerise/ds-menu';
import { BorderLessInput } from '@synerise/ds-input/dist/InputMultivalue/InputMultivalue.styles';
import { BaseProps as DSInputProps } from '@synerise/ds-input';
import Icon from '@synerise/ds-icon';

export type TagsListItemType = {
  inline?: boolean;
  editMode: boolean;
  hovered: boolean;
  rootPrefixCls?: string;
  active?: boolean;
  withCheckbox?: boolean;
};

export const rootPrefix = ({ rootPrefixCls }: TagsListItemType): string => rootPrefixCls || 'ant-menu';

export const applyDots = (color: string): FlattenSimpleInterpolation => css`
  background-color: transparent;
  background-origin: border-box;
  background-position: 0 19px;
  background-size: 5px 1px;
  background-repeat: repeat-x;
  background-image: linear-gradient(to right, ${color} 20%, rgba(255, 255, 255, 0) 10%);
`;

export const InlineEditWrapper = styled.div`
  display: flex;
  flex: 1;
  padding-bottom: 2px;
`;

export const InlineEditInput = styled(BorderLessInput)<DSInputProps>`
  padding: 0;
  margin: 0;
  text-decoration: none;
  width: 100%;
`;

export const SuffixWrapper = styled.div`
  transition: opacity 0.2s ease-out;
`;

export const TagIconFav = styled(Icon)``;

export const TagIcon = styled(Icon)`
  svg {
    fill: ${(props): string => props.theme.palette['grey-600']};
  }
`;

export const TagsListItem = styled(Menu.Item)<TagsListItemType>`
  &&&& {
    min-height: 32px;
    z-index: 1;
    border-radius: 3px !important;
    ${SuffixWrapper}:not(.suffix-wrapper-hovered) {
      opacity: 0;
    }
    ${InlineEditWrapper} {
      ${(props): FlattenSimpleInterpolation => applyDots(props.theme.palette['grey-600'])}
    }
    .ds-menu-content-wrapper > .ds-menu-content {
      width: 100%;
      margin-right: 8px;
      margin-top: ${(props): string => (props.editMode ? '-2px' : '0')};
    }

    ${(props): FlattenSimpleInterpolation | false =>
      props.editMode &&
      css`
        & {
          background-color: ${props.theme.palette['grey-050']};
          ${SuffixWrapper} {
            display: none;
          }
        }
      `}

    ${(props): FlattenSimpleInterpolation | false =>
      props.hovered &&
      css`
        & {
          background-color: ${props.theme.palette['grey-050']};
        }
      `}

    .ds-checkbox {
      display: none;
    }

    &:hover {
      ${SuffixWrapper} {
        ${(props): string | false => !!props.inline && 'display:flex;'}
        opacity: 1;
      }
      ${InlineEditWrapper} {
        ${(props): FlattenSimpleInterpolation => applyDots(props.theme.palette['blue-600'])}
      }
    }

    &:hover,
    &.${rootPrefix}-item-selected {
      .ds-checkbox {
        display: block;
      }
      ${TagIconFav}, ${TagIcon} {
        ${(props): string => (props.withCheckbox ? 'display: none ! important' : '')};
        svg,
        svg > path:not(:first-child) {
          fill: ${(props): string => props.theme.palette['blue-600']} !important;
        }
      }
    }
  }
`;

export const TagsListText = styled.div`
  padding-right: 20px;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;

  mark.highlight {
    padding: 0;
    background: none;
    font-weight: 600;
    color: inherit;
  }

  span.unhighlight {
    font-weight: 400;
    color: inherit;
  }
`;

export const TagsListTextHighlight = styled.span`
  background: #ff0;
  font-weight: 500;
`;

export const PrefixWrapper = styled.div<{
  favourite?: boolean;
}>`
  min-width: 24px;
  text-align: center;

  ${TagIconFav} {
    display: ${({ favourite }): string => (favourite ? 'flex' : 'none ! important')};
  }
  ${TagIcon} {
    display: ${({ favourite }): string => (!favourite ? 'flex' : 'none ! important')};
  }
`;
