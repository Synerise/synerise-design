import styled, { css, FlattenSimpleInterpolation, keyframes } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { MaskedDatePlaceholder } from './Elements/DatePicker/DatePicker.styles';

const disableBlinkingCursor = (props: ThemeProps & { grey: boolean }): FlattenSimpleInterpolation => css`
  color: transparent;
  text-shadow: 0 1px ${props.grey ? props.theme.palette['grey-500'] : props.theme.palette['grey-600']};
`;

export const blurAnimation = keyframes`
  0% {
        padding: 7px 14px 7px 12px;
  }
  100% {
        padding: 7px 26px 7px 0px;
  }
`;

export const ValueArea = styled.textarea<{ grey: boolean }>`
  cursor: default;
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
`;
export const MainContent = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1;
  word-wrap: break-word;
  overflow-wrap: break-word;
  width: 100%;
  height: 100%;
  transition: color 0.1s ease-in 0.2s;
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
export const Container = styled.div<{ active: boolean }>`
  position: relative;
  width: 100%;
  ${(props): false | FlattenSimpleInterpolation =>
    props.active &&
    css`
      margin: -2px 0 0 -1px;
    `}

  > div {
    margin: 0;
  }
`;
export const Inactive = styled.div<{ rows?: number; blurred: boolean; datePicker?: boolean; datePickerValue?: Date }>`
  position: relative;
  width: 100%;
  min-height: 32px;
  ${(props): false | string => !!props.rows && `height: ${props.rows * 17 + 17}px;`}
  align-items: flex-start;
  background: ${(props): string => props.theme.palette.white};
  display: flex;
  padding: 7px 26px 7px 0px;
  border-radius: 3px;
  transition: padding 0.1s ease-in, background 0.1s ease-in;
  transition-delay: 0.2s;
  ${(props): false | FlattenSimpleInterpolation =>
    props.blurred &&
    css`
      animation: ${blurAnimation} 0.1s ease-in;
    `}
  ${(props): FlattenSimpleInterpolation =>
    css`
      &:hover {
        padding: 7px 14px 7px 12px;
        background: ${props.theme.palette['grey-050']};
        ${MainContent} {
          ${props.datePicker && !props.datePickerValue && `color: transparent;`}
          ${MaskedDatePlaceholder} {
            left: 12px;
            ${props.datePicker && !props.datePickerValue && `color: ${props.theme.palette['grey-600']};`}
          }
        }
        ${Suffix} {
          opacity: 1;
        }
      }
    `}
`;
export const Subtle = styled.div``;
export const ContentAbove = styled.div<{ active: boolean }>`
  padding: 0 0 0 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props): string => (props.active ? `9px` : `8px`)};
`;
