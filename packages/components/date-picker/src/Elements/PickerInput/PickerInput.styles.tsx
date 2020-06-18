import * as React from 'react';

import styled from 'styled-components';

//import { Popover as PopoverBase } from '../../../Popover';

export const Container = styled.div``;

export const InputWrapper = styled.div`
  position: relative;
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto 4px;
  display: flex;
  align-items: center;
  color: #b5bdc3;
`;

export const Popover = styled(({ className, ...rest }) => <div {...rest} overlayClassName={className} />)`
  .ant-popover-arrow {
    display: none;
  }

  .ant-popover-inner {
    overflow: hidden;
    border-radius: 3px;

    .ant-popover-inner-content {
      padding: 0;
    }
  }

  .ant-popover-placement-bottomRight {
    padding-top: 5px;
  }
`;

export const Pair = styled.div`
  cursor: pointer;
  position: relative;
  width: 24px;
  height: 24px;

  > * {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity 0.3s;

    &:first-child {
      opacity: 1;
    }

    &:last-child {
      opacity: 0;
    }
  }

  ${InputWrapper}:hover & {
    > * {
      &:first-child {
        opacity: 0;
      }

      &:last-child {
        opacity: 1;
      }
    }
  }
`;
