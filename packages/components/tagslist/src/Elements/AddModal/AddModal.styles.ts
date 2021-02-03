import styled from 'styled-components';
import Icon from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import Dropdown from '@synerise/ds-dropdown';

import { IconProps } from '@synerise/ds-icon/dist/Icon.types';

export const AddItemLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  margin-bottom: 16px;
  overflow: hidden;
`;

export const BottomAction = styled(Dropdown.BottomAction)`
  margin-top: 0;
  padding: 8px;
  cursor: pointer;
`;

export const TagInfoIcon = styled(Icon)`
  &&& {
    visibility: hidden;
    > svg {
      fill: ${(props): string => props.theme.palette['grey-600']};
    }
  }
`;

export const TagItems = styled(Menu)`
  &&& {
    width: auto;
    min-height: 176px;
  }
`;

export const TagItem = styled(Menu.Item)`
  &&& {
    &:hover {
      ${TagInfoIcon} {
        visibility: visible;
      }
    }
  }
`;

export const Loader = styled.div`
  height: 176px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Overlay = styled.div`
  padding: 16px;
  background: ${(props): string => props.theme.palette.white};
  min-width: 262px;
`;

export const OverlayFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const FavouriteIcon = styled(Icon)<IconProps & { favourite?: boolean }>`
  ${(props): false | string =>
    !!props.favourite &&
    `&.icon.icon1.ds-icon svg {
      fill: ${props.theme.palette['yellow-600']};
    }`}
`;