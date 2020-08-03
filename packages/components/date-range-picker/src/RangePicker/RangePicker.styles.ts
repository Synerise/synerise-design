import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Button from '@synerise/ds-button';
import { Props as ButtonProps } from '@synerise/ds-button/dist/Button.types';

const borderStyle = css``;
const borderedSidesStyle = css`
  border-bottom: ${borderStyle};

  & > *:not(:last-child) {
    border-right: ${borderStyle};
  }
`;

export const Sides = styled.div<{ bordered?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  ${(props): FlattenSimpleInterpolation | null => (props.bordered ? borderedSidesStyle : null)};
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
    border-bottom: ${borderStyle};
  }
`;

export const PickerFooter = styled.div`
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
