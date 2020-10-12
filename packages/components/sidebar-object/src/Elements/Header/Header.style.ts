import styled from 'styled-components';
import InlineEdit from '@synerise/ds-inline-edit';
import { InlineEditProps } from '@synerise/ds-inline-edit/dist/InlineEdit.types';

export const HeaderWrapper = styled.div<{dashed: boolean}>`
  padding: ${(props): string => props.dashed ? '0 0 16px 0': '0' };
  border-bottom: ${(props): string => props.dashed ? `1px dashed ${props.theme.palette['grey-300']}`: `0` };
  margin-top: -8px;
`;

export const ButtonWrapper = styled.div`
  padding: 0 0 0 8px;
`;
export const StyledInlineEdit = styled(InlineEdit)<InlineEditProps>`
  
  && .autosize-input > input {
    max-width:350px;
    overflow: hidden;
  }
`;
export const DrawerHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`;

export const MenuWrapper = styled.div`
  border-top: 1px dashed ${(props): string => props.theme.palette['grey-300']};
  margin: 8px 0 0;
  padding: 8px 0 0 0px;
`;
export const DropdownWrapper = styled.div`
  background: ${(props): string => props.theme.palette.white};
  width: 216px;
`;

export const OverviewWrapper = styled.div`
  width: 100%;
`;