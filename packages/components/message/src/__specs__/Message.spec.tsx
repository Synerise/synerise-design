import React from 'react';
import message from '../index';
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

describe('Message', () => {
  afterEach(() => {
    message.destroy();
  });

  it('should render success message', async () => {
    const msg = 'Success!';
    const showMessage = () => {
      message.success(msg);
    }
    render(<button onClick={showMessage}>CLICK</button>)
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => 
      expect(screen.getByText(msg)).toBeInTheDocument()
    )
  });

  it('should render error message', async () => {
    const msg = 'An error occurred!';
    const showMessage = () => {
      message.error(msg);
    }
    render(<button onClick={showMessage}>CLICK</button>);
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => 
      expect(screen.getByText(msg)).toBeInTheDocument()
    )
  });
});
