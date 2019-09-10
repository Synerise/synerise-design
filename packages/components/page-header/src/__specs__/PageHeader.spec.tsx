import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils';
import PageHeader from '../index';

describe('PageHeader', () => {
  const onClick = jest.fn();
  const TITLE = 'TEST TITLE';
  const RIGHT_SIDE = 'RIGHT_SIDE';

  it('should render', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<PageHeader title={TITLE} onGoBack={onClick} />);
    // ASSERT
    expect(getByText('Back')).toBeTruthy();
  });

  it('should render title', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<PageHeader title={TITLE} onGoBack={onClick} />);
    // ASSERT
    expect(getByText('TEST TITLE')).toBeTruthy();
  });

  it('should render rightSide', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<PageHeader title={TITLE} onGoBack={onClick} rightSide={RIGHT_SIDE} />);
    // ASSERT
    expect(getByText(RIGHT_SIDE)).toBeTruthy();
  });

  it('should render children', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <PageHeader title={TITLE} onGoBack={onClick}>
        Children
      </PageHeader>
    );
    // ASSERT
    expect(getByText('Children')).toBeTruthy();
  });

  it('clicking back should trigger onChange event', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <PageHeader title={TITLE} onGoBack={onClick}>
        Children
      </PageHeader>
    );
    // ACT
    fireEvent.click(getByText('Back'));

    // ASSERT
    expect(onClick).toBeCalled();
  });
});
