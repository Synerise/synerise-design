import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-core';

import { type ImageSource } from '../../shared/Image.shared.types';
import Gallery from '../Gallery';
import { type GalleryProps } from '../Gallery.types';

const IMAGES: ImageSource[] = [
  { src: 'https://example.com/a.jpg', alt: 'Image A' },
  { src: 'https://example.com/b.jpg', alt: 'Image B' },
  { src: 'https://example.com/c.jpg', alt: 'Image C' },
];

const renderGallery = (props: Partial<GalleryProps> = {}) =>
  renderWithProvider(<Gallery images={IMAGES} {...props} />);

describe('Gallery', () => {
  it('renders one thumbnail per image', () => {
    // ARRANGE
    renderGallery();

    // ASSERT
    expect(screen.getAllByTestId('image-thumbnail')).toHaveLength(
      IMAGES.length,
    );
  });

  it('opens the preview at the clicked thumbnail index', () => {
    // ARRANGE
    renderGallery();

    // ACT
    fireEvent.click(screen.getAllByTestId('image-thumbnail')[1]);

    // ASSERT
    expect(screen.getByTestId('image-preview')).toBeVisible();
    expect(screen.getByTestId('image-preview-counter')).toHaveTextContent(
      '2 of 3',
    );
  });

  it('does not open the preview when openZoom is false', () => {
    // ARRANGE
    renderGallery({ openZoom: false });

    // ACT
    fireEvent.click(screen.getAllByTestId('image-thumbnail')[0]);

    // ASSERT
    expect(screen.queryByTestId('image-preview')).not.toBeInTheDocument();
  });

  it('calls onDelete with the thumbnail index', () => {
    // ARRANGE
    const onDelete = vi.fn();
    renderGallery({ deletable: true, onDelete });

    // ACT
    fireEvent.click(screen.getAllByTestId('image-thumbnail-delete')[2]);

    // ASSERT
    expect(onDelete).toHaveBeenCalledWith(2);
  });
});
