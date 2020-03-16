import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';

import Avatar from '../index';
import Badge from '@synerise/ds-badge';

const CIRCLE_SHAPE = 'circle';
const SQUARE_SHAPE = 'square';
const DEF_SIZE = 'medium';
const FERN = 'fern';
const RED = 'red';
const IMG_SRC = 'https://hsto.org/web/77c/061/c05/77c061c0550f4acd98380bf554eb8886.png';

describe('Avatar', () => {
  it('should render with text', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Avatar backgroundColor={FERN} size={DEF_SIZE} shape={CIRCLE_SHAPE}>
        WW
      </Avatar>
    );

    // ASSERT
    expect(container.querySelector('.ant-avatar-string')).toHaveTextContent(/^WW$/);
  });

  it('should render with custom icon', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Avatar
        backgroundColor={FERN}
        iconComponent={
          <div>
            <svg></svg>
          </div>
        }
      />
    );

    const icon = container.querySelector(`svg`);

    // ASSERT
    expect(container).toContainElement(icon);
  });

  it('should render with image', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Avatar src={IMG_SRC} />);

    const img = container.querySelector('img');

    // ASSERT
    expect(container).toContainElement(img);
    expect(img).toHaveAttribute('src', expect.stringContaining(`${IMG_SRC}`));
  });

  it('should render with badge dot', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Badge status={'inactive'}>
        <Avatar hasStatus={true} src={IMG_SRC} size={'small'} />
      </Badge>
    );

    const badge = container.querySelector('.ant-badge');
    const avatar = container.querySelector('.ant-avatar');
    const dot = container.querySelector('.ant-badge-dot');

    // ASSERT
    expect(container).toContainElement(badge as HTMLElement);
    expect(container).toContainElement(avatar as HTMLElement);
    expect(container).toContainElement(dot as HTMLElement);
  });

  it('should render with proper styles', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Avatar backgroundColor={RED} shape={SQUARE_SHAPE} size={32} />);

    const avatar = container.querySelector('.ant-avatar');

    // ASSERT
    expect(avatar).toHaveStyle('width:32px;height:32px;line-height:32px;');
    expect(avatar).toHaveStyle('background: #ff8475');
    expect(avatar).toHaveClass('ant-avatar-square');
  });

  it('should render with inline styles bg color', () => {
    // ARRANGE
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

    // ASSERT
    expect(avatar).toHaveStyle('background: rgb(252, 198, 0);');
  });

  it('should render with disabled styles', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Avatar disabled />);

    const avatar = container.querySelector('.ant-avatar');

    // ASSERT
    expect(avatar).toHaveStyle('opacity: 0.4;pointer-events: none;');
  });
});
