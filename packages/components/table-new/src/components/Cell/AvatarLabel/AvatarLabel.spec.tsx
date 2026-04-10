import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen } from '@testing-library/react';

import { AvatarLabelCell as AvatarLabel } from './AvatarLabel';

const AVATAR = <div data-testid="test-avatar">AV</div>;

describe('AvatarLabel', () => {
  it('should render avatar and title', () => {
    renderWithProvider(<AvatarLabel avatar={AVATAR} title="John Doe" />);

    expect(screen.getByTestId('test-avatar')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render labels', () => {
    renderWithProvider(
      <AvatarLabel avatar={AVATAR} title="John Doe" labels={['Admin', 'User']} />,
    );

    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
  });

  it('should render optional icon', () => {
    const icon = <span data-testid="test-icon">icon</span>;
    renderWithProvider(
      <AvatarLabel avatar={AVATAR} title="John Doe" icon={icon} />,
    );

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('should call avatarAction on click', () => {
    const avatarAction = vi.fn();
    renderWithProvider(
      <AvatarLabel avatar={AVATAR} title="John Doe" avatarAction={avatarAction} />,
    );

    fireEvent.click(screen.getByText('John Doe'));
    expect(avatarAction).toHaveBeenCalled();
  });

  it('should render avatarLink as anchor', () => {
    renderWithProvider(
      <AvatarLabel avatar={AVATAR} title="John Doe" avatarLink="/profile" />,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/profile');
  });

  it('should render loader when provided', () => {
    const loader = <div data-testid="test-loader">Loading</div>;
    renderWithProvider(
      <AvatarLabel avatar={AVATAR} title="John Doe" loader={loader} />,
    );

    expect(screen.getByTestId('test-loader')).toBeInTheDocument();
  });
});
