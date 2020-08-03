import styled from 'styled-components';
import Button from '@synerise/ds-button';
import { Props as ButtonProps } from '@synerise/ds-button/dist/Button.types';

export const Sides = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0 8px;
  && .ds-date-picker-nav {
    margin: 0 15px;
  }
`;

export const Side = styled.div`
  padding: 15px 15px 0 15px;
  display: grid;
  grid-template-rows: 48px 290px;
  align-items: stretch;
  justify-content: stretch;

  > *:not(:last-child) {
    border-bottom: 1px solid ${(props): string => props.theme.palette['grey-200']};
  }
  && .ds-time-picker{
    padding: 16px 16px 0px 16px;
  }
`;

export const PickerFooter = styled.div`
  margin: 0 8px;
  padding: 16px 16px 0 16px;
  display: flex;
`;
export const FooterSeparator = styled.div`
  display: flex;
  flex: 1;
  
`;
export const DateTimeModeSwitch = styled(Button)<ButtonProps>`
  margin: 4px 0;
`;
