import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';

import CardSelect from '../index';

const tickIconSelector = '.ds-card-select .ds-card-select-tick';
describe('CardSelect', () => {
  it('should render', function () {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <CardSelect
        icon="ad-simple-push-l"
        iconSize={32}
        title="Selectable card"
        description="Description of selectable card"
      />,
    );

    // ACT

    // ASSERT
    expect(getByText('Selectable card')).toBeTruthy();
  });

  it('should onChange be called', function () {
    // ARRANGE
    const onChange = jest.fn();

    const { container } = renderWithProvider(
      <CardSelect
        icon="ad-simple-push-l"
        iconSize={32}
        title="Selectable card"
        description="Description of selectable card"
        onChange={onChange}
      />,
    );
    const renderedTickIcon = container.querySelector(
      tickIconSelector,
    ) as HTMLElement;
    // ACT
    renderedTickIcon.click();

    // ASSERT
    expect(onChange).toBeCalled();
  });

  it('should onChange be called if disabled', function () {
    // ARRANGE
    const onChange = jest.fn();

    const { container } = renderWithProvider(
      <CardSelect
        icon="ad-simple-push-l"
        iconSize={32}
        title="Disabled Card"
        disabled={true}
        onChange={onChange}
      />,
    );
    const renderedTickIcon = container.querySelector(
      tickIconSelector,
    ) as HTMLElement;
    // ACT
    renderedTickIcon.click();

    // ASSERT
    expect(onChange).toBeCalled();
  });

  it('should onClick be called', function () {
    // ARRANGE
    const onChange = jest.fn();
    const onClick = jest.fn();

    const { container } = renderWithProvider(
      <CardSelect
        icon="ad-simple-push-l"
        iconSize={32}
        title="Disabled Card"
        disabled={true}
        onClick={onClick}
      />,
    );
    const renderedTickIcon = container.querySelector(
      tickIconSelector,
    ) as HTMLElement;
    // ACT
    renderedTickIcon.click();

    // ASSERT
    expect(onChange).toBeCalledTimes(0);
    expect(onClick).toBeCalled();
  });
});
