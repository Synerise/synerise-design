import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Icon, { AiIconM } from '@synerise/ds-icon';
import { IconBadge } from '../index';

describe('Icon Badge', () => {
  it('should render with custom icon badge', () => {
    renderWithProvider(
      <IconBadge icon={<Icon component={<AiIconM data-testid="icon-badge" />}  />}>
        TEST
      </IconBadge>
    );
    expect(screen.getByTestId('icon-badge')).toBeInTheDocument();
  });

  it('should render with status icon badge', () => {
    renderWithProvider(
      <IconBadge status="active">
        TEST
      </IconBadge>
    );
    expect(screen.getByTestId('ds-badge-icon-badge')).toBeInTheDocument();
  });
});
