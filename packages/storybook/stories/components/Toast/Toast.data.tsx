import React from 'react';
import { IconOrderWrapper, NumberWrapper, OrderWrapper } from '@synerise/ds-alert/dist/Toast/Toast.styles';
import Tooltip from '@synerise/ds-tooltip';
import Icon, { DuplicateS } from '@synerise/ds-icon';
import { controlFromOptionsArray } from '../../utils';


export const type = {
  ...controlFromOptionsArray('select', ['success', 'warning' , 'negative' , 'neutral' ,'informative']),
};
export const color = {
  ...controlFromOptionsArray('select', ['grey', 'red', 'green', 'yellow', 'blue']),
};
export const colorIcon = {
  ...controlFromOptionsArray('select', ['white', 'grey', 'black', 'blue']),
};
export const customColor = {
  ...controlFromOptionsArray('select', ['', 'grey', 'red', 'green', 'yellow', 'blue', 'pink', 'mars', 'orange', 'fern', 'cyan', 'purple', 'violet']),
};

export const data = [
  {
    label: (
      <OrderWrapper color='green' >
        <div style={{ marginRight: '10px' }}>•</div> Schedule section must be defined
        <NumberWrapper>(505-456)</NumberWrapper>
        <Tooltip title='Copy'>
          <IconOrderWrapper  color='green' ><Icon component={<DuplicateS/>}/></IconOrderWrapper>
        </Tooltip>
      </OrderWrapper>
    ),
    index: (1),
    id:('list')
  },
  {
    label: (
      <OrderWrapper color='green' >
        <div style={{ marginRight: '10px' }}>•</div> Missing email template
        <NumberWrapper>(505-456)</NumberWrapper>
        <Tooltip title='Copy'>
          <IconOrderWrapper color='green'><Icon component={<DuplicateS/>}/></IconOrderWrapper>
        </Tooltip>
      </OrderWrapper>
    ),
    index: (1),
    id:('list')
  },
];

