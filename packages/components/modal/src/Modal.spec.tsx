import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Modal from './Modal';

describe('Modal', () => {
  const titleMock = 'Test Title';
  const descriptionMock = 'Test Description';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render modal if there is no visible prop or visible is false', () => {
    renderWithProvider(<Modal title={titleMock} description={descriptionMock} />);

    const modalDialog = screen.queryByRole('dialog');

    expect(modalDialog).not.toBeInTheDocument();
  });

  it('should render title, description, and blank correctly', () => {
    renderWithProvider(<Modal title={titleMock} description={descriptionMock} visible />);

    const titleElement = screen.getByText(titleMock);
    const descriptionElement = screen.getByText(descriptionMock);

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it('should not render title and description when blank, title and description is false', () => {
    renderWithProvider(<Modal visible />);

    const titleElement = screen.queryByText(titleMock);
    const descriptionElement = screen.queryByText(descriptionMock);
    const closeButton = screen.queryByTestId('modal-close');

    expect(titleElement).not.toBeInTheDocument();
    expect(descriptionElement).not.toBeInTheDocument();
    expect(closeButton).not.toBeInTheDocument();
  });

  it('should render headerActions when provided', () => {
    // eslint-disable-next-line react/button-has-type
    const headerActions = <button onClick={jest.fn()}>Test Action</button>;

    renderWithProvider(<Modal title={titleMock} headerActions={headerActions} visible />);
    const headerActionsElement = screen.getByText('Test Action');

    expect(headerActionsElement).toBeInTheDocument();
  });

  it('should render custom size correctly', () => {
    renderWithProvider(<Modal title="Test Title" size="medium" visible />);

    const modalDialog = screen.getByRole('dialog');
    expect(modalDialog).toHaveStyle({ width: '792px' });
  });

  it('should render modal with default footer if its not in props', () => {
    renderWithProvider(<Modal visible />);

    const defaultFooter = screen.queryByTestId('modal-footer');
    expect(defaultFooter).toBeInTheDocument();
  });

  it('should render modal without footer if its in props as null', () => {
    renderWithProvider(<Modal visible footer={null} />);

    const defaultFooter = screen.queryByTestId('modal-footer');
    expect(defaultFooter).not.toBeInTheDocument();
  });
  
  it('should show custom footer if its in props', () => {
    renderWithProvider(<Modal footer={<div>Custom Footer</div>} visible />);

    const customFooter = screen.getByText('Custom Footer');
    const defaultFooter = screen.queryByTestId('modal-footer');
    expect(customFooter).toBeInTheDocument();
    expect(defaultFooter).not.toBeInTheDocument();
  });
});
