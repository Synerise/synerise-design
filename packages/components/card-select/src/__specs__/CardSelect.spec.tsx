import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils';
import CardSelect from '../index';

describe('CardSelect', () => {
  const onClick = jest.fn();
  it('should render', function() {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <CardSelect
        icon="ad-simple-push-l"
        iconSize={32}
        title="Selectable card"
        description="Description of selectable card"
      />
    );

    // ACT

    // ASSERT
    expect(getByText('Selectable card')).toBeTruthy();
  });

  it('should onChange be called', function() {
    // ARRANGE
    const onChange = jest.fn();
    const TEST_ID = 'test-id';

    const { getByTestId } = renderWithProvider(
      <CardSelect
        icon="ad-simple-push-l"
        iconSize={32}
        title="Selectable card"
        description="Description of selectable card"
        onChange={onChange}
      />
    );

    // ACT
    fireEvent.click(getByTestId(TEST_ID));

    // ASSERT
    expect(onChange).toBeCalled();
  });

  it('should onChange be called if disabled', function() {
    // ARRANGE
    const onChange = jest.fn();
    const TEST_ID = 'test-id';

    const { getByTestId } = renderWithProvider(
      <CardSelect
        icon="ad-simple-push-l"
        iconSize={32}
        title="Disabled Card"
        disabled={true}
        onChange={onChange}
      />
    );

    // ACT
    fireEvent.click(getByTestId(TEST_ID));

    // ASSERT
    expect(onChange).toBeCalled();
  });
});
