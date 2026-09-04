import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';

import Icon from '../Icon';
import { getIconComponent } from '../iconLoader';
import '../registerAllIcons';

// Isolated in its own file: registerAllIcons fills the module-level cache, which would mask the
// asynchronous behaviour the other specs assert.
describe('registerAllIcons', () => {
  it('makes iconName resolve synchronously', () => {
    // No await anywhere — that is the entire contract of this entry point.
    const { container } = renderWithProvider(<Icon iconName="AddM" />);

    expect(container.querySelector('[data-testid="ds-icon-add-m"]')).toBeTruthy();
    expect(getIconComponent('AddM')).toBeTypeOf('function');
  });

  it('registers every icon set', () => {
    expect(getIconComponent('AddL')).toBeTypeOf('function');
    expect(getIconComponent('AbTestXl')).toBeTypeOf('function');
  });
});
