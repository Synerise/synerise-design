import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Size } from './AvatarGroup.types';

const SIZES = {
  small: '24px',
  medium: '32px',
  large: '40px',
  extraLarge: '80px',
};

const FONT_SIZES = {
  small: '11px',
  medium: '13px',
  large: '13px',
  extraLarge: '21px',
};

const MARGINS = {
  small: '-8px',
  medium: '-12px',
  large: '-16px',
  extraLarge: '-36px',
};

const applyMoreInfoStyles = (size: Size): FlattenSimpleInterpolation => {
  return css`
    width: ${SIZES[`${size}`] || '32px'};
    height: ${SIZES[`${size}`] || '32px'};
    font-size: ${FONT_SIZES[`${size}`] || '13px'};
  `;
};

const applyMarginLeft = (size: Size): FlattenSimpleInterpolation => {
  return css`
    margin-left: ${MARGINS[`${size}`] || '16px'};
  `;
};

export const Group = styled.div<{ size: Size }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  && {
    .ant-badge {
      transition: all 0.3s ease;
      ${(props): FlattenSimpleInterpolation | false => applyMarginLeft(props.size)};
      &:first-of-type {
        margin-left: 0;
      }
      .ant-badge-dot {
        transition: all 0.3s ease;
        opacity: 0;
      }
      .ant-avatar {
        pointer-events: none;
        box-shadow: 0 0 0 2px ${(props): string => `${props.theme.palette.white}FF`};
      }
    }
    &:hover {
      .ant-badge {
        margin-left: 8px;
        &:first-of-type {
          margin-left: 0;
        }
        .ant-badge-dot {
          opacity: 1;
        }
        .ant-avatar {
          pointer-events: all;
          box-shadow: 0 0 0 2px ${(props): string => `${props.theme.palette.white}00`};
        }
      }
    }
  }
`;

export const MoreInfo = styled.div<{ size: Size }>`
  ${(props): FlattenSimpleInterpolation | false => applyMoreInfoStyles(props.size)};
  box-shadow: 0 0 0 1px ${(props): string => props.theme.palette['grey-300']};
  margin-left: 8px;
  border-radius: 50%;
  color: ${(props): string => props.theme.palette['grey-400']};
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.45;
  cursor: pointer;
  position: relative;
  &:after {
    content: '';
    border-radius: 50%;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    position: absolute;
    top: 1px;
    left: 1px;
    transition: all 0.3s ease;
    box-shadow: 0 0 0 2px transparent;
    box-sizing: border-box;
  }
  &:hover {
    &:after {
      box-shadow: 0 0 0 1px ${(props): string => props.theme.palette['grey-200']};
    }
  }
`;
