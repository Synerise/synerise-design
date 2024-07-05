import styled from 'styled-components';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { IconProps } from '@synerise/ds-icon';
import ListItem from '@synerise/ds-list-item';

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

export const TagItems = styled.div`
  &&& {
    padding: 8px;
    width: auto;
    min-height: 176px;
  }
`;

export const TagItem = styled(ListItem)`
  &&&& {
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
