import React from 'react';

import Button from '@synerise/ds-button';
import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent } from '@testing-library/react';

import ButtonGroup from '../';

describe('ButtonGroup', () => {
  const onClick = jest.fn();
  it('should render', function () {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <ButtonGroup>
        <Button onClick={onClick}>Button Text</Button>
      </ButtonGroup>,
    );

    // ASSERT
    expect(getByText('Button Text')).toBeTruthy();
  });

  it('should render with title and description', function () {
    // ARRANGE
    const TITLE = 'Title of ButtonGroup';
    const DESCRIPTION = 'Description of ButtonGroup';

    const { getByText } = renderWithProvider(
      <ButtonGroup title={TITLE} description={DESCRIPTION}>
        <Button onClick={onClick}>Button Text</Button>
      </ButtonGroup>,
    );

    // ASSERT
    expect(getByText(TITLE)).toBeTruthy();
    expect(getByText(DESCRIPTION)).toBeTruthy();
  });

  it('should button onClick be called', function () {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <ButtonGroup>
        <Button onClick={onClick}>Button Text</Button>
      </ButtonGroup>,
    );

    // ACT
    fireEvent.click(getByText('Button Text'));

    // ASSERT
    expect(onClick).toBeCalled();
  });
});
