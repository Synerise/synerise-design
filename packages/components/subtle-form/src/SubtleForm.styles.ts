import styled, { css, FlattenSimpleInterpolation, keyframes } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { MaskedDatePlaceholder } from './Elements/DatePicker/DatePicker.styles';

const disableBlinkingCursor = (props: ThemeProps & { grey: boolean }): FlattenSimpleInterpolation => css`
  color: transparent;
  text-shadow: 0 1px ${props.grey ? props.theme.palette['grey-500'] : props.theme.palette['grey-600']};
`;

export const blurPadding = `7px 40px 7px 0px`;
export const focusPadding = `7px 28px 7px 12px`;
export const blurAnimation = keyframes`
  0% {
        padding:${focusPadding};
  }
  100% {
        padding:${blurPadding};
  }
`;

export const MainContent = styled.div<{ hasMargin?: boolean; breakWord?: boolean }>`
  ${(props): FlattenSimpleInterpolation =>
    props.breakWord
      ? css`
          display: flex;
          align-items: flex-start;
          flex: 1;
          word-wrap: break-word;
          overflow-wrap: break-word;
        `
      : css`
          overflow-wrap: nowrap;
          display: block;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        `}
  width: 100%;
  height: 100%;
  transition: color 0.1s ease-in 0.2s;
  ${(props): string | false =>
    !!props.hasMargin &&
    `margin-top:1px;
`}
`;

export const Suffix = styled.div<{ select?: boolean }>`
  position: absolute;
  right: ${(props): string => (props.select ? `9px` : `6px`)};
  top: 6px;
  display: flex;
  opacity: 0;
  height: 24px;
  transition: opacity 0.1s ease-in;
  transition-delay: 0.2s;
  margin-top: -2px;
  cursor: pointer;
`;

export const Inactive = styled.div<{
  rows?: number;
  blurred: boolean;
  mask?: boolean;
  disabled?: boolean;
}>`
  position: relative;
  width: 100%;
  min-height: 32px;
  ${(props): false | string => !!props.rows && `height: ${props.rows * 17 + 17}px;`}
  align-items: flex-start;
  background: ${(props): string => props.theme.palette.white};
  display: flex;
  padding: ${blurPadding};
  opacity: ${(props): string => (props.disabled ? `0.5` : `1`)};
  border-radius: 3px;
  transition: padding 0.1s ease-in, background 0.1s ease-in;
  transition-delay: 0.2s;

  && {
    ${(props): false | FlattenSimpleInterpolation =>
      !!props.disabled &&
      css`
        animation: none;
        textarea {
          cursor: not-allowed;
        }
      `}
  }

  ${(props): false | FlattenSimpleInterpolation =>
    props.blurred &&
    !props.disabled &&
    css`
      animation: ${blurAnimation} 0.1s ease-in;
    `}
  ${(props): false | FlattenSimpleInterpolation =>
    !props.disabled &&
    css`
      &:hover {
        padding: ${focusPadding};
        background: ${props.theme.palette['grey-050']};
        ${MainContent} {
          ${props.mask && `color: transparent;`}
          ${MaskedDatePlaceholder} {
            left: 12px;
            ${props.mask && `color: ${props.theme.palette['grey-600']};`}
          }
        }
        ${Suffix} {
          opacity: 1;
        }
      }
    `}
`;

export const ValueArea = styled.textarea<{ grey: boolean }>`
  && {
    font-variant-numeric: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
    ${(props): FlattenSimpleInterpolation => disableBlinkingCursor(props)}
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    overflow: auto;
    outline: none;
    box-shadow: none;
    resize: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Container = styled.div<{ active?: boolean; disabled?: boolean }>`
  &.ds-subtle-input {
    ${Inactive} {
      line-height: 18px;
    }
  }
  position: relative;
  width: 100%;
  ${(props): false | FlattenSimpleInterpolation =>
    !!props.active &&
    css`
      margin: -1px 0 0 -1px;
    `}

  > div {
    margin: 0;
  }

  .ds-subtle-select {
    .ant-select-selector: {
      transition: all 0s linear !important;
    }
  }
  && .ant-input-number-input {
    padding-bottom: 8px;
  }
  ${(props): FlattenSimpleInterpolation | false =>
    !!props.disabled &&
    css`
      && {
        cursor: not-allowed;
      }
    `}
`;

export const Subtle = styled.div<{ disabled?: boolean }>`
  ${(props): FlattenSimpleInterpolation | false =>
    !!props.disabled &&
    css`
      && {
        cursor: not-allowed;
      }
    `}
`;
export const ContentAbove = styled.div<{ active: boolean }>`
  padding: 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props): string => (props.active ? `9px` : `8px`)};
`;
