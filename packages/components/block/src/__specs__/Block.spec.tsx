import React from 'react';

import Icon, { EditM } from '@synerise/ds-icon';
import { renderWithProvider } from '@synerise/ds-utils';

import Block from '../index';

describe('Sidebar', () => {
  const TITLE = 'Title';

  it('should render title', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Block isDragging={false} icon={<Icon component={<EditM />} />}>
        {TITLE}
      </Block>,
    );

    // ASSERT
    expect(getByText(TITLE)).toBeTruthy();
  });
});
