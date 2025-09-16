import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ModalTitle } from './ModalTitle';

describe('ModalTitle', () => {
  const onCancelMock = jest.fn();
  const title = 'Test Title';
  const description = 'Test Description';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render title and description when props are provided', () => {
    renderWithProvider(<ModalTitle title={title} description={description} />);

    const titleElement = screen.getByText(title);
    const descriptionElement = screen.getByText(description);

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it('should render close button when blank is true and onCancel is provided', () => {
    renderWithProvider(<ModalTitle blank onCancel={onCancelMock} />);

    const closeButton = screen.getByTestId('modal-close');

    expect(closeButton).toBeInTheDocument();
  });

  it('should call onCancel when the close button is clicked', () => {
    renderWithProvider(<ModalTitle blank onCancel={onCancelMock} />);

    const closeButton = screen.getByTestId('modal-close');
    userEvent.click(closeButton);

    expect(onCancelMock).toHaveBeenCalled();
  });

  it('should not render close button when blank is true but onCancel is not provided', () => {
    render(<ModalTitle blank />);

    const closeButton = screen.queryByTestId('modal-close');

    expect(closeButton).not.toBeInTheDocument();
  });

  it('should render headerActions when provided', () => {
    const headerActions = <button onClick={jest.fn()}>Test Action</button>;

    renderWithProvider(
      <ModalTitle title={title} headerActions={headerActions} />,
    );
    const headerActionsElement = screen.getByText('Test Action');

    expect(headerActionsElement).toBeInTheDocument();
  });

  it('should not render headerActions when not provided', () => {
    renderWithProvider(<ModalTitle title={title} />);

    const headerActionsElement = screen.queryByText('Test Action');

    expect(headerActionsElement).not.toBeInTheDocument();
  });

  it('should render custom title container style when provided', () => {
    const customStyle = { backgroundColor: 'red' };

    renderWithProvider(
      <ModalTitle title={title} titleContainerStyle={customStyle} />,
    );

    const titleContainer = screen.getByTestId('modal-title');

    expect(titleContainer).toHaveStyle(customStyle);
  });

  it('should not render description when description prop is not provided', () => {
    renderWithProvider(<ModalTitle title="Test Title" />);

    const descriptionElement = screen.queryByText('Test Description');

    expect(descriptionElement).not.toBeInTheDocument();
  });
});
