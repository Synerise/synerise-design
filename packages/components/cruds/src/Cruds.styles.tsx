import styled, { type FlattenInterpolation, css } from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';

export const CrudsContainer = styled.div`
  display: flex;
  height: 24px;
  cursor: pointer;

  .add,
  .duplicate,
  .edit,
  .move,
  .moveup,
  .movedown {
    svg {
      fill: ${(props): string => props.theme.palette['grey-600']};
    }
  }

  .add:hover,
  .duplicate:hover,
  .edit:hover,
  .move:hover,
  .moveup:hover,
  .movedown:hover {
    svg {
      fill: ${(props): string => props.theme.palette['blue-600']};
    }
  }

  .delete,
  .remove {
    svg {
      fill: ${(props): string => props.theme.palette['red-600']};
    }
  }
`;

export const IconWrapper = styled.div<{ inactive?: boolean }>`
  ${(props): FlattenInterpolation<ThemeProps> | false =>
    Boolean(props.inactive) &&
    css`
      &&,
      &&:hover {
        cursor: default;
        svg {
          pointer-events: none;
          fill: ${props.theme.palette['grey-300']};
        }
      }
    `}
`;
