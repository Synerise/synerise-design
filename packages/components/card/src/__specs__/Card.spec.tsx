import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import Card from '../index';

describe('Card', () => {
  it('should render', function() {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Card
        title="Card title"
        description="Card description"
        withHeader
      />
    );

    // ASSERT
    expect(getByText('Card title')).toBeTruthy();
    expect(getByText('Card description')).toBeTruthy();
  });

  it('should render with content', function() {
    // ARRANGE
    const TEST_ID = 'test_id';
    const { getByTestId } = renderWithProvider(
      <Card>
        <div data-testid={TEST_ID}>
          Content
        </div>
      </Card>
    );

    // ASSERT
    expect(getByTestId(TEST_ID)).toBeTruthy();
  });

  it('should not render header', function() {
    // ARRANGE
    const { queryByText } = renderWithProvider(
      <Card
        title="Card title"
        description="Card description"
      />
    );

    // ASSERT
    expect(queryByText('Card title')).toBeNull();
  });

  it('should render with header side content', function() {
    // ARRANGE
    const TEST_ID = 'test';
    const { getByTestId } = renderWithProvider(
      <Card
        title="Card title"
        description="Card description"
        withHeader
        headerSideChildren={
          <button data-testid={TEST_ID}>Click</button>
        }
      />
    );

    // ASSERT
    expect(getByTestId(TEST_ID)).toBeTruthy();
  });
});
