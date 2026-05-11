import React from 'react';

import { theme, renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { Creator } from '../index';
import { CreatorStatus } from '../Creator/Creator.types';

const LABEL_TEXT = 'Add something';
const TEST_ID = 'button-creator';

describe('Creator', () => {
  const onClick = vi.fn();
  it('should render', () => {
    renderWithProvider(
      <Creator data-testid={TEST_ID} onClick={onClick}></Creator>,
    );

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });
  it('should handle onClick', () => {
    renderWithProvider(
      <Creator data-testid={TEST_ID} onClick={onClick}></Creator>,
    );

    const creator = screen.getByTestId(TEST_ID);
    fireEvent.click(creator);

    expect(onClick).toBeCalledTimes(1);
  });
  it('should render disabled with lower opacity', () => {
    renderWithProvider(
      <Creator
        data-testid={TEST_ID}
        onClick={onClick}
        disabled={true}
      ></Creator>,
    );

    const creator = screen.getByTestId(TEST_ID);
    expect(creator).toHaveStyle(`opacity:0.4`);
  });
  it('should render label text', () => {
    renderWithProvider(
      <Creator
        data-testid={TEST_ID}
        onClick={onClick}
        label={LABEL_TEXT}
      ></Creator>,
    );

    const label = screen.getByText(LABEL_TEXT);

    expect(label).toBeTruthy();
  });
  it('should render red when validated', () => {
    renderWithProvider(
      <Creator
        data-testid={TEST_ID}
        onClick={onClick}
        status={CreatorStatus.Error}
      ></Creator>,
    );
    const creator = screen.getByTestId(TEST_ID);
    expect(creator).toHaveStyle(
      `border: 1px dashed ${theme.palette['red-600']}`,
    );
  });
  it('should render blue when uploading', async () => {
    renderWithProvider(
      <Creator
        data-testid={TEST_ID}
        onClick={onClick}
        status={CreatorStatus.Upload}
      ></Creator>,
    );

    const creator = screen.getByTestId(TEST_ID);
    await waitFor(() =>
      expect(creator).toHaveStyle(
        `border: 1px dashed ${theme.palette['blue-300']}`,
      ),
    );
  });
});
