import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { renderWithProvider } from '@synerise/ds-utils/dist/testing';

import { Resizer } from '../Resizer';

describe('Resizer Component', () => {
  it('should call onMouseDown when the handler is clicked', () => {
    const onMouseDown = jest.fn();
    renderWithProvider(<Resizer onMouseDown={onMouseDown} />);

    fireEvent.mouseDown(screen.getByTestId('resizer-handler'));

    expect(onMouseDown).toHaveBeenCalledTimes(1);
  });
});
