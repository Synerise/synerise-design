import React from 'react';
import styled, { css } from 'styled-components';

import Button from '../Button';
import { ButtonFocus } from '../Button.styles';

export const ButtonToggle = styled(({ toggleType, activated, ...rest }) => {
  return <Button {...rest} />;
})`
  ${(props) =>
    props.toggleType === 'ghost' &&
    css`
      &:hover:not(:disabled):not(:focus) {
        color: var(--ds-color-text-base-muted);
      }

      ${!props.activated
        ? css`
            &:hover:not(:disabled):not(:focus) {
              color: var(--ds-color-text-base-muted);
            }
          `
        : css`
            ${!props.disabled &&
            css`
              && {
                background: var(--ds-color-background-brand-subtle);
                color: var(--ds-color-text-brand-default);
                ${ButtonFocus} {
                  box-shadow: none;
                }
              }
            `}
          `}
    `}
`;
