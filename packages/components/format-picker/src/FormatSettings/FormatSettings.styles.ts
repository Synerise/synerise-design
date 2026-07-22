import styled from 'styled-components';

import Button, { type StyledButton } from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';
import DSListItem, { type StyledListItem } from '@synerise/ds-list-item';
import { SuffixWrapper } from '@synerise/ds-list-item/dist/components/Text/Text.styles';

export const FormatSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  background-color: var(--ds-dropdown-bg);
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
  /* ⚑ Shift: footer bg grey-050 → --ds-dropdown-footer-bg (grey-100, marginally darker). */
  background-color: var(--ds-dropdown-footer-bg);
  padding: 8px 10px;
  border-top: 1px solid var(--ds-dropdown-footer-border);
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
  border: 1px solid var(--ds-form-field-border-default);
  width: 100%;
  margin-bottom: 20px;
`;

export const DropdownValue = styled.span`
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  color: var(--ds-form-field-text-value);
`;

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 8px;
  background: var(--ds-dropdown-bg);
`;

export const ListItem: StyledListItem = styled(DSListItem)`
  font-weight: 500;
  width: 100%;
  color: var(--ds-list-item-role-normal-text-default);
  ${SuffixWrapper} {
    /* ⚑ Shift: suffix grey-500 → --ds-list-item-content-description-color (grey-600, marginally darker). */
    color: var(--ds-list-item-content-description-color);
    font-weight: 400;
  }
`;

export const FixedLengthButton: StyledButton = styled(Button)`
  &&& {
    padding: 4px;
  }
`;
export const WrapperButtons = styled(ButtonGroup)`
  &&& {
    padding-left: 8px;
  }
`;
