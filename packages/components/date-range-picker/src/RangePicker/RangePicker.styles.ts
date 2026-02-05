import styled from 'styled-components';

import Button, { type StyledButton } from '@synerise/ds-button';

export const Sides = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 370px;
  margin: 0;
  && .ds-date-picker-nav {
    margin: 0 14px;
  }
`;

export const Side = styled.div<{ mode: string }>`
  padding: 16px 12px 0 12px;
  display: grid;
  grid-template-rows: 48px 290px;
  align-items: stretch;
  justify-content: stretch;
  width: 318px;
  ${(props): string | false =>
    props.mode === 'time' &&
    `.long-prev,
      .long-next {
        display: none;
      }`}

  > *:not(:last-child) {
    border-bottom: 1px solid
      ${(props): string => props.theme.palette['grey-200']};
  }
  && .ds-time-picker {
    padding: 16px 16px 0px 16px;
  }
`;

export const PickerFooter = styled.div`
  margin: 0 8px;
  padding: 6px 16px 13px;
  display: flex;
`;
export const FooterSeparator = styled.div`
  display: flex;
  flex: 1;
`;
export const DateTimeModeSwitch: StyledButton = styled(Button)`
  margin: 4px 0;
`;
