import React from 'react';
import { action } from 'storybook/actions';

export const dataMultiple = [
  [
    { text: 'Item 11111111122222222223333333333333333333', disabled: true },
    { text: 'Item 2', disabled: false },
    { text: 'Item 3', disabled: true },
    { text: 'Item 4', disabled: false, danger: true },
  ],
  [{ text: 'Item 5', disabled: false }],
];

export const dataSingle = [
  [
    { text: 'Item 1', disabled: true },
    { text: 'Item 2', disabled: false },
    { text: 'Item 3', disabled: true },
    { text: 'Item 4', disabled: false, danger: true },
  ],
];

export const dataCheckboxes = [
  [
    { label: 'Country', value: 'country' },
    { label: 'City', value: 'city' },
    { label: 'Address', value: 'address' },
  ],
];

export const actions = () => (
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <div style={{ marginRight: '8px' }} onClick={action('edit')}>
      Edit
    </div>
    <div onClick={action('delete')}>Delete</div>
  </div>
);
