import * as React from 'react';
import { render } from '@testing-library/react';
import Icon from '../index';
import renderWithProvider from '@synerise/ds-utils/dist/testing/renderWithProvider/renderWithProvider';
import { VarTypeStringM } from '../icons';

describe('Icon', () => {
  it('should render', () => {
    // ARRANGE
    const TEST_TEXT = 'angle-left-m';
    const { getByTitle } = render(<Icon title={TEST_TEXT} name={TEST_TEXT} />);

    // ASSERT
    expect(getByTitle(TEST_TEXT)).toBeTruthy();
  });

  it('Should render with className', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Icon component={<VarTypeStringM />} />);

    // ASSERT
    expect(container.querySelector('.var-type-string-m')).toBeTruthy();
  })
});
