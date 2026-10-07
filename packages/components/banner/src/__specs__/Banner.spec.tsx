import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { screen } from '@testing-library/react';

import Banner from '../index';

const SLIDE_CONTENT = 'content';
const SLIDES = [
  {
    mainContent: {
      media: SLIDE_CONTENT,
    },
  },

  {
    mainContent: {
      media: SLIDE_CONTENT,
    },
  },
];

describe('Banner', () => {
  it('should render', () => {
    renderWithProvider(<Banner slides={SLIDES} />);
    expect(screen.getAllByText(SLIDE_CONTENT)[0]).toBeInTheDocument();
  });
  it('should render without counter if only single slide', () => {
    renderWithProvider(<Banner slides={[SLIDES[0]]} />);
    expect(screen.queryByTestId('banner-counter')).not.toBeInTheDocument();
  });
  it('should render counter if multiple slides', () => {
    renderWithProvider(<Banner slides={SLIDES} />);
    expect(screen.getByTestId('banner-counter')).toBeInTheDocument();
  });
  it('colours the default title status with theme-aware tokens', () => {
    renderWithProvider(
      <Banner
        slides={[
          {
            mainContent: {
              title: 'Title',
              titleStatus: { name: 'New' },
            },
          },
        ]}
      />,
    );
    const css = Array.from(document.querySelectorAll('style'))
      .map((style) => style.textContent ?? '')
      .join('')
      .replace(/\s/g, '');

    expect(css).toContain('var(--ds-color-custom-yellow-600)');
    expect(css).toContain('var(--ds-color-text-base-onsolid)');
  });
});
