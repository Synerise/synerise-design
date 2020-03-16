import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Layout from '../index';

describe('Layout', () => {
  const TITLE = 'TITLE';
  const RIGHT_SIDEBAR = 'RIGHT_SIDEBAR';
  const LEFT_SIDEBAR = 'LEFT_SIDEBAR';
  const TEXT_TEST = 'TEST TEXT';

  it('should render header', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Layout header={TITLE}>
        <>{TEXT_TEST}</>
      </Layout>
    );
    // ASSERT
    expect(getByText(TITLE)).toBeTruthy();
  });

  it('should render rightSidebar', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Layout right={RIGHT_SIDEBAR}>
        <p>{TEXT_TEST}</p>
      </Layout>
    );
    // ASSERT
    expect(getByText(RIGHT_SIDEBAR)).toBeTruthy();
  });

  it('should render leftSidebar', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Layout left={LEFT_SIDEBAR}>
        <p>{TEXT_TEST}</p>
      </Layout>
    );
    // ASSERT
    expect(getByText(LEFT_SIDEBAR)).toBeTruthy();
  });

  it('should render children', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Layout>{TEXT_TEST}</Layout>);
    // ASSERT
    expect(getByText(TEXT_TEST)).toBeTruthy();
  });
});
