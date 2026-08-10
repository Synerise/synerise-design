import styled from 'styled-components';

import Button, { type StyledButton } from '@synerise/ds-button';
import DividerBase from '@synerise/ds-divider';
import Icon from '@synerise/ds-icon';

export const ContainerSpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const HeaderLeft = styled.div`
  color: var(--ds-color-text-base-default);
  margin-left: 12px;
  height: 34px;
  display: flex;
  align-items: center;
`;

export const ShowButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const ListWrapper = styled.div`
  &&& {
    .ant-menu-inline,
    .-inline {
      border: none;
    }
    .ant-menu {
      .items-roll-list-item {
        padding-left: 12px !important;

        /* svg fills kept as fill:var() (not currentColor): a wrapper color here would
           leak onto the row text on hover. currentColor conversion = CSS-cleanup follow-up. */
        :hover {
          svg {
            fill: var(--ds-color-icon-brand-default);
          }

          .element-remove-icon {
            svg {
              fill: var(--ds-color-icon-danger-default) !important;

              :hover {
                fill: var(--ds-color-icon-danger-default) !important;
              }
            }
          }
        }

        :focus {
          box-shadow: none !important;
          background: transparent;
        }
        :focus:hover {
          background-color: var(--ds-color-background-base-subtle);
        }
      }

      .ant-menu-item-group-list,
      .-item-group-list {
        margin-left: -12px;
      }

      .ant-menu-item-group-title,
      .-item-group-title {
        font-size: 10px;
        text-transform: uppercase;
        color: var(--ds-divider-header-text-color);
        font-weight: 500;
        padding-left: 0;
        padding-right: 0;
        margin-left: -12px;
      }

      .ant-menu-item-group:not(:first-child):before,
      .-item-group:not(:first-child):before {
        content: '';
        width: calc(100% + 12px);
        height: 1px;
        display: block;
        border-bottom: 1px dashed var(--ds-color-border-base-strong);
        margin: 12px 0px 12px -12px;
      }
    }
  }
`;

export const Bold = styled.span`
  color: var(--ds-color-text-base-default);
  font-weight: 500;
  margin-left: 2px;
`;

export const ChangeSelection: StyledButton = styled(Button)`
  width: 157px;
  display: flex;
  align-items: center;
  padding: 4px 9px;
  font-weight: 500;

  &&& {
    color: var(--ds-color-text-brand-default);
    .ds-icon {
      margin-right: 4px;
    }
  }
`;

export const SearchWrapper = styled.div`
  margin: 0 8px;
  min-width: 32px;
  flex: 1 1 auto;
`;

export const ShowButton: StyledButton = styled(Button)`
  margin-right: 8px;

  span {
    font-weight: 400;
    color: var(--ds-color-text-base-subtle);
  }

  .bold-label {
    font-weight: 500;
  }
`;

export const ShowButtonLabel = styled.span`
  font-weight: 400;
`;

export const ClearButton: StyledButton = styled(Button)`
  margin-left: auto;

  &&& {
    .ds-icon {
      margin-top: 1px;
    }
  }
`;

export const ArrowIcon = styled(Icon)`
  color: var(--ds-color-icon-base-default);
`;

export const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 144px;
  color: var(--ds-color-text-base-muted);
`;

export const NoResultIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ds-color-icon-base-default);
`;

export const Divider = styled(DividerBase)<{ footer?: boolean }>`
  && {
    margin: ${(props) => (props.footer ? '8px 0 12px' : '12px 0 8px')};
  }
`;

export const WarningIcon = styled(Icon)`
  /* ⚑ Shift: yellow-500 → --ds-color-icon-warning-default (yellow-600; no yellow-500 icon token). */
  color: var(--ds-color-icon-warning-default);
`;
