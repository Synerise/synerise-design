import styled from 'styled-components';

import Button from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';
import DSListItem from '@synerise/ds-list-item';
import { SuffixWrapper } from '@synerise/ds-list-item/dist/components/Text/Text.styles';

export const FormatSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  background-color: ${(props): string => props.theme.palette.white};
  min-width: 268px;
  .ds-title {
    margin-bottom: 8px;
  }
`;

export const FormatSettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  width: 100%;
  padding: 20px 20px 0;
`;

export const FormatSettings = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between;
`;

export const FormatOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 20px;
  width: 100%;
  .ds-dropdown-menu {
    width: 100%;
  }
  .ds-checkbox {
    padding: 0;
    margin-bottom: 16px;
  }
`;

export const FormatFooter = styled.div`
  background-color: ${(props): string => props.theme.palette['grey-050']};
  padding: 8px 10px;
  border-top: 1px solid ${(props): string => props.theme.palette['grey-100']};
  width: 100%;
`;

export const DropdownTrigger = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 0 12px;
  height: 32px;
  border-radius: 3px;
  border: 1px solid ${(props): string => props.theme.palette['grey-300']};
  width: 100%;
  margin-bottom: 20px;
`;

export const DropdownValue = styled.span`
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  color: ${(props): string => props.theme.palette['grey-700']};
`;

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 8px;
  background: ${(props) => props.theme.palette.white};
`;

export const ListItem = styled(DSListItem)`
  font-weight: 500;
  width: 100%;
  color: ${(props): string => props.theme.palette['grey-700']};
  ${SuffixWrapper} {
    color: ${(props): string => props.theme.palette['grey-500']};
    font-weight: 400;
  }
`;

export const FixedLengthButton = styled(Button)`
  &&& {
    padding: 4px;
  }
`;
export const WrapperButtons = styled(ButtonGroup)`
  &&& {
    padding-left: 8px;
  }
`;
