import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';
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

    const badge = container.querySelector('.ant-badge');
    const avatar = container.querySelector('.ant-avatar');
    const dot = container.querySelector('.ant-badge-dot');
    
    expect(container).toContainElement(badge as HTMLElement);
    expect(container).toContainElement(avatar as HTMLElement);
    expect(container).toContainElement(dot as HTMLElement);
  });

  it('should render with proper styles', () => {
    const { container } = renderWithProvider(<Avatar backgroundColor={RED} shape={SQUARE_SHAPE} size="small" />);

    const avatar = container.querySelector('.ant-avatar');

    expect(avatar).toHaveStyle('background: #ff5a4d');
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

    expect(avatar).toHaveStyle('opacity: 0.4;pointer-events: none;');
  });

  it('should contain `ds-avatar` className', () => {
    const { container } = renderWithProvider(<Avatar>AA</Avatar>);

    expect(container.querySelector('.ds-avatar')).toBeTruthy();
  });
});
