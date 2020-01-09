import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';

import AppHeader from '../index';

describe('AppHeader', () => {
  const TEST_IMAGE_SOURCE = '/testsource.jpg';

  it('should render logo', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <AppHeader logo={TEST_IMAGE_SOURCE} />
    );

    const logo = container.querySelector(`img[src="${TEST_IMAGE_SOURCE}"]`);

    // ASSERT
    expect(logo).toBeTruthy();
  });

  it('should render with title', () => {
    // ARRANGE
    const MODULE_TITLE = 'Unique Module Title';
    const { getByText } = renderWithProvider(
      <AppHeader logo={TEST_IMAGE_SOURCE} title={MODULE_TITLE} />
    );

    // ASSERT
    expect(getByText(MODULE_TITLE)).toBeTruthy();
  });

  it('class name is passed down to container', () => {
    // ARRANGE
    const CLASS_NAME = 'some-test-classname';
    const HEADER_CONTAINER_TESTID = 'header-container';
    const { getByTestId } = renderWithProvider(
      <AppHeader logo={TEST_IMAGE_SOURCE} className={CLASS_NAME} />
    );

    const container = getByTestId(HEADER_CONTAINER_TESTID);

    // ASSERT
    expect(container.classList.contains(CLASS_NAME)).toBeTruthy();
  });

  it('side nodes are rendered', () => {
    // ARRANGE
    const SIDE_NODE_ONE = 'Sidenode one';
    const SIDE_NODE_TWO = 'Sidenode two';

    const { getByText } = renderWithProvider(
      <AppHeader
        logo={TEST_IMAGE_SOURCE}
        sideNodes={[{
          id: 0,
          render: <span>{SIDE_NODE_ONE}</span>
        }, {
          id: 1,
          render: <span>{SIDE_NODE_TWO}</span>
        }]}
      />
    );

    // ASSERT
    expect(getByText(SIDE_NODE_ONE)).toBeTruthy();
    expect(getByText(SIDE_NODE_TWO)).toBeTruthy();
  });
});