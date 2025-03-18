import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { theme } from '@synerise/ds-core';

import Button from '../index';
import { CreatorStatus } from '../Creator/Creator.types';

const LABEL_TEXT = 'Add something';
const TEST_ID = 'button-creator';

describe('Creator', () => {
  const onClick = jest.fn();
  it('should render', () => {
    renderWithProvider(<Button.Creator data-testid={TEST_ID} onClick={onClick}></Button.Creator>);

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });
  it('should handle onClick', () => {
    renderWithProvider(<Button.Creator data-testid={TEST_ID} onClick={onClick}></Button.Creator>);

    const creator = screen.getByTestId(TEST_ID)
    fireEvent.click(creator);

    expect(onClick).toBeCalledTimes(1);
  });
  it('should render disabled with lower opacity', () => {
    renderWithProvider(<Button.Creator data-testid={TEST_ID} onClick={onClick} disabled={true}></Button.Creator>);

    const creator = screen.getByTestId(TEST_ID)
    expect(creator).toHaveStyle(`opacity:0.4`);
  });
  it('should render label text', () => {
    renderWithProvider(<Button.Creator data-testid={TEST_ID} onClick={onClick} label={LABEL_TEXT}></Button.Creator>);

    const label = screen.getByText(LABEL_TEXT);

    expect(label).toBeTruthy();
  });
  it('should render red when validated', () => {
    renderWithProvider(
      <Button.Creator data-testid={TEST_ID} onClick={onClick} status={CreatorStatus.Error}></Button.Creator>
    );
    const creator = screen.getByTestId(TEST_ID);
    expect(creator).toHaveStyle(`border: 1px dashed ${theme.palette['red-600']}`);
  });
  it('should render blue when uploading', async () => {
    renderWithProvider(
      <Button.Creator data-testid={TEST_ID} onClick={onClick} status={CreatorStatus.Upload}></Button.Creator>
    );

    const creator = screen.getByTestId(TEST_ID);
    await waitFor(() => expect(creator).toHaveStyle(`border: 1px dashed ${theme.palette['blue-300']}`));
  });
});
