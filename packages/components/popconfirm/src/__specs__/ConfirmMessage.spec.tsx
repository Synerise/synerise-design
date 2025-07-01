import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent } from '@testing-library/react';

import Popconfirm from '../Popconfirm';

const CONFIRM_MESSAGE = 'CONFIRM MESSAGE';
const BUTTON_LABEL = 'BUTTON_LABEL';

describe('Popcofirm.ConfirmMessage', () => {
  it('should render child component', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Popconfirm.ConfirmMessage
        title={CONFIRM_MESSAGE}
        onClick={(showConfirmMessage: () => void) => {
          showConfirmMessage();
        }}
      >
        <button>{BUTTON_LABEL}</button>
      </Popconfirm.ConfirmMessage>,
    );

    // ASSERT
    expect(getByText(BUTTON_LABEL)).toBeTruthy();
  });

  it('should show confirm message', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Popconfirm.ConfirmMessage
        title={CONFIRM_MESSAGE}
        onClick={(showConfirmMessage: () => void) => {
          showConfirmMessage();
        }}
      >
        <button>{BUTTON_LABEL}</button>
      </Popconfirm.ConfirmMessage>,
    );

    // ACT
    fireEvent.click(getByText(BUTTON_LABEL));

    // ASSERT
    expect(getByText(CONFIRM_MESSAGE)).toBeTruthy();
  });
});
