import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

import Button from '../Button';
import { CreatorStatus } from '../Creator/Creator';

const LABEL_TEXT = 'Add something';

describe('Creator', () => {
  const onClick = jest.fn();
  it('should render', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Button.Creator onClick={onClick}></Button.Creator>);

    // ACT
    const creator = container.querySelector('.ds-button-creator');

    // ASSERT
    expect(creator).toBeTruthy();
  });
  it('should handle onClick', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Button.Creator onClick={onClick}></Button.Creator>);

    // ACT
    const creator = container.querySelector('.ds-button-creator') as HTMLElement;
    fireEvent.click(creator);

    // ASSERT
    expect(onClick).toBeCalledTimes(1);
  });
  it('should render disabled with lower opacity', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Button.Creator onClick={onClick} disabled={true}></Button.Creator>);

    // ACT
    const creator = container.querySelector('.ds-button-creator');

    // ASSERT
    expect(creator).toHaveStyle(`opacity:0.4`);
  });
  it('should render label text', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Button.Creator onClick={onClick} label={LABEL_TEXT}></Button.Creator>);

    // ACT
    const label = getByText(LABEL_TEXT);

    // ASSERT
    expect(label).toBeTruthy();
  });
  it('should render red when validated', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Button.Creator onClick={onClick} status={'error' as CreatorStatus}></Button.Creator>
    );

    // ACT
    const creator = container.querySelector('.ds-button-creator') as HTMLElement;

    // ASSERT
    expect(creator).toHaveStyle(`border: 1px dashed ${theme.palette['red-600']}`);
  });
  it('should render blue when uploading', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Button.Creator onClick={onClick} status={'upload' as CreatorStatus}></Button.Creator>
    );

    // ACT
    const creator = container.querySelector('.ds-button-creator') as HTMLElement;

    // ASSERT
    expect(creator).toHaveStyle(`border: 1px dashed ${theme.palette['blue-300']}`);
  });
});
