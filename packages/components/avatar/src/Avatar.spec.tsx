import React from 'react';

import { declarationsFor, renderWithProvider } from '@synerise/ds-core/testing';
import Badge from '@synerise/ds-badge';

import Avatar from './index';

const CIRCLE_SHAPE = 'circle';
const SQUARE_SHAPE = 'square';
const DEF_SIZE = 'medium';
const FERN = 'fern';
const RED = 'red';
const IMG_SRC = 'https://hsto.org/web/77c/061/c05/77c061c0550f4acd98380bf554eb8886.png';

describe('Avatar', () => {
  it('should render with text', () => {
    const { container } = renderWithProvider(
      <Avatar backgroundColor={FERN} size={DEF_SIZE} shape={CIRCLE_SHAPE}>
        WW
      </Avatar>
    );

    expect(container.querySelector('.ant-avatar-string')).toHaveTextContent(/^WW$/);
  });

  it('should render with custom icon', () => {
    const { container } = renderWithProvider(
      <Avatar
        backgroundColor={FERN}
        iconComponent={
          <div>
            <svg>i</svg>
          </div>
        }
      />
    );

    const icon = container.querySelector(`svg`);

    expect(container).toContainElement(icon);
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
      </Badge>
    );

    const badge = container.querySelector('.ds-badge');
    const avatar = container.querySelector('.ant-avatar');
    const dot = container.querySelector('.ds-badge-dot');
    
    expect(container).toContainElement(badge as HTMLElement);
    expect(container).toContainElement(avatar as HTMLElement);
    expect(container).toContainElement(dot as HTMLElement);
  });

  it('should render with proper styles', () => {
    const { container } = renderWithProvider(<Avatar backgroundColor={RED} shape={SQUARE_SHAPE} size="small" />);

    const avatar = container.querySelector('.ant-avatar');

    expect(avatar).toHaveStyle(
      'background: var(--ds-color-custom-red-500)',
    );
    expect(avatar).toHaveClass('ant-avatar-square');
  });

  it('should render with inline styles bg color', () => {
    const { container } = renderWithProvider(
      <Avatar
        backgroundColor={RED}
        shape={SQUARE_SHAPE}
        style={{
          background: '#fcc600',
        }}
      />
    );

    const avatar = container.querySelector('.ant-avatar');

    expect(avatar).toHaveStyle('background: rgb(252, 198, 0);');
  });

  it('should render with disabled styles', () => {
    const { container } = renderWithProvider(<Avatar disabled />);

    const avatar = container.querySelector('.ant-avatar');

    expect(avatar).toHaveStyle('pointer-events: none;');
    expect(declarationsFor(avatar)).toContain(
      'opacity:var(--ds-avatar-disabled-opacity)',
    );
  });

  it('should contain `ds-avatar` className', () => {
    const { container } = renderWithProvider(<Avatar>AA</Avatar>);

    expect(container.querySelector('.ds-avatar')).toBeTruthy();
  });
});

describe('Avatar icon tokens', () => {
  const icon = (
    <div>
      <svg>i</svg>
    </div>
  );

  // The avatar root and the string slot inside it, which carries the content colour.
  const avatarParts = (container: HTMLElement) => {
    const root = container.querySelector('.ds-avatar');
    return {
      avatar: declarationsFor(root, { state: 'any' }),
      string: declarationsFor(container.querySelector('.ds-avatar-string'), {
        within: root,
      }),
    };
  };

  it('uses the icon background and icon colour for an icon without backgroundColor', () => {
    const { container } = renderWithProvider(<Avatar iconComponent={icon} />);

    const { avatar, string } = avatarParts(container);
    expect(avatar).toContain('background:var(--ds-avatar-icon-bg-default)');
    expect(avatar).toContain('color:var(--ds-avatar-icon-icon)');
    expect(avatar).not.toContain('color:var(--ds-avatar-icon-icon) !important');
    expect(avatar).not.toContain('--ds-avatar-text-text');
    expect(string).toContain('color:inherit');
    expect(string).not.toContain('--ds-avatar-text-text');
  });

  it('treats backgroundColor="auto" as unset for an icon', () => {
    const { container } = renderWithProvider(<Avatar iconComponent={icon} backgroundColor="auto" />);

    expect(declarationsFor(container.querySelector('.ds-avatar'))).toContain(
      'background:var(--ds-avatar-icon-bg-default)',
    );
  });

  it('keeps the custom background and the initials colour when backgroundColor is set', () => {
    const { container } = renderWithProvider(<Avatar iconComponent={icon} backgroundColor={FERN} />);

    const { avatar, string } = avatarParts(container);
    expect(avatar).toContain('--ds-color-custom-fern-500');
    expect(avatar).toContain('color:var(--ds-avatar-text-text) !important');
    expect(avatar).not.toContain('--ds-avatar-icon-');
    expect(string).toContain('color:var(--ds-avatar-text-text) !important');
  });
});

describe('Avatar background hue', () => {
  it('maps the legacy 050 hue to the 50 custom colour token', () => {
    const { container } = renderWithProvider(
      <Avatar backgroundColor="grey" backgroundColorHue="050">
        AB
      </Avatar>,
    );

    const avatar = declarationsFor(container.querySelector('.ds-avatar'));
    expect(avatar).toContain('background:var(--ds-color-custom-grey-50)');
    expect(avatar).not.toContain('background:transparent');
  });

  it('resolves a family-050 shorthand in backgroundColor', () => {
    const { container } = renderWithProvider(<Avatar backgroundColor="grey-050">AB</Avatar>);

    expect(declarationsFor(container.querySelector('.ds-avatar'))).toContain(
      'background:var(--ds-color-custom-grey-50)',
    );
  });

  it('uses a var() background as is', () => {
    const { container } = renderWithProvider(
      <Avatar backgroundColor="var(--ds-color-background-base-muted)">AB</Avatar>,
    );

    expect(declarationsFor(container.querySelector('.ds-avatar'))).toContain(
      'background:var(--ds-color-background-base-muted)',
    );
  });

  it('falls back to transparent for an unknown family', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const { container } = renderWithProvider(<Avatar backgroundColor="not-a-family">AB</Avatar>);

    expect(declarationsFor(container.querySelector('.ds-avatar'))).toContain('background:transparent');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('"not-a-family"'));
    warn.mockRestore();
  });
});

