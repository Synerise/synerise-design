import React from 'react';

import Icon, { AiIconM } from '@synerise/ds-icon';
import { renderWithProvider } from '@synerise/ds-utils';
import { screen } from '@testing-library/react';

import { IconBadge } from '../index';

describe('Icon Badge', () => {
  it('should render with custom icon badge', () => {
    renderWithProvider(
      <IconBadge
        icon={<Icon component={<AiIconM data-testid="icon-badge" />} />}
      >
        TEST
      </IconBadge>,
    );
    expect(screen.getByTestId('icon-badge')).toBeInTheDocument();
  });

  it('should render with status icon badge', () => {
    renderWithProvider(<IconBadge status="active">TEST</IconBadge>);
    expect(screen.getByTestId('ds-badge-icon-badge')).toBeInTheDocument();
  });
});
