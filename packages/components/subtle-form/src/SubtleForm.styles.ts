import styled, { css, keyframes } from 'styled-components';

import FormField from '@synerise/ds-form-field';
import { TextareaWrapper } from '@synerise/ds-input/dist/Textarea/Textarea.styles';
import { hexToRgba } from '@synerise/ds-utils';

import { MaskedDatePlaceholder } from './Elements/DatePicker/DatePicker.styles';

const VERTICAL_PADDING = '8px';
const VERTICAL_PADDING_TEXTAREA = '6px';

type PaddingProps = { hasSuffix?: boolean; state?: 'hovered' | 'focused' };

export const getFocusPadding = ({
  hasSuffix = true,
  state = 'hovered',
}: PaddingProps) => {
  const verticalPadding =
    state === 'focused' ? VERTICAL_PADDING_TEXTAREA : VERTICAL_PADDING;
  return `${verticalPadding} ${hasSuffix ? '28px' : '8px'} ${verticalPadding}  ${state === 'focused' ? '8px' : '7px'}`;
};
export const getBlurPadding = ({ hasSuffix = true }: PaddingProps) => {
  return hasSuffix ? `8px 16px 8px 0` : `8px 40px 8px 0`;
};

const getBlurAnimation = (props: PaddingProps) => {
  return keyframes`
    0% {
          padding: ${getFocusPadding(props)};
    }
    100% {
          padding: ${getBlurPadding(props)}
    }
  `;
};

export const MainContent = styled.div<{
  hasMargin?: boolean;
  breakWord?: boolean;
}>`
  ${(props) =>
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
  ${(props) =>
    !!props.hasMargin &&
    `margin-top:1px;
`}
`;

export const Suffix = styled.div<{ select?: boolean }>`
  position: absolute;
  right: ${(props) => (props.select ? `9px` : `6px`)};
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
  $rows?: number;
  $blurred: boolean;
  $mask?: boolean;
  $disabled?: boolean;
  isSuffixVisible?: boolean;
  isTextareaComponent?: boolean;
}>`
  position: relative;
  width: 100%;
  height: 32px;
  display: flex;
  ${(props) => !!props.$rows && `height: ${props.$rows * 17 + 17}px;`}
  align-items: flex-start;
  background: transparent;
  padding: ${(props) => getBlurPadding({ hasSuffix: props.isSuffixVisible })};
  opacity: ${(props) => (props.$disabled ? `0.5` : `1`)};
  border-radius: 3px;
  transition:
    padding 0.1s ease-in,
    background 0.1s ease-in;
  transition-delay: 0.2s;

  && {
    ${(props) =>
      !!props.$disabled &&
      css`
        animation: none;
        textarea {
          cursor: not-allowed;
        }
      `}
  }

  ${(props) =>
    props.$blurred &&
    !props.$disabled &&
    css`
      animation: ${getBlurAnimation({ hasSuffix: props.isSuffixVisible })} 0.1s
        ease-in;
    `}
  ${(props) =>
    !props.$disabled &&
    css`
      &:hover {
        padding: ${getFocusPadding({ hasSuffix: props.isSuffixVisible })};
        background: ${hexToRgba(props.theme.palette['grey-300'], 0.4)};
        ${MainContent} {
          ${props.$mask && `color: transparent;`}
          ${MaskedDatePlaceholder} {
            left: 12px;
            ${props.$mask && `color: ${props.theme.palette['grey-600']};`}
          }
        }
        ${Suffix} {
          opacity: 1;
        }
      }
    `}
`;

export const ValueArea = styled.textarea<{ isPlaceholder: boolean }>`
  && {
    font-variant-numeric: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
    color: transparent;
    text-shadow: 0 1px
      ${(props) =>
        props.isPlaceholder
          ? props.theme.palette['grey-500']
          : props.theme.palette['grey-600']};

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
    .ant-input::placeholder {
      line-height: 16px;
    }
  }
  position: relative;
  width: 100%;
  ${(props) =>
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
  && .ant-input-number-input::placeholder {
    padding-bottom: 8px;
  }
  ${(props) =>
    !!props.disabled &&
    css`
      && {
        cursor: not-allowed;
      }
    `}
`;

export const Subtle = styled.div<{ $disabled?: boolean; hasError?: boolean }>`
  ${(props) =>
    !!props.$disabled &&
    css`
      && {
        cursor: not-allowed;
      }
    `}

  ${TextareaWrapper}:focus-within {
    ${(props) =>
      props.hasError
        ? `background-color: ${hexToRgba(props.theme.palette['red-100'], 0.4)};`
        : `background-color: ${hexToRgba(props.theme.palette['blue-100'], 0.4)};`}
  }
`;

export const SubtleFormField = styled(FormField)<{ $active: boolean }>`
  gap: ${(props) => (props.$active ? `9px` : `8px`)};
`;
