import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
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
    expect(screen.getAllByText(SLIDE_CONTENT)[0]).toBeInTheDocument()
  });
  it('should render without counter if only single slide', () => {
    renderWithProvider(<Banner slides={[SLIDES[0]]} />);
    expect(screen.queryByTestId('banner-counter')).not.toBeInTheDocument();
  });
  it('should render counter if multiple slides', () => {
    renderWithProvider(<Banner slides={SLIDES} />);
    expect(screen.getByTestId('banner-counter')).toBeInTheDocument();
  });
});
