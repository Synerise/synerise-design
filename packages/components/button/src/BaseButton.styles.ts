import styled from 'styled-components';

/**
 * DS-specific props that must NOT be forwarded to the native <button>.
 */
const dsProps = new Set([
  'mode',
  'justifyContent',
  'groupVariant',
  'customColor',
  'pressed',
  'iconColor',
  'error',
  'readOnly',
  'expanderSize',
  'expanded',
  'htmlType',
  'loading',
]);

export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !dsProps.has(prop as string),
})`
  & {
    position: relative;
    font-weight: 500;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 0 solid transparent;
    box-shadow: none;
    text-shadow: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
    touch-action: manipulation;
    height: 32px;
    font-size: 13px;
    border-radius: 3px;
    outline: 0;
    text-decoration: none;

    &:not([disabled]):hover {
      text-decoration: none;
    }
    &:not([disabled]):active {
      outline: 0;
    }
    &[disabled] {
      cursor: not-allowed;
    }

    > span {
      display: contents;
    }

    &.ant-btn-lg {
      height: 48px;
      font-size: 14px;
    }
    &.ant-btn-sm {
      height: 28px;
      padding: 0 12px;
      font-size: 13px;
    }
    &.ant-btn-block {
      width: 100%;
    }
    &.ant-btn-loading {
      cursor: default;
      pointer-events: none;
    }
  }
`;
