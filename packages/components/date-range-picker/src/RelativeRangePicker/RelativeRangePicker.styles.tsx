import styled from 'styled-components';
import Button from '@synerise/ds-button';
import * as React from 'react';

export const Container = styled.div``;

export const Header = styled.div`
  display: flex;
`;

export const Title = styled.div`
  flex: 1;
  font-weight: 500;
  margin-bottom: 12px;
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
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr 1fr;
`;

export const InputSelectGroup = styled.div`
  display: flex;

  .ant-input-number {
    flex: 1 1 auto;
  }

  .ant-input-number-input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .ant-select {
    flex: 0 0 100px;
    margin-left: -1px;
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
  <Button {...rest} type="tertiary">
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
