import styled from 'styled-components';
import Button from '@synerise/ds-button';
import * as React from 'react';
import Menu from '@synerise/ds-menu';

export const Container = styled.div``;

export const Header = styled.div`
  display: flex;
`;

export const Title = styled.div`
  font-weight: 500;
  margin-right: 12px;
  margin-left: 12px;
`;

export const Help = styled.div`
  flex: 0;
  color: ${(props): string => props.theme.palette['grey-400']};
`;

export const Ranges = styled.div`
  margin-top: 4px;
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const CustomForm = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-around;
`;

export const InputSelectGroup = styled.div`
  display: flex;

  .ant-input-number {
    width: 50%;
  }

  .ant-input-number-input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .ant-select {
    margin-left: -1px;
  }
  .ant-input-number {
    margin-left: -2px;
  }
  .ds-select-wrapper {
    display: flex;
    flex: 1;
  }
  .ant-select-selection {
    background: #f9fafb;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    font-weight: 500;
  }
`;
export const Range = styled(({ children, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Button type="tertiary" {...rest}>
    {children}
  </Button>
))`
  && {
    margin: 4px 0;
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
`;

export const RangeFormColumn = styled.div`
  display: flex;
  align-items: center;
`;

export const DatePickerWrapper = styled.div`
  margin-top: 0px;
`;
export const DropMenu = styled(Menu)`
  padding: 8px;
`;
export const DropMenuItem = styled(Menu.Item)`
  max-height: 32px;
`;
