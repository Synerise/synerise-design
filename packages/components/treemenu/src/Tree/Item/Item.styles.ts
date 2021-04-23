/* eslint @typescript-eslint/no-explicit-any: 0 */
import Menu from '@synerise/ds-menu';
import styled, { FlattenSimpleInterpolation, FlattenInterpolation, css } from 'styled-components';
import { BorderLessInput } from '@synerise/ds-input/dist/InputMultivalue/InputMultivalue.styles';
import { Props as DSInputProps } from '@synerise/ds-input/dist/Input.types';
import Icon from '@synerise/ds-icon';

export const ArrowIcon = styled(Icon)<{ expanded: boolean }>`
  transition: transform 0.2s ease;

  ${(props): FlattenSimpleInterpolation | string =>
    props.expanded
      ? css`
          transform: rotate(90deg);
        `
      : ''}
`;

export const ButtonFiller = styled.div`
  position: absolute;
  top: 0;
  background: #000;
`;

export const SuffixWrapper = styled.div`
  display: flex;
  // width: 0;
  overflow: hidden;
  //transition: all 0.2s ease-out;
`;

export const Item = styled(Menu.Item)`
  width: auto !important;
  padding-left: 4px !important;
  border-radius: 0;

  :hover,
  &.ant-menu-item-selected {
    ${SuffixWrapper} {
      // width: 100%;
    }
  }
`;

export const applyDots = (color: string): FlattenSimpleInterpolation => css`
  background-color: transparent;
  background-origin: border-box;
  background-position: 0 19px;
  background-size: 5px 1px;
  background-repeat: repeat-x;
  background-image: linear-gradient(to right, ${color} 20%, rgba(255, 255, 255, 0) 10%);
`;

export const DragHandle = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  cursor: grab;
  opacity: 0;
  pointer-events: none;

  :active {
    cursor: grabbing;
  }
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
  color: ${(props): string => props.theme.palette['blue-600']};
`;

export const DEFAULT_DEPTH_WIDTH = 24;

export type ItemContainerProps = {
  depth: number;
  selected?: boolean;
  ghost?: boolean;
  fullWidth?: boolean;
  isDraggable?: boolean;
  editMode?: boolean;
};

export const ItemContainer = styled.div<ItemContainerProps>`
  position: relative;

  .ds-tree-menu-no-pointer & {
    pointer-events: none;
  }

  ${Item} {
    border-left: 2px solid transparent;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    box-shadow: none !important;

    :focus {
      background: none;
    }

    ${(props): FlattenSimpleInterpolation | false =>
      props.editMode
        ? css`
            background: ${props.theme.palette['blue-050']};
            border-left-color: transparent;
            color: ${props.theme.palette['blue-600']};

            ${DragHandle} {
              visibility: hidden;
            }
          `
        : false}

    ${(props): FlattenSimpleInterpolation =>
      props.fullWidth || props.fullWidth === undefined
        ? css`
            padding-left: ${props.depth * DEFAULT_DEPTH_WIDTH + 8}px !important;
          `
        : css`
            margin-left: ${props.depth * DEFAULT_DEPTH_WIDTH}px !important;
            padding-left: 8px !important;
          `};
  }

  ${InlineEditWrapper} {
    ${(props): FlattenSimpleInterpolation => applyDots(props.theme.palette['grey-600'])}
  }

  :hover {
    ${Item} {
      border-left-color: ${(props): string => props.theme.palette['blue-600']};
    }

    ${DragHandle} {
      opacity: 0.25;
    }
  }

  ${(props): FlattenInterpolation<any> | string =>
    props.selected
      ? css`
          border-left-color: ${props.theme.palette['blue-600']};
          ${Item} {
            background: ${props.theme.palette['blue-050']};
          }
        `
      : ''}

  &.ds-tree-menu-helper {
    border-left: 0;
    border-top-left-radius: 3px !important;
    border-bottom-left-radius: 3px !important;

    ${Item} {
      background: ${(props): string => props.theme.palette['blue-050']};
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15) !important;
      pointer-events: none;
      padding-left: 0 !important;
      border-left: 0;

      ${DragHandle} {
        visibility: hidden;
      }
    }
  }
`;

export const ItemGhost = styled(ItemContainer)`
  position: absolute;
  left: 0;
  right: 0;
  border-left-color: ${(props): string => props.theme.palette['blue-600']};
  opacity: 0;
  transition: background 0.2s ease-out;

  ${Item} {
    background: ${(props): string => props.theme.palette['blue-050']} !important;
    transition: all 0.2 ease-out !important;
    border-left-color: ${(props): string => props.theme.palette['blue-600']};

    &:hover {
      background: ${(props): string => props.theme.palette['blue-050']};
    }
  }

  &.show {
    transition: top 0.2s ease-out;
    opacity: 1;
  }
`;
