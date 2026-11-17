import React from 'react';

import { declarationsFor, renderWithProvider } from '@synerise/ds-core/testing';
import Badge from '@synerise/ds-badge';
import { selectColorByLetter } from '@synerise/ds-utils';

import Avatar from './index';

const IMG_SRC = 'https://hsto.org/web/77c/061/c05/77c061c0550f4acd98380bf554eb8886.png';

const DEPRECATED_COLOR_PROPS = {
  backgroundColor: 'green',
  backgroundColorHue: '050',
} as const;

const icon = (
  <div>
    <svg>i</svg>
  </div>
);

const avatarOf = (container: HTMLElement) =>
  declarationsFor(container.querySelector('.ds-avatar'), { state: 'any' });

const letterFamily = (letter: string) =>
  (selectColorByLetter(letter, true) as { color: string }).color;

// The frame is the border and shadow; the icon tile is the frame plus the base background.
const TILE_FRAME = [
  'border:1px solid var(--ds-color-border-base-strong)',
  'box-shadow:var(--ds-shadows-shadow-1)',
];
const expectFrame = (declarations: string) => {
  TILE_FRAME.forEach((declaration) => expect(declarations).toContain(declaration));
};
const expectNoFrame = (declarations: string) => {
  expect(declarations).not.toContain('--ds-color-border-base-strong');
  expect(declarations).not.toContain('--ds-shadows-shadow-1');
};
const expectIconTile = (declarations: string) => {
  expectFrame(declarations);
  expect(declarations).toContain('background:var(--ds-color-background-base-default)');
};
const expectNoIconTile = (declarations: string) => {
  expectNoFrame(declarations);
  expect(declarations).not.toContain('--ds-color-background-base-default');
};

describe('Avatar', () => {
  it('should render with text', () => {
    const { container } = renderWithProvider(
      <Avatar size="medium" shape="circle">
        WW
      </Avatar>,
    );

    expect(container.querySelector('.ant-avatar-string')).toHaveTextContent(/^WW$/);
  });

  it('should render with custom icon', () => {
    const { container } = renderWithProvider(<Avatar iconComponent={icon} />);

    expect(container).toContainElement(container.querySelector('svg'));
  });

  it('should render with image', () => {
    const { container } = renderWithProvider(<Avatar src={IMG_SRC} />);

    const img = container.querySelector('img');
    expect(container).toContainElement(img);
    expect(img).toHaveAttribute('src', expect.stringContaining(`${IMG_SRC}`));
  });

  it('should render with badge dot', () => {
    const { container } = renderWithProvider(
      <Badge status="inactive">
        <Avatar hasStatus src={IMG_SRC} size="small" />
      </Badge>,
    );

    expect(container).toContainElement(container.querySelector('.ds-badge') as HTMLElement);
    expect(container).toContainElement(container.querySelector('.ant-avatar') as HTMLElement);
    expect(container).toContainElement(container.querySelector('.ds-badge-dot') as HTMLElement);
  });

  it('keeps the square shape class', () => {
    const { container } = renderWithProvider(<Avatar shape="square">AB</Avatar>);

    expect(container.querySelector('.ant-avatar')).toHaveClass('ant-avatar-square');
  });

  it('lets an inline style override the background', () => {
    const { container } = renderWithProvider(
      <Avatar shape="square" style={{ background: '#fcc600' }}>
        AB
      </Avatar>,
    );

    expect(container.querySelector('.ant-avatar')).toHaveStyle('background: rgb(252, 198, 0);');
  });

  it('should render with disabled styles', () => {
    const { container } = renderWithProvider(<Avatar disabled />);

    const avatar = container.querySelector('.ant-avatar');
    expect(avatar).toHaveStyle('pointer-events: none;');
    expect(declarationsFor(avatar)).toContain('opacity:var(--ds-avatar-disabled-opacity)');
  });

  it('should contain `ds-avatar` className', () => {
    const { container } = renderWithProvider(<Avatar>AA</Avatar>);

    expect(container.querySelector('.ds-avatar')).toBeTruthy();
  });
});

