import styled, { type FlattenInterpolation, css } from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';

export const CrudsContainer = styled.div`
  display: flex;
  height: 24px;
  cursor: pointer;

  .add,
  .duplicate,
  .edit,
  .preview,
  .move,
  .moveup,
  .movedown {
    svg {
      fill: var(--ds-cruds-default-idle);
    }
  }

  .add:hover,
  .duplicate:hover,
  .edit:hover,
  .preview:hover,
  .move:hover,
  .moveup:hover,
  .movedown:hover {
    svg {
      fill: var(--ds-cruds-default-hover);
    }
  }

  .delete,
  .remove {
    svg {
      fill: var(--ds-cruds-danger-idle);
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
          fill: var(--ds-cruds-default-disabled);
        }
      }
    `}
`;
