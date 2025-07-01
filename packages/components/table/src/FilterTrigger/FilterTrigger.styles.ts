import styled, {
  type FlattenInterpolation,
  type ThemeProps,
  css,
} from 'styled-components';

import Button from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';
import { IconContainer } from '@synerise/ds-icon';

export const FilterButtonGroup = styled(ButtonGroup)`
  .ant-btn-group {
    width: auto;
  }
`;

export const FilterButtonLabel = styled.span`
  width: 100%;
  max-width: 0;
  overflow: hidden;
  margin-right: 0;
`;

export const FilterButton = styled(Button)<{
  opened: boolean;
  selected?: object;
}>`
  &&& {
    &:focus {
      .btn-focus {
        box-shadow: none;
      }
    }
    &:hover {
      color: ${(props): string => props.theme.palette['blue-600']};

      span {
        color: ${(props): string => props.theme.palette['blue-600']};
      }

      ${IconContainer} {
        svg {
          fill: ${(props): string =>
            props.theme.palette['blue-600']} !important;
        }
      }
    }
  }

  ${(props): FlattenInterpolation<ThemeProps<boolean>> | false =>
    props.opened &&
    css`
      ${FilterButtonLabel} {
        transition: all 0.3s ease;
        transition-property: width, max-width, margin-right;
        max-width: 100%;
      }
    `}

  ${(props): FlattenInterpolation<ThemeProps<boolean>> | false =>
    Boolean(props.selected) &&
    css`
      ${FilterButtonLabel} {
        margin-right: 20px;
      }
    `}
`;

export const ClearButton = styled(Button)`
  &&& {
    border-left: 0 !important;
    position: absolute;
    right: 32px;
    background: none;
    z-index: 2;

    ${IconContainer} {
      svg {
        fill: ${(props): string => props.theme.palette['red-600']} !important;
        color: ${(props): string => props.theme.palette['red-600']};
      }
    }

    &:hover {
      background: none;

      ${IconContainer} {
        svg {
          fill: ${(props): string => props.theme.palette['red-600']};
          color: ${(props): string => props.theme.palette['red-600']};
        }
      }
    }

    &:focus {
      .btn-focus {
        box-shadow: none;
      }
    }
  }
`;

export const ListButton = styled(Button)`
  &&& {
    &:hover {
      ${IconContainer} {
        svg {
          fill: ${(props): string =>
            props.theme.palette['blue-600']} !important;
        }
      }
    }
  }
`;
