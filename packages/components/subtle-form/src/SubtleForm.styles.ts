import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

const disableBlinkingCursor = (props: ThemeProps & { grey: boolean }): FlattenSimpleInterpolation => css`
  color: transparent;
  text-shadow: 0 1px ${props.grey ? props.theme.palette['grey-500'] : props.theme.palette['grey-600']};
`;
export const ValueArea = styled.textarea<{ grey: boolean; active: boolean }>`
  &:hover {
    cursor: pointer;
  }
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
  word-break: break-all;
  width: 100%;
  height: 100%;
`;
export const Suffix = styled.div`
  display: flex;
  opacity: 0;
  height: 24px;
  transition: opacity 0.1s ease-in;
  margin-top: -2px;
`;
export const Container = styled.div<{ active: boolean }>`
  width: 100%;
  ${(props): false | FlattenSimpleInterpolation =>
    props.active &&
    css`
      margin: -1px 0 0 -1px;
    `}

  > div {
    margin: 0;
  }
`;
export const Inactive = styled.div<{ rows: number }>`
  min-height: 32px;
  height: ${(props): string => `calc(${props.rows * 17 + 17}px);`}
  align-items: flex-start;
  background: transparent;
  display: flex;
        padding: 7px 8px 7px 12px;
  border-radius: 3px;
  transition: background 0.1s ease-in;

  ${(props): FlattenSimpleInterpolation =>
    css`
      &:hover {
        background: ${props.theme.palette['grey-050']};
        cursor: pointer;
        ${Suffix} {
          opacity: 1;
        }
      }
    `}
`;
export const Subtle = styled.div``;
export const ContentAbove = styled.div<{ active: boolean }>`
  padding: 0 0 0 12px;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props): string => (props.active ? `9px` : `8px`)};
`;
