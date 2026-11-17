import React from 'react';
import { declarationsFor, renderWithProvider } from '@synerise/ds-core/testing';
import { selectColorByLetter } from '@synerise/ds-utils';
import UserAvatar from './UserAvatar';

const testUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@synerise.com',
};

const testUserImage = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@synerise.com',
  avatar: 'http://image.com/image.jpg',
};

describe('UserAvatar', () => {
  test('should render', () => {
    const { container } = renderWithProvider(<UserAvatar />);
    expect(container.getElementsByClassName('user-m').length).toBe(1);
  });
  test('should render with user data', () => {
    const userAvatar = renderWithProvider(<UserAvatar user={testUser} />);
    const nameFirstLetters = userAvatar.getByText(testUser.firstName.charAt(0) + testUser.lastName.charAt(0));
    expect(nameFirstLetters).toBeTruthy();
  });
  test('should render with user data and avatar', () => {
    const userAvatar = renderWithProvider(<UserAvatar user={testUserImage} />);
    const img = userAvatar.getByRole('img');
    expect(img).toHaveAttribute('src', testUserImage.avatar);
  });
  test('colours the initials avatar from the first initial', () => {
    const { container } = renderWithProvider(<UserAvatar user={testUser} />);
    const family = (selectColorByLetter('J', true) as { color: string }).color;
    expect(declarationsFor(container.querySelector('.ds-avatar'))).toContain(
      `background:var(--ds-color-custom-${family}-500)`,
    );
  });
  test('ignores the deprecated backgroundColor', () => {
    const { container } = renderWithProvider(<UserAvatar user={testUser} backgroundColor="grey-800" />);
    expect(declarationsFor(container.querySelector('.ds-avatar'))).not.toContain('grey-800');
  });
});

describe('UserAvatar icon tile', () => {
  const avatarOf = (container: HTMLElement) =>
    declarationsFor(container.querySelector('.ds-avatar'), { state: 'any' });
  // An Icon's `color` prop styles the svg through its container (`.ds-icon svg`).
  const iconSvgOf = (container: HTMLElement) => {
    const icon = container.querySelector('.ds-icon');
    return declarationsFor(icon?.querySelector('svg') ?? null, { within: icon });
  };

  test('lets the fallback icon inherit, so a container can recolour it', () => {
    const { container } = renderWithProvider(<UserAvatar />);

    expect(iconSvgOf(container)).toContain('color:inherit');
    expect(iconSvgOf(container)).not.toContain('--ds-color-icon-base-subtle');
    expect(avatarOf(container)).toContain('color:var(--ds-avatar-icon-icon)');
  });

  test('frames the fallback user icon in the bordered icon tile', () => {
    const { container } = renderWithProvider(<UserAvatar />);

    const avatar = avatarOf(container);
    expect(avatar).toContain('background:var(--ds-color-background-base-default)');
    expect(avatar).toContain('border:1px solid var(--ds-color-border-base-strong)');
    expect(avatar).toContain('box-shadow:var(--ds-shadows-shadow-1)');
  });

  test.each([
    ['a photo', { avatar: testUserImage.avatar }],
    ['a default avatar illustration', { avatarId: 42 }],
  ])('does not frame %s', (_, user) => {
    const { container } = renderWithProvider(<UserAvatar user={user} />);

    const avatar = avatarOf(container);
    expect(avatar).not.toContain('--ds-color-border-base-strong');
    expect(avatar).not.toContain('--ds-shadows-shadow-1');
    expect(avatar).not.toContain('--ds-color-background-base-default');
  });
});
