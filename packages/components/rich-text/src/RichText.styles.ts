import styled, { css, keyframes } from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';
import { hexToRgba } from '@synerise/ds-utils';

// Height of the toolbar row that unmounts when subtle mode deactivates.
const TOOLBAR_HEIGHT_PX = 44;

// On deactivation the toolbar disappears instantly; compensate with extra
// top padding and animate it away, mirroring SubtleForm's blur animation.
const subtleBlurAnimation = keyframes`
  0% {
    padding-top: ${12 + TOOLBAR_HEIGHT_PX}px;
  }
  100% {
    padding-top: 12px;
  }
`;

export const RichTextWrapper = styled.div<{
  $disabled?: boolean;
}>`
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.$disabled &&
    css`
      opacity: 0.4;
      pointer-events: none;
    `};
`;

export const SubtleSuffix = styled.div`
  position: absolute;
  right: 6px;
  top: 6px;
  display: flex;
  opacity: 0;
  height: 24px;
  transition: opacity 0.1s ease-in;
  transition-delay: 0.2s;
  pointer-events: none;
`;

export const EditorWrapper = styled.div<{
  $hasError?: boolean;
  $noBorder?: boolean;
  $isFocused?: boolean;
  $subtlePreview?: boolean;
  $subtleBlurred?: boolean;
  $animations?: boolean;
}>`
  position: relative;
  border: ${(props) =>
    props.$noBorder
      ? 'none'
      : props.$subtlePreview
        ? 'solid 1px transparent'
        : `solid 1px ${
            props.$hasError
              ? props.theme.palette['red-600']
              : props.$isFocused
                ? props.theme.palette['blue-600']
                : props.theme.palette['grey-200']
          }`};
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition:
    border-color 0.2s ease,
    background 0.1s ease-in;

  ${(props) =>
    props.$subtlePreview &&
    css`
      cursor: pointer;

      /* && beats EditorArea's ".ProseMirror { padding: 12px }", which is
         injected later and would otherwise win the equal-specificity tie. */
      && .ProseMirror {
        cursor: pointer;
        padding-left: 0;
      }

      &&:hover {
        background: ${hexToRgba(props.theme.palette['grey-300'], 0.4)};

        ${SubtleSuffix} {
          opacity: 1;
        }
      }

      ${props.$animations
        ? css`
            /* Match SubtleForm hover timing (0.1s ease-in, 0.2s delay). */
            transition:
              border-color 0.2s ease,
              background 0.1s ease-in 0.2s;

            && .ProseMirror {
              transition: padding 0.1s ease-in 0.2s;
            }

            /* Idle preview sits closer to the label; hovering drops the
               placeholder back to the editing position, so it travels
               down + right together. */
            && .ProseMirror p.is-editor-empty:first-child::before {
              transform: translateY(-6px);
              transition: transform 0.1s ease-in 0.2s;
            }

            &&:hover {
              .ProseMirror {
                padding-left: 12px;
              }

              .ProseMirror p.is-editor-empty:first-child::before {
                transform: translateY(0);
              }
            }
          `
        : css`
            /* Animations disabled: hovering only tints the background,
               instantly — content and placeholder stay put. */
            transition: border-color 0.2s ease;

            ${SubtleSuffix} {
              transition: none;
            }
          `};
    `};

  ${(props) =>
    props.$subtlePreview &&
    props.$subtleBlurred &&
    props.$animations &&
    css`
      && .ProseMirror {
        /* "backwards" fill keeps the +44px frame applied during the 0.2s
           delay, so the compensation is instant and collapses in sync with
           the left-padding transition. */
        animation: ${subtleBlurAnimation} 0.1s ease-in 0.2s backwards;
      }
    `};

  ${(props) =>
    props.$hasError &&
    css`
      background: ${props.theme.palette['red-050']};
      ${!props.$noBorder &&
      css`
        outline: 1px solid ${props.theme.palette['red-600']};
        outline-offset: -1px;
      `};
    `};

  ${(props) =>
    props.$isFocused &&
    !props.$hasError &&
    !props.$noBorder &&
    css`
      outline: 1px solid ${props.theme.palette['blue-600']};
      outline-offset: -1px;
    `};
`;

export const ToolbarArea = styled.div`
  padding: 4px;
  box-shadow: inset 0 -1px 0 0
    ${(props: ThemeProps) => props.theme.palette['grey-200']};

  > div {
    > div {
      flex: 0 0 auto;
      background: transparent;
      box-shadow: none;
      padding: 2px;
      border-radius: 0;
    }
  }
`;

/* Single-row toolbar: items that don't fit collapse into the "more" (⋯)
   dropdown instead of wrapping or scrolling. Declared after ToolbarArea so
   the && override wins its "> div > div" reset. */
export const ToolbarItems = styled.div`
  && {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
  }

  > * {
    flex: 0 0 auto;
  }
`;

/* One wrapper per toolbar entry so overflow measurement maps 1:1 to entries —
   tooltip-wrapped buttons otherwise render extra hidden anchor children. */
export const ToolbarEntry = styled.span`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
`;

