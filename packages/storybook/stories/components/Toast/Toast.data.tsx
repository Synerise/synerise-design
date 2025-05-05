import React from 'react';
import { IconOrderWrapper, NumberWrapper, OrderWrapper } from '@synerise/ds-toast/dist/Toast.styles';
import Tooltip from '@synerise/ds-tooltip';
import Icon, { DuplicateS } from '@synerise/ds-icon';
import { showToast } from '@synerise/ds-toast';
import Button from '@synerise/ds-button';

export const data = [
  {
    label: (
      <OrderWrapper color="green">
        <div style={{ marginRight: '10px' }}>•</div> Schedule section must be defined
        <NumberWrapper>(505-456)</NumberWrapper>
        <Tooltip title="Copy">
          <IconOrderWrapper color="green">
            <Icon component={<DuplicateS />} />
          </IconOrderWrapper>
        </Tooltip>
      </OrderWrapper>
    ),
    index: 1,
    id: 'list',
  },
  {
    label: (
      <OrderWrapper color="green">
        <div style={{ marginRight: '10px' }}>•</div> Missing email template
        <NumberWrapper>(505-456)</NumberWrapper>
        <Tooltip title="Copy">
          <IconOrderWrapper color="green">
            <Icon component={<DuplicateS />} />
          </IconOrderWrapper>
        </Tooltip>
      </OrderWrapper>
    ),
    index: 1,
    id: 'list',
  },
];

export const ButtonShowingToast = ({ type, ...args }) => {
  const handleClick = () => {
    showToast(type, args);
  };
  return <Button onClick={handleClick}>Show toast</Button>;
};
