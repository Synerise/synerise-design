import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { ToolbarButton } from '../index';

const CONTENT = 'CONTENT';
const onClick = jest.fn();

describe('ToolbarButton', () => {
  it('should render', function () {
    renderWithProvider(<ToolbarButton type="ghost">{CONTENT}</ToolbarButton>);
    expect(screen.getByText(CONTENT)).toBeInTheDocument();
  });

  it('should fire onClick', function () {
    renderWithProvider(<ToolbarButton onClick={onClick}>{CONTENT}</ToolbarButton>);

    fireEvent.click(screen.getByText(CONTENT));

    expect(onClick).toBeCalled();
  });

  it('should show spinner animation', () => {
    renderWithProvider(<ToolbarButton loading>{CONTENT}</ToolbarButton>);
    expect(screen.getByTestId('button-spinner')).toBeTruthy();
  });
});