describe('Avatar content', () => {
  it('derives a text avatar background from its first letter', () => {
    const { container } = renderWithProvider(<Avatar>AB</Avatar>);

    const avatar = avatarOf(container);
    expect(avatar).toContain(`background:var(--ds-color-custom-${letterFamily('A')}-500)`);
    expect(avatar).toContain('color:var(--ds-avatar-text-text) !important');
    expectNoIconTile(avatar);
  });

  it('gives different initials their own colour', () => {
    const first = avatarOf(renderWithProvider(<Avatar>AB</Avatar>).container);
    const second = avatarOf(renderWithProvider(<Avatar>BC</Avatar>).container);

    expect(first).not.toEqual(second);
  });

  it('draws an icon avatar as the bordered icon tile', () => {
    const { container } = renderWithProvider(<Avatar iconComponent={icon} />);

    const avatar = avatarOf(container);
    expectIconTile(avatar);
    expect(avatar).toContain('color:var(--ds-avatar-icon-icon)');
    expect(avatar).not.toContain('--ds-avatar-text-text');
    expect(avatar).not.toContain('--ds-color-custom-');
    expect(
      declarationsFor(container.querySelector('.ds-avatar-string'), {
        within: container.querySelector('.ds-avatar'),
      }),
    ).toContain('color:inherit');
  });

  it('does not frame an image, even with a fallback icon', () => {
    const { container } = renderWithProvider(<Avatar iconComponent={icon} src={IMG_SRC} />);

    const avatar = avatarOf(container);
    expectNoIconTile(avatar);
    expect(avatar).not.toContain('--ds-color-custom-');
  });

  it('leaves other content, like an illustration, on a transparent background', () => {
    const { container } = renderWithProvider(
      <Avatar>
        <svg data-testid="illustration" />
      </Avatar>,
    );

    const avatar = avatarOf(container);
    expect(avatar).toContain('background:transparent');
    expectNoIconTile(avatar);
  });

  it.each([
    ['an icon', { iconComponent: icon }, expectIconTile],
    ['text', { children: 'AB' }, (avatar: string) => expect(avatar).toContain(`-${letterFamily('A')}-500`)],
  ])('ignores the deprecated colour props on %s', (_, props, expectation) => {
    const { container } = renderWithProvider(<Avatar {...props} {...DEPRECATED_COLOR_PROPS} />);

    const avatar = avatarOf(container);
    expectation(avatar);
    expect(avatar).not.toContain('--ds-color-custom-green');
    expect(container.querySelector('.ds-avatar')).not.toHaveAttribute('backgroundcolor');
    expect(container.querySelector('.ds-avatar')).not.toHaveAttribute('backgroundcolorhue');
  });
});

describe('Avatar hasTile', () => {
  it('frames an image avatar without covering the image', () => {
    const { container } = renderWithProvider(<Avatar hasTile src={IMG_SRC} />);

    const avatar = avatarOf(container);
    expectFrame(avatar);
    expect(avatar).toContain('background:transparent');
    expect(container.querySelector('img')).toHaveAttribute('src', IMG_SRC);
  });

  it.each([
    ['text, which has a colour of its own', { children: 'AB' }],
    ['other content, such as an illustration', { children: <svg /> }],
  ])('ignores %s', (_, props) => {
    expectNoFrame(avatarOf(renderWithProvider(<Avatar hasTile {...props} />).container));
  });

  it('leaves an icon avatar as it already was', () => {
    const plain = avatarOf(renderWithProvider(<Avatar iconComponent={icon} />).container);
    const tiled = avatarOf(renderWithProvider(<Avatar hasTile iconComponent={icon} />).container);

    expectIconTile(tiled);
    expect(tiled).toEqual(plain);
  });

  it('is off by default', () => {
    expectNoFrame(avatarOf(renderWithProvider(<Avatar src={IMG_SRC} />).container));
  });

  it('does not reach the DOM', () => {
    const { container } = renderWithProvider(<Avatar hasTile src={IMG_SRC} />);

    expect(container.querySelector('.ds-avatar')).not.toHaveAttribute('hastile');
  });
});
