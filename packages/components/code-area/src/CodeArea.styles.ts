import styled, { css } from 'styled-components';

import { Text, Title } from '@synerise/ds-typography';

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AriaContainer = styled.div`
  flex: 0 0 0;
`;

export const EditorInnerWrapper = styled.div``;

export const CodeAreaContent = styled.div`
  flex: 1 1 100%;
  display: flex;
  min-height: 0;
  flex-direction: column;
`;

export const EditorWrapper = styled.div<{ hasError: boolean }>`
  border: solid 1px
    ${(props) =>
      props.hasError
        ? props.theme.palette['red-600']
        : props.theme.palette['grey-200']};
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  min-height: 0;
  padding-top: 12px;
  ${(props) =>
    props.hasError &&
    css`
      background: ${props.theme.palette['red-050']};
      box-shadow: inset 0 0 0 1px ${props.theme.palette['red-600']};
    `};
  canvas {
    opacity: 0;
  }
`;

export const FullscreenHeaderTitle = styled(Title)`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 0;
`;

export const FullscreenHeader = styled(FlexRow)`
  padding: 16px 24px;
`;

export const CodeAreaWrapper = styled.div<{
  readOnly: boolean;
  isFullscreen: boolean;
  requiredSpace: number;
  customHeight?: number | string;
  zIndex?: number | string;
}>`
  ${(props) => {
    if (props.isFullscreen) {
      return css`
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: ${props.zIndex !== undefined
          ? props.zIndex
          : props.theme.variables['zindex-modal']};
        left: 0;
        top: 0;
        background: ${props.theme.palette.white};
        ${EditorInnerWrapper} {
          height: calc(100vh - ${props.requiredSpace}px);
        }
        ${CodeAreaContent} {
          margin: 0 24px;
        }
      `;
    }
    return css`
      ${props.customHeight
        ? css`
            ${EditorInnerWrapper} {
              flex: 1 1 100%;
              min-height: 0;
            }
            height: ${typeof props.customHeight === 'number'
              ? `${props.customHeight}px`
              : props.customHeight};
          `
        : css`
            ${EditorInnerWrapper} {
              height: 295px;
            }
          `}
      display:flex;
      flex-direction: column;
      margin-bottom: 12px;
    `;
  }}
  ${EditorWrapper} {
    ${(props) =>
      props.readOnly &&
      css`
        background: ${props.theme.palette['grey-050']};
        .monaco-editor .cursors-layer > .cursor {
          display: none !important;
        }
      `};
  }
`;

export const AdditionalDescription = styled.div`
  margin-bottom: 8px;
`;

export const ContentBelow = styled(FlexRow)<{ isEmpty?: boolean }>`
  ${(props) => !props.isEmpty && `margin-top: 8px;`}
  align-items: flex-start;
`;
export const ContentAbove = styled(FlexRow)`
  margin-bottom: 8px;
  flex: 0 0 auto;
`;

export const SyntaxTitle = styled(Text)``;

export const BottomBar = styled(FlexRow)`
  border-top: solid 1px ${(props) => props.theme.palette['grey-200']};
  padding: 8px;
  flex: 0 0 auto;
`;

export const LeftSide = styled.div``;
export const RightSide = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;
`;

export const SyntaxSelect = styled(LeftSide)`
  padding-left: 8px;
`;
export const BottomBarElement = styled.div``;
export const Description = styled.div``;
export const Counter = styled.div`
  font-weight: 500;
`;

export const ErrorText = styled.div`
  color: ${(props) => props.theme.palette['red-600']};
  margin-bottom: 4px;
`;
