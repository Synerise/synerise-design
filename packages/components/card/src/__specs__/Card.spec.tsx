import React from 'react';

import { ObjectAvatar } from '@synerise/ds-avatar';
import { renderWithProvider } from '@synerise/ds-core';
import { screen, waitFor } from '@testing-library/react';

import Card from '../index';

describe('Card', () => {
  it('should render', function () {
    renderWithProvider(
      <Card title="Card title" description="Card description" withHeader />,
    );

    expect(screen.getByText('Card title')).toBeTruthy();
    expect(screen.getByText('Card description')).toBeTruthy();
  });

  it('should render static content when hidden', function () {
    renderWithProvider(
      <Card
        title="Card title"
        description="Card description"
        staticContent={<span>Some static content</span>}
        hideContent
        withHeader
      />,
    );

    expect(screen.getByText('Some static content')).toBeTruthy();
  });

  it('should render with content', async function () {
    const TEST_ID = 'test_id';
    renderWithProvider(
      <Card hideContent={false}>
        <div data-testid={TEST_ID}>Content</div>
      </Card>,
    );
    await waitFor(
      async () => {
        await expect(screen.getByTestId(TEST_ID)).toBeTruthy();
      },
      { timeout: 500 },
    );
  });

  it('should not render header', function () {
    renderWithProvider(
      <Card title="Card title" description="Card description" />,
    );

    expect(screen.queryByText('Card title')).toBeNull();
  });

  it('should render title with tag', function () {
    const TITLE_TAG = 'TITLE_TAG';
    renderWithProvider(
      <Card
        title="Card title"
        description="Card description"
        withHeader
        titleTag={<b>{TITLE_TAG}</b>}
      />,
    );

    expect(screen.getByText(TITLE_TAG)).toBeInTheDocument();
  });

  it('should render with header side content', function () {
    const TEST_ID = 'test';
    renderWithProvider(
      <Card
        title="Card title"
        description="Card description"
        withHeader
        headerSideChildren={<button data-testid={TEST_ID}>Click</button>}
      />,
    );

    expect(screen.getByTestId(TEST_ID)).toBeTruthy();
  });

  it('should allow custom card badge', () => {
    const { container } = renderWithProvider(
      <Card
        withHeader
        renderBadge={() => (
          <div className="badge-slot" style={{ marginRight: '16px' }}>
            Badge
          </div>
        )}
      />,
    );
    expect(container.querySelector('.badge-slot')).toBeTruthy();
  });
  it('should render with avatar', () => {
    const { container } = renderWithProvider(
      <Card withHeader avatar={<ObjectAvatar />} />,
    );
    expect(container.querySelector('.ds-avatar')).toBeTruthy();
  });
});
