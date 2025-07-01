import styled from 'styled-components';

import { CheckboxDeafultM, CheckboxM } from '@synerise/ds-icon';

export const IconWrapper = styled.span<{ active?: boolean; error?: boolean }>`
  &&&& svg {
    fill: ${({ theme, active, error }): string => {
      if (error) {
        return theme.palette['red-600'];
      }

      return active ? theme.palette['blue-600'] : theme.palette['grey-300'];
    }};
  }

  .ant-btn-ghost[disabled] & .ds-icon svg {
    fill: ${({ theme }): string => theme.palette['grey-200']} !important;
  }

  .ant-btn-ghost:hover & .ds-icon svg,
  .ant-btn-ghost:focus:hover & .ds-icon svg {
    fill: ${({ theme }): string => theme.palette['blue-600']};
  }

  /* icon background */
  .ds-button.ant-btn-ghost &::before {
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

  .ds-button.ant-btn-ghost &::before,
  .ds-button.ant-btn-ghost:hover &::before,
  .ds-button.ant-btn-ghost:focus:hover &::before {
    background: ${({ theme }): string => theme.palette.white};
  }

  .ds-button.ant-btn-ghost[disabled] &::before,
  .ds-button.ant-btn-ghost[disabled]:hover &::before {
    background: ${({ theme }): string => theme.palette['grey-050']};
  }
`;

export const DefaultIcon = styled(CheckboxDeafultM)`
  display: block;

  .ds-button.ant-btn-ghost:not([disabled]):hover & {
    display: none;
  }
`;

export const HoverIcon = styled(CheckboxM)`
  display: none;

  .ds-button.ant-btn-ghost:not([disabled]):hover & {
    display: block;
  }
`;

export default { IconWrapper };
