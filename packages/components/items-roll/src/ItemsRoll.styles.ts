import styled from 'styled-components';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import DividerBase from '@synerise/ds-divider';

export const Wrapper = styled.div`
  padding: 12px;
  border: 1px solid ${({ theme }): string => theme.palette['grey-200']};
  border-radius: 3px;
`;

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
  color: ${({ theme }): string => theme.palette['grey-800']};
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

        :hover {
          svg {
            fill: ${({ theme }): string => theme.palette['blue-600']};
          }

          .element-remove-icon {
            svg {
              fill: ${({ theme }): string => theme.palette['red-600']} !important;

              :hover {
                fill: ${({ theme }): string => theme.palette['red-600']} !important;
              }
            }
          }
        }

        :focus {
          box-shadow: none !important;
          background: transparent;
        }
        :focus:hover {
          background-color: ${({ theme }): string => theme.palette['grey-050']};
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
        color: ${({ theme }): string => theme.palette['grey-500']};
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
        border-bottom: 1px dashed ${({ theme }): string => theme.palette['grey-300']};
        margin: 12px 0px 12px -12px;
      }
    }
  }
`;

export const Bold = styled.span`
  color: ${({ theme }): string => theme.palette['grey-800']};
  font-weight: 500;
  margin-left: 2px;
`;

export const ChangeSelection = styled(Button)`
  width: 157px;
  display: flex;
  align-items: center;
  padding: 4px 9px;
  font-weight: 500;

  &&& {
    color: ${({ theme }): string => theme.palette['blue-600']};
    .ds-icon {
      margin-right: 4px;

      svg {
        fill: ${({ theme }): string => theme.palette['blue-600']};
      }
    }
  }
`;

export const SearchWrapper = styled.div`
  margin: 0 8px;
  min-width: 32px;
  flex: 1 1 auto;
`;

export const ShowButton = styled(Button)`
  margin-right: 8px;

  span {
    font-weight: 400;
    color: ${({ theme }): string => theme.palette['grey-700']};
  }

  .bold-label {
    font-weight: 500;
  }
`;

export const ShowButtonLabel = styled.span`
  font-weight: 400;
`;

export const ClearButton = styled(Button)`
  margin-left: auto;

  &&& {
    .ds-icon {
      margin-top: 1px;
    }
  }
`;

export const ArrowIcon = styled(Icon)`
  svg {
    fill: ${({ theme }): string => theme.palette['grey-600']};
  }
`;

export const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 144px;
  color: ${({ theme }): string => theme.palette['grey-600']};
`;

export const NoResultIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }): string => theme.palette['grey-200']};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  .ds-icon {
    svg {
      fill: ${({ theme }): string => theme.palette['grey-600']};
    }
  }
`;

export const Divider = styled(DividerBase)<{ footer?: boolean }>`
  && {
    margin: ${(props): string => (props.footer ? '8px 0 12px' : '12px 0 8px')};
  }
`;

export const WarningIcon = styled(Icon)`
  svg {
    fill: ${({ theme }): string => theme.palette['yellow-500']};
  }
`;
