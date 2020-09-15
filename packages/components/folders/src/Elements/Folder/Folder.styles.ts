import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Menu from '@synerise/ds-menu';
import { BorderLessInput } from '@synerise/ds-input/dist/InputMultivalue/InputMultivalue.styles';
import { Props as DSInputProps } from '@synerise/ds-input/dist/Input';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

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
export const FolderItem = styled(Menu.Item)<
  MenuItemProps & JSX.IntrinsicAttributes & { inline: boolean; editMode: boolean }
>`
  && {
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

    &:hover {
      ${SuffixWrapper} {
        ${(props): string | false => props.inline && 'display:flex;'}
        opacity: 1;
      }
      ${InlineEditWrapper} {
        ${(props): FlattenSimpleInterpolation => applyDots(props.theme.palette['blue-600'])}
      }
    }
  }
`;

export const FolderText = styled.div`
  padding-right: 20px;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
`;
export const PrefixWrapper = styled.div``;
