import styled from 'styled-components';
import Menu from '@synerise/ds-menu';
import { BorderLessInput } from '@synerise/ds-input/dist/InputMultivalue/InputMultivalue.styles';
import { Props as DSInputProps } from '@synerise/ds-input/dist/Input';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

export const FolderItem = styled(Menu.Item)< MenuItemProps | JSX.IntrinsicAttributes>`
  && {
    border-radius: 3px !important;
  }
`;
export const InlineEditInput = styled(BorderLessInput)<DSInputProps>`
  margin: 0;
  padding: 0;
  text-decoration: underline dotted;
`;
