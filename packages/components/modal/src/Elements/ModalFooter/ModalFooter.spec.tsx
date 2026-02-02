import React from 'react';

import Button, { type ButtonProps } from '@synerise/ds-button';
import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ModalFooter } from './ModalFooter';

describe('ModalFooter', () => {
  const onOkMock = vi.fn();
  const onCancelMock = vi.fn();

  const CustomButtonMock = ({ children, onClick, disabled }: ButtonProps) => (
    <Button onClick={onClick} disabled={disabled}>
      Custom {children}
    </Button>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders default cancel and apply buttons', () => {
    renderWithProvider(<ModalFooter onCancel={onCancelMock} onOk={onOkMock} />);
    const cancelButton = screen.getByText('Cancel');
    const okButton = screen.getByText('Apply');

    expect(cancelButton).toBeInTheDocument();
    expect(okButton).toBeInTheDocument();
  });

  it('renders custom cancel and apply buttons', () => {
    const customTexts = {
      cancelButton: 'Custom Cancel',
      okButton: 'Custom Apply',
    };

    renderWithProvider(
      <ModalFooter
        onCancel={onCancelMock}
        onOk={onOkMock}
        texts={customTexts}
      />,
    );
    const cancelButton = screen.getByText('Custom Cancel');
    const okButton = screen.getByText('Custom Apply');

    expect(cancelButton).toBeInTheDocument();
    expect(okButton).toBeInTheDocument();
  });

  it('calls onOk and onCancel callbacks when buttons are clicked', () => {
    renderWithProvider(<ModalFooter onCancel={onCancelMock} onOk={onOkMock} />);

    const cancelButton = screen.getByText('Cancel');
    const okButton = screen.getByText('Apply');

    userEvent.click(cancelButton);
    expect(onCancelMock).toBeCalledTimes(1);

    userEvent.click(okButton);
    expect(onOkMock).toBeCalledTimes(1);
  });

  it('renders prefix, infix and suffix elements in the footer', () => {
    const prefixNode = <div data-testid="prefix">Prefix Node</div>;
    const infixNode = <div data-testid="infix">Infix Node</div>;
    const suffixNode = <div data-testid="suffix">Suffix Node</div>;

    renderWithProvider(
      <ModalFooter
        onCancel={onCancelMock}
        onOk={onOkMock}
        prefix={prefixNode}
        suffix={suffixNode}
        infix={infixNode}
      />,
    );

    const prefixElement = screen.getByTestId('prefix');
    const infixElement = screen.getByTestId('infix');
    const suffixElement = screen.getByTestId('suffix');

    expect(prefixElement).toBeInTheDocument();
    expect(infixElement).toBeInTheDocument();
    expect(suffixElement).toBeInTheDocument();
  });

  it('renders custom DSButton component for cancel and apply buttons', () => {
    renderWithProvider(
      <ModalFooter
        onCancel={onCancelMock}
        onOk={onOkMock}
        CustomFooterButton={CustomButtonMock}
      />,
    );

    const cancelButton = screen.getByText('Custom Cancel');
    const okButton = screen.getByText('Custom Apply');

    expect(cancelButton).toHaveTextContent('Custom Cancel');
    expect(okButton).toHaveTextContent('Custom Apply');
  });
});
