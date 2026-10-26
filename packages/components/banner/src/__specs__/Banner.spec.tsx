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
  it('should not remount slides or counter dots when the parent re-renders', () => {
    // Spread into a fresh array on purpose: an inline `slides` prop has a new identity per render.
    const { rerender } = renderWithProvider(<Banner slides={[...SLIDES]} />);
    const slideContent = screen.getAllByText(SLIDE_CONTENT);
    const dots = Array.from(screen.getByTestId('banner-counter').children);

    rerender(<Banner slides={[...SLIDES]} />);

    screen.getAllByText(SLIDE_CONTENT).forEach((node, index) => {
      expect(node).toBe(slideContent[index]);
    });
    Array.from(screen.getByTestId('banner-counter').children).forEach(
      (node, index) => {
        expect(node).toBe(dots[index]);
      },
    );
  });
});
