import styled, { css } from 'styled-components';
import { TagShape } from './Tag';

const defaultStatusStyles = css`
  border-radius: 8px;
  font-size: 10px;
  height: 16px;
  line-height: 14px;
  text-transform: uppercase;
  padding: 0 8px;
`;

const insertShapeStyles = (props): string => {
  switch (props.shape) {
    case TagShape.SMALL_SQUARE:
      return css`
        background-color: ${props.color || props.theme.palette['grey-500']};
        color: ${props.textColor || '#fff'};
        border-radius: 3px;
        font-size: 10px;
        height: 16px;
        line-height: 16px;
        text-transform: uppercase;
        font-weight: 500;
        padding: 0 4px;
      `;

    case TagShape.SMALL_ROUND:
      return css`
        background-color: ${props.color || props.theme.palette['grey-500']};
        color: ${props.textColor || '#fff'};
        border-radius: 8px;
        font-size: 10px;
        height: 16px;
        line-height: 16px;
        text-transform: uppercase;
        padding: 0 4px;
      `;

    case TagShape.DEFAULT_ROUND:
      return css`
        background-color: ${props.color || props.theme.palette['grey-500']};
        color: ${props.textColor || '#fff'};
        border-radius: 12px;
        font-size: 13px;
        height: 24px;
        line-height: 24px;

        padding: ${props.removable ? '0' : '0 12px'};

        span {
          padding: ${props.removable ? '0 0 0 12px' : '0'};
        }
      `;

    case TagShape.DEFAULT_SQUARE:
      return css`
        background-color: ${props.color || props.theme.palette['grey-500']};
        color: ${props.textColor || '#fff'};
        border-radius: 3px;
        font-size: 13px;
        height: 24px;
        line-height: 24px;
        padding: 0 8px;
      `;

    case TagShape.SINGLE_CHARACTER_SQUARE:
      return css`
        background-color: ${props.color || props.theme.palette['grey-500']};
        color: ${props.textColor || '#fff'};
        border-radius: 12px;
        font-size: 13px;
        height: 24px;
        width: 24px;
        line-height: 24px;
        justify-content: center;
      `;

    case TagShape.SINGLE_CHARACTER_ROUND:
      return css`
        background-color: ${props.color || props.theme.palette['grey-500']};
        color: ${props.textColor || '#fff'};
        border-radius: 3px;
        font-size: 13px;
        height: 24px;
        width: 24px;
        line-height: 24px;
        justify-content: center;
      `;

    case TagShape.STATUS_NEUTRAL:
      return css`
        border: 1px solid ${props.color || props.theme.palette['grey-500']};
        color: ${props.textColor || props.color || props.theme.palette['grey-500']};
        ${defaultStatusStyles}
      `;

    case TagShape.STATUS_SUCCESS:
      return css`
        border: 1px solid ${props.theme.palette['green-600']};
        color: ${props.theme.palette['green-600']};
        ${defaultStatusStyles}
      `;

    case TagShape.STATUS_ERROR:
      return css`
        border: 1px solid ${props.theme.palette['red-600']};
        color: ${props.theme.palette['red-600']};
        ${defaultStatusStyles}
      `;

    case TagShape.STATUS_WARNING:
      return css`
        border: 1px solid ${props.theme.palette['yellow-600']};
        color: ${props.theme.palette['yellow-600']};
        ${defaultStatusStyles}
      `;

    default:
      return css``;
  }
};

export const Tag = styled.div<{ shape: string; color: string; textColor: string; removable: boolean }>`
  margin: 4px;
  display: inline-flex;
  font-weight: 500;

  ${insertShapeStyles}

  img {
    width: 18px;
    height: 18px;
    margin: 3px 4px 0 0;
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  button {
    background-color: ${(props): string => props.theme.palette['yellow-800']};
    color: #fff;
    height: 18px;
    width: 18px;
    line-height: 17px;
    border-radius: 10px;
    padding: 0;
    border: none;
    outline: none;
    margin: 3px 3px 3px 7px;
    text-align: center;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

export const DeleteButton = styled.div``;
