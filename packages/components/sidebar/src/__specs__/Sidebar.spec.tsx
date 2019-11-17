import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import Sidebar from "../index";

describe('Sidebar', () => {
  const HEADER = 'header test';
  const ID = 'id';
  const CHILDREN = 'Children';

  it('should render header', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Sidebar>
        <Sidebar.Panel header={HEADER} id={ID}>
          {CHILDREN}
        </Sidebar.Panel>
      </Sidebar>
    );

    // ASSERT
    expect(getByText(HEADER)).toBeTruthy();
  });
});
