import React from 'react';
import { declarationsFor, renderWithProvider } from '@synerise/ds-core/testing';
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
  test('should render', () => {
    const { container, debug } = renderWithProvider(<ObjectAvatar />);
    debug();
    expect(container.getElementsByClassName('mail-m').length).toBe(1);
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

  test('uses the avatar icon tokens for an icon avatar without backgroundColor', () => {
    const { container } = renderWithProvider(<ObjectAvatar />);

    const avatar = avatarOf(container);
    expect(avatar).toContain('background:var(--ds-avatar-icon-bg-default)');
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

  test('keeps the avatar icon colour on an icon with a custom background', () => {
    const { container } = renderWithProvider(<ObjectAvatar backgroundColor="green" />);

    expect(iconSvgOf(container)).toContain('--ds-avatar-icon-icon');
  });

  test('treats backgroundColor="auto" on an icon avatar as unset', () => {
    const { container } = renderWithProvider(<ObjectAvatar backgroundColor="auto" />);

    expect(declarationsFor(container.querySelector('.ds-avatar'))).toContain(
      'background:var(--ds-avatar-icon-bg-default)',
    );
  });

  test('uses the custom colour for an icon avatar with backgroundColor', () => {
    const { container } = renderWithProvider(<ObjectAvatar backgroundColor="green" />);

    expect(avatarOf(container)).toContain('--ds-color-custom-green-100');
    expect(avatarOf(container, 'any')).not.toContain('--ds-avatar-icon-bg-');
  });

  test('uses the custom colour hue from a family-hue backgroundColor', () => {
    const { container } = renderWithProvider(<ObjectAvatar backgroundColor="green-200" />);

    expect(declarationsFor(container.querySelector('.ds-avatar'))).toContain('--ds-color-custom-green-200');
  });

  test('uses the custom icon colour when color is set', () => {
    const { container } = renderWithProvider(<ObjectAvatar color="red" />);

    const icon = iconSvgOf(container);
    expect(icon).toContain('--ds-color-custom-red-600');
    expect(icon).not.toContain('--ds-avatar-icon-icon');
  });

  test('keeps the custom colour for a text avatar', () => {
    const { container } = renderWithProvider(<ObjectAvatar object={testObject} />);

    expect(avatarOf(container)).toContain('--ds-color-custom-');
    expect(avatarOf(container, 'any')).not.toContain('--ds-avatar-icon-bg-');
  });
});

