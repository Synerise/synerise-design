import React from 'react';
import styled, { css } from 'styled-components';

import Button from '../Button';
import { ButtonFocus } from '../Button.styles';

export const ButtonToggle = styled(({ toggleType, activated, ...rest }) => {
  return <Button {...rest} />;
})`
  ${props =>
    props.toggleType === 'ghost' &&
    css`
      &:hover:not(:disabled):not(:focus) {
        color: ${props.theme.palette['grey-600']};
      }

      ${!props.activated
        ? css`
            &:hover:not(:disabled):not(:focus) {
              color: ${props.theme.palette['grey-600']};
              svg {
                fill: currentColor;
              }
            }
          `
        : css`
            ${!props.disabled &&
            css`
        && {
            background: ${props.theme.palette['blue-050']};
            color: ${props.theme.palette['blue-600']};
            svg { 
              fill: currentColor;
            }
            ${ButtonFocus} {
              box-shadow: none;
            }
          }
        }`}
          `}
    `}
`;
