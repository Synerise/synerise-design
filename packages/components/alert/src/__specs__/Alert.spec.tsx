import React from 'react';
import { renderWithProvider } from '@synerise/ds-core';

import Alert from '../index';
import { fireEvent } from '@testing-library/react';

describe('Alert component', () => {
  it('should render properly', () => {
    // ARRANGE
    const msg = "Success!";
    const { getByText } = renderWithProvider(<Alert message={msg} type="success"/>);

    // ASSERT
    expect(getByText(msg)).toBeTruthy();
  });

  it('should render with description', () => {
    // ARRANGE
    const msg = "Success!";
    const description = "Success description";
    const { getByText } = renderWithProvider(<Alert message={msg} description={description} type="success"/>);

    // ASSERT
    expect(getByText(msg)).toBeTruthy();
    expect(getByText(description)).toBeTruthy();
  });

  it('should render with showMoreLabel', () => {
    // ARRANGE
    const msg = "Success!";
    const description = "Success description";
    const showMoreLabel = "Show more";
    const onShowMore = jest.fn();
    const { getByText } = renderWithProvider(<Alert message={msg} description={description} showMoreLabel={showMoreLabel} onShowMore={onShowMore} type="success"/>);

    // ASSERT
    expect(getByText(msg)).toBeTruthy();
    expect(getByText(description)).toBeTruthy();
    expect(getByText(showMoreLabel)).toBeTruthy();
  });

  it('should call onShowMore callback', () => {
    // ARRANGE
    const msg = "Success!";
    const description = "Success description";
    const showMoreLabel = "Show more";
    const onShowMore = jest.fn();
    const { getByText } = renderWithProvider(<Alert message={msg} description={description} showMoreLabel={showMoreLabel} onShowMore={onShowMore} type="success"/>);

    // ACT
    const showMore = getByText(showMoreLabel);
    fireEvent.click(showMore);

    // ASSERT
    expect(getByText(msg)).toBeTruthy();
    expect(getByText(description)).toBeTruthy();
    expect(getByText(showMoreLabel)).toBeTruthy();
    expect(onShowMore).toBeCalled();
  });
})
