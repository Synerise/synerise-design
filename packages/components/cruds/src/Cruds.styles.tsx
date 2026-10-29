import styled, { css, type FlattenInterpolation } from 'styled-components';

import type { ThemeProps } from '@synerise/ds-core';

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
    color: var(--ds-cruds-default-idle);
  }

  .add:hover,
  .duplicate:hover,
  .edit:hover,
  .preview:hover,
  .move:hover,
  .moveup:hover,
  .movedown:hover {
    color: var(--ds-cruds-default-hover);
  }

  .delete,
  .remove {
    color: var(--ds-cruds-danger-idle);
  }
`;

export const IconWrapper = styled.div<{ inactive?: boolean }>`
  ${(props): FlattenInterpolation<ThemeProps> | false =>
    Boolean(props.inactive) &&
    css`
      &&,
      &&:hover {
        cursor: default;
        color: var(--ds-cruds-default-disabled);
        svg {
          pointer-events: none;
        }
      }
    `}
`;
