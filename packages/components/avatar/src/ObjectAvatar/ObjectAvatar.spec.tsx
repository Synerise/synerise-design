import React from 'react';
import { declarationsFor, renderWithProvider } from '@synerise/ds-core/testing';
import { selectColorByLetter } from '@synerise/ds-utils';
import ObjectAvatar from './ObjectAvatar';

const testObject = {
  name: 'Shovel',
  description: 'Some product',
  status: 'API',
};

const testObjectImage = {
  name: 'Shovel',
  description: 'Some product',
  status: 'API',
  avatar: 'https://image.com/image.jpg',
};

describe('ObjectAvatar', () => {
  test('falls back to the Close2M icon without an icon, name or image', () => {
    const { container } = renderWithProvider(<ObjectAvatar />);
    expect(container.getElementsByClassName('close-2-m').length).toBe(1);
    expect(container.getElementsByClassName('mail-m').length).toBe(0);
  });
  test('should render with object data', () => {
    const objectAvatar = renderWithProvider(<ObjectAvatar object={testObject} />);
    const firstLetters = objectAvatar.getByText(testObject.name.charAt(0));
    expect(firstLetters).toBeTruthy();
  });
  test('should render with object data and avatar', () => {
    const objectAvatar = renderWithProvider(<ObjectAvatar object={testObjectImage} />);
    const img = objectAvatar.getByRole('img');
    expect(img).toHaveAttribute('src', testObjectImage.avatar);
  });
});

describe('ObjectAvatar colour tokens', () => {
  const avatarOf = (container: HTMLElement, state?: string) =>
    declarationsFor(container.querySelector('.ds-avatar'), { state });
  // An Icon's `color` prop styles the svg through its container (`.ds-icon svg`).
  const iconSvgOf = (container: HTMLElement) => {
    const icon = container.querySelector('.ds-icon');
    return declarationsFor(icon?.querySelector('svg') ?? null, { within: icon });
  };

  test('frames an icon avatar without backgroundColor in the bordered icon tile', () => {
    const { container } = renderWithProvider(<ObjectAvatar />);

    const avatar = avatarOf(container);
    expect(avatar).toContain('background:var(--ds-color-background-base-default)');
    expect(avatar).toContain('border:1px solid var(--ds-color-border-base-strong)');
    expect(avatar).toContain('box-shadow:var(--ds-shadows-shadow-1)');
    expect(avatarOf(container, ':hover')).not.toContain('background:');
    expect(avatarOf(container, 'any')).not.toContain('--ds-color-custom-');
    expect(avatar).toContain('color:var(--ds-avatar-icon-icon)');
    expect(iconSvgOf(container)).not.toContain('--ds-avatar-icon-icon');
  });

  test('lets the icon inherit so a container can recolour it', () => {
    const { container } = renderWithProvider(<ObjectAvatar />);

    const icon = iconSvgOf(container);
    expect(icon).toContain('color:inherit');
    expect(icon).not.toContain('--ds-avatar-icon-icon');
    expect(icon).not.toContain('--ds-color-custom-');
  });

  test('stays an icon tile with the deprecated backgroundColor', () => {
    const { container } = renderWithProvider(<ObjectAvatar backgroundColor="green" />);

    expect(avatarOf(container)).toContain('background:var(--ds-color-background-base-default)');
    expect(avatarOf(container, 'any')).not.toContain('--ds-color-custom-green');
  });

  test('does not frame an image avatar', () => {
    const { container } = renderWithProvider(<ObjectAvatar object={testObjectImage} />);

    const avatar = avatarOf(container, 'any');
    expect(avatar).not.toContain('--ds-color-border-base-strong');
    expect(avatar).not.toContain('--ds-shadows-shadow-1');
  });

  test('uses the custom icon colour when color is set', () => {
    const { container } = renderWithProvider(<ObjectAvatar color="red" />);

    const icon = iconSvgOf(container);
    expect(icon).toContain('--ds-color-custom-red-600');
    expect(icon).not.toContain('--ds-avatar-icon-icon');
  });

  test('colours a text avatar from the first letter of its name', () => {
    const { container } = renderWithProvider(<ObjectAvatar object={testObject} />);

    const family = (selectColorByLetter('S', true) as { color: string }).color;
    expect(avatarOf(container)).toContain(`background:var(--ds-color-custom-${family}-500)`);
    expect(avatarOf(container, 'any')).not.toContain('--ds-color-border-base-strong');
  });
});

