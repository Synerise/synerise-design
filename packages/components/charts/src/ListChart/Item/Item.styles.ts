import * as React from 'react';
import styled from 'styled-components';

export const ItemActions = styled.div`
  flex: 0 0 100px;
  text-align: right;
  display: none;
`;

export const ItemContainer = styled(({ as, children, ...rest }) => React.createElement(as || 'div', rest, children))`
  display: flex;
  margin-bottom: 4px;

  &:hover {
    ${ItemActions} {
      display: block;
    }
  }
  > div {
    width: 100%;
  }
`;

export const ItemTitle = styled.div`
  flex: 1 1 auto;
  font-size: 13px;
  line-height: 28px;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: auto;

  &:hover {
    color: ${(props): string => props.theme.variable('@gray-color-lighter-1')};
  }
`;

export const ItemIcon = styled.div`
  flex: 0 0 28px;
`;

export const ItemCount = styled.div`
  font-weight: 500;
  font-size: 15px;
  display: inline-block;
  margin-left: 15px;
`;
