import styled, { css } from 'styled-components';
import { TagShape } from './Tag';

const defaultStatusStyles = css`
  border-radius: 8px;
  padding: 0 8px;
  font-size: 10px;
  height: 16px;
  line-height: 14px;
  text-transform: uppercase;
`;

const insertShapeStyles = (props): string => {
  switch (props.shape) {
    case TagShape.SMALL_SQUARE:
      return css`
        background-color: ${props.color || props.theme.palette['grey-500']};
        color: ${props.textColor || '#fff'};
        border-radius: 3px;
        padding: 0 4px;
        font-size: 10px;
        height: 16px;
        line-height: 16px;
        text-transform: uppercase;
        font-weight: 500;
      `;

    case TagShape.SMALL_ROUND:
      return css`
        background-color: ${props.color || props.theme.palette['grey-500']};
        color: ${props.textColor || '#fff'};
        border-radius: 8px;
        padding: 0 4px;
        font-size: 10px;
        height: 16px;
        line-height: 16px;
        text-transform: uppercase;
      `;

    case TagShape.DEFAULT_ROUND:
      return css`
        background-color: ${props.color || props.theme.palette['grey-500']};
        color: ${props.textColor || '#fff'};
        border-radius: 12px;
        padding: 0 12px;
        font-size: 13px;
        height: 24px;
        line-height: 24px;
      `;

    case TagShape.DEFAULT_SQUARE:
      return css`
        background-color: ${props.color || props.theme.palette['grey-500']};
        color: ${props.textColor || '#fff'};
        border-radius: 3px;
        padding: 0 8px;
        font-size: 13px;
        height: 24px;
        line-height: 24px;
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

export const Tag = styled.div<{ shape: string; color: string; textColor: string }>`
  margin: 4px;
  display: inline-flex;
  font-weight: 500;

  ${insertShapeStyles}

  img {
    width: 18px;
    height: 18px;
    margin: 3px 4px 0 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

export const DeleteButton = styled.div``;
