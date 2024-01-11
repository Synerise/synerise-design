import styled from 'styled-components';
import React from 'react';

export const CrudWrapper = styled.div<{ marginWithLabel?: boolean | React.ReactNode }>`
  padding-left: 4px;
  visibility: hidden;
  margin-top: 0;
`;

export const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 16px 0;
  &:hover {
    ${CrudWrapper} {
      visibility: visible;
    }
  }
  & > *:not(:last-child) {
    margin-right: 12px;
  }
`;
