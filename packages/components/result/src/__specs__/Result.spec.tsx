import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';

import Result from '../index';

describe('Result', () => {
  const TITLE = 'Result title';
  const DESCRIPTION = 'Result description';
  const BUTTON_TEXT = 'Cancel action';
  const PANEL_TEXT = 'Panel text';
  const CLOSE_BUTTON_TESTID = 'test-closebtn';

  it('should render with title', function () {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Result type="success" title={TITLE} />,
    );

    // ASSERT
    expect(getByText(TITLE)).toBeTruthy();
  });

  it('should render with title & description', function () {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Result type="success" title={TITLE} description={DESCRIPTION} />,
    );

    // ASSERT
    expect(getByText(DESCRIPTION)).toBeTruthy();
  });

  it('should render with buttons', function () {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Result
        type="success"
        title={TITLE}
        description={DESCRIPTION}
        buttons={<button>{BUTTON_TEXT}</button>}
      />,
    );

    // ASSERT
    expect(getByText(BUTTON_TEXT)).toBeTruthy();
  });

  it('should render with panel', function () {
    // ARRANGE
    const { queryByText } = renderWithProvider(
      <Result
        type="success"
        title={TITLE}
        description={DESCRIPTION}
        panel={<div>{PANEL_TEXT}</div>}
      />,
    );

    // ASSERT
    expect(queryByText(PANEL_TEXT)).toBeTruthy();
  });

  it('should not render close button', function () {
    // ARRANGE
    const { queryByTestId } = renderWithProvider(
      <Result type="success" title={TITLE} description={DESCRIPTION} />,
    );

    // ASSERT
    expect(queryByTestId(CLOSE_BUTTON_TESTID)).toBeFalsy();
  });
});
