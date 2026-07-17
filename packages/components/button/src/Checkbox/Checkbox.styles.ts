import styled from 'styled-components';

import { CheckboxDeafultM, CheckboxM } from '@synerise/ds-icon';

export const IconWrapper = styled.span<{ active?: boolean; error?: boolean }>`
  && {
    color: ${({ active, error }) => {
      if (error) {
        return 'var(--ds-color-icon-danger-default)';
      }

      return active
        ? 'var(--ds-color-icon-brand-default)'
        : 'var(--ds-color-border-base-strong)';
    }};
  }

  .ant-btn[disabled] & .ds-icon {
    color: var(--ds-color-border-base-default) !important;
  }

  .ant-btn:hover & .ds-icon,
  .ant-btn:focus:hover & .ds-icon {
    color: var(--ds-color-icon-brand-default);
  }

  /* icon background */
  .ds-button.ant-btn &::before {
    content: '';
    display: 'block';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    margin: 5px;
    z-index: -1;
  }

  .ds-button.ant-btn &::before,
  .ds-button.ant-btn:hover &::before,
  .ds-button.ant-btn:focus:hover &::before {
    background: var(--ds-color-background-base-default);
  }

  .ds-button.ant-btn[disabled] &::before,
  .ds-button.ant-btn[disabled]:hover &::before {
    background: var(--ds-color-background-base-subtle);
  }
`;

export const DefaultIcon = styled(CheckboxDeafultM)`
  display: block;

  .ds-button.ant-btn:not([disabled]):hover & {
    display: none;
  }
`;

export const HoverIcon = styled(CheckboxM)`
  display: none;

  .ds-button.ant-btn:not([disabled]):hover & {
    display: block;
  }
`;

export default { IconWrapper };