export const EditorArea = styled.div<{
  $height?: string | number;
  $maxHeight?: string | number;
  $readOnly?: boolean;
  $subtlePreview?: boolean;
}>`
  .ProseMirror {
    padding: 12px;
    outline: none;
    min-height: ${(props) => (props.$subtlePreview ? '32px' : '120px')};
    height: ${(props) =>
      props.$height
        ? typeof props.$height === 'number'
          ? `${props.$height}px`
          : props.$height
        : 'auto'};
    max-height: ${(props) =>
      props.$maxHeight
        ? typeof props.$maxHeight === 'number'
          ? `${props.$maxHeight}px`
          : props.$maxHeight
        : 'none'};
    overflow-y: auto;
    font-size: 13px;
    line-height: 1.6;
    color: ${(props: ThemeProps) => props.theme.palette['grey-800']};

    ${(props) =>
      props.$readOnly &&
      css`
        background: ${props.theme.palette['grey-050']};
        cursor: default;
      `};

    > * + * {
      margin-top: 0.5em;
    }

    h1 {
      font-size: 24px;
      font-weight: 500;
      line-height: 1.3;
      margin: 0 0 0.5em;
    }

    h2 {
      font-size: 20px;
      font-weight: 500;
      line-height: 1.3;
      margin: 0 0 0.5em;
    }

    h3 {
      font-size: 16px;
      font-weight: 500;
      line-height: 1.3;
      margin: 0 0 0.5em;
    }

    p {
      margin: 0 0 4px;
    }

    ul,
    ol {
      padding-left: 24px;
      margin: 0 0 4px;
    }

    li {
      margin: 2px 0;
    }

    a {
      color: ${(props: ThemeProps) => props.theme.palette['blue-600']};
      text-decoration: underline;
      cursor: pointer;
    }

    code {
      background: ${(props: ThemeProps) => props.theme.palette['grey-100']};
      padding: 2px 4px;
      border-radius: 3px;
      font-family:
        'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 12px;
    }

    pre {
      background: ${(props: ThemeProps) => props.theme.palette['grey-100']};
      padding: 12px;
      border-radius: 3px;
      overflow-x: auto;

      code {
        background: none;
        padding: 0;
        border-radius: 0;
        font-size: 12px;
      }
    }

    blockquote {
      border-left: 3px solid
        ${(props: ThemeProps) => props.theme.palette['grey-300']};
      padding-left: 12px;
      margin: 0 0 4px;
      color: ${(props: ThemeProps) => props.theme.palette['grey-500']};
    }

    .ds-rt-code-snippet {
      position: relative;
      display: flex;
      align-items: center;
      background: ${(props: ThemeProps) => props.theme.palette['grey-050']};
      border-radius: 3px;
      padding: 6px 40px 6px 12px;
      margin: 0 0 4px;

      code {
        flex: 1 1 auto;
        background: none;
        padding: 0;
        border-radius: 0;
        white-space: pre;
        overflow-x: auto;
        outline: none;
      }

      .ds-rt-code-snippet__actions {
        position: absolute;
        top: 50%;
        right: 4px;
        transform: translateY(-50%);
      }
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin: 0 0 4px;
      table-layout: fixed;
      overflow: hidden;

      td,
      th {
        border: 1px solid
          ${(props: ThemeProps) => props.theme.palette['grey-300']};
        padding: 6px 10px;
        vertical-align: top;
        text-align: left;
        position: relative;

        > * {
          margin: 0;
        }
      }

      th {
        background: ${(props: ThemeProps) => props.theme.palette['grey-050']};
        font-weight: 500;
      }

      .selectedCell::after {
        content: '';
        position: absolute;
        inset: 0;
        background: ${(props: ThemeProps) => props.theme.palette['blue-050']};
        opacity: 0.4;
        pointer-events: none;
      }
    }

    s {
      text-decoration: line-through;
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 3px;
      display: block;
      margin: 8px 0;

      &.ProseMirror-selectednode {
        outline: 2px solid
          ${(props: ThemeProps) => props.theme.palette['blue-600']};
        outline-offset: 2px;
      }
    }
  }

  .ProseMirror p.is-editor-empty:first-child::before {
    color: ${(props: ThemeProps) => props.theme.palette['grey-400']};
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
`;

export const ContentAbove = styled.div`
  margin-bottom: 8px;
`;

export const ContentBelow = styled.div`
  margin-top: 8px;
`;

export const ErrorText = styled.div`
  color: ${(props: ThemeProps) => props.theme.palette['red-600']};
  font-size: 13px;
  line-height: 1.39;
`;

export const Description = styled.div`
  color: ${(props: ThemeProps) => props.theme.palette['grey-500']};
  font-size: 13px;
  line-height: 1.39;
`;

export const AiGradientLabel = styled.span`
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.palette['mars-500']} 0%,
    ${(props) => props.theme.palette['purple-400']} 100%
  );
  /* Paint the glyphs with the gradient. text-fill-color wins over the
     button variant's "color: inherit", so no specificity battle. */
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const ToolbarSeparator = styled.div`
  /* && raises specificity above ToolbarArea's "> div > div" reset, which would
     otherwise force background: transparent / padding onto this element. */
  && {
    align-self: center;
    flex: 0 0 auto;
    width: 1px;
    height: 18px;
    min-height: 18px;
    margin: 0 4px;
    padding: 0;
    border-radius: 0;
    background: ${(props: ThemeProps) => props.theme.palette['grey-200']};
  }
`;

// PopoverContent renders a bare positioned container, so the floating surface
// (background / border / shadow) must come from the content itself.
const popoverSurface = css`
  background: ${(props) => props.theme.palette.white};
  border: 1px solid ${(props) => props.theme.palette['grey-200']};
  border-radius: 3px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
`;

export const BlockMenu = styled.div`
  ${popoverSurface};
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px;
  min-width: 160px;

  .ds-button {
    justify-content: flex-start;
  }

  /* The button centers its content via the inner label (flex-grow: 1 +
     justify-content: center), so the label needs the override too. */
  .ds-button-label {
    justify-content: flex-start;
  }
`;

export const PopoverForm = styled.div`
  ${popoverSurface};
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  min-width: 280px;
`;

export const PopoverActions = styled.div`
  display: flex;
  gap: 8px;
`;
