import styled from 'styled-components';
import Icon from '@synerise/ds-icon';
import { IconProps } from '@synerise/ds-icon/dist/Icon.types';

export const AddItemLayout = styled.div`
  display: inline;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
`;
export const ButtonWrapper = styled.div`
  margin-bottom: 16px;
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
