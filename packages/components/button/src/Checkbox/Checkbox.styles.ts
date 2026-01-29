import styled from 'styled-components';

import { CheckboxDeafultM, CheckboxM } from '@synerise/ds-icon';

export const IconWrapper = styled.span<{ active?: boolean; error?: boolean }>`
  &&&& {
    color: ${({ theme, active, error }) => {
      if (error) {
        return theme.palette['red-600'];
      }

      return active ? theme.palette['blue-600'] : theme.palette['grey-300'];
    }};
    svg {
      fill: ${({ theme, active, error }) => {
        if (error) {
          return theme.palette['red-600'];
        }

        return active ? theme.palette['blue-600'] : theme.palette['grey-300'];
      }};
    }
  }

  .ant-btn[disabled] & .ds-icon svg {
    fill: ${({ theme }) => theme.palette['grey-200']} !important;
  }

  .ant-btn:hover & .ds-icon svg,
  .ant-btn:focus:hover & .ds-icon svg {
    fill: ${({ theme }) => theme.palette['blue-600']};
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
    background: ${({ theme }) => theme.palette.white};
  }

  .ds-button.ant-btn[disabled] &::before,
  .ds-button.ant-btn[disabled]:hover &::before {
    background: ${({ theme }) => theme.palette['grey-050']};
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
