import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-core';

import Thumbnail from '../Thumbnail';
import { type ThumbnailProps } from '../Thumbnail.types';

const SRC = 'https://example.com/photo.jpg';
const ALT = 'Example photo';

const renderThumbnail = (props: Partial<ThumbnailProps> = {}) =>
  renderWithProvider(<Thumbnail src={SRC} alt={ALT} {...props} />);

describe('Thumbnail', () => {
  it('renders the image with src and alt', () => {
    // ARRANGE
    renderThumbnail();

    // ASSERT
    const image = screen.getByTestId('image-thumbnail-image');
    expect(image).toHaveAttribute('src', SRC);
    expect(image).toHaveAttribute('alt', ALT);
  });

  it('renders the empty placeholder when no src is provided', () => {
    // ARRANGE
    renderThumbnail({ src: undefined });

    // ASSERT
    expect(screen.getByTestId('image-thumbnail-empty')).toBeInTheDocument();
    expect(
      screen.queryByTestId('image-thumbnail-image'),
    ).not.toBeInTheDocument();
  });

  it('renders a custom fallback when the image fails to load', () => {
    // ARRANGE
    renderThumbnail({
      fallback: <span data-testid="custom-fallback">broken</span>,
    });

    // ACT
    fireEvent.error(screen.getByTestId('image-thumbnail-image'));

    // ASSERT
    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
  });

  it('is interactive and fires onClick when openZoom is set', () => {
    // ARRANGE
    const onClick = vi.fn();
    renderThumbnail({ openZoom: true, onClick });

    // ACT
    const tile = screen.getByTestId('image-thumbnail');
    fireEvent.click(tile);

    // ASSERT
    expect(tile).toHaveAttribute('role', 'button');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('activates with the keyboard when interactive', () => {
    // ARRANGE
    const onClick = vi.fn();
    renderThumbnail({ openZoom: true, onClick });

    // ACT
    fireEvent.keyDown(screen.getByTestId('image-thumbnail'), { key: 'Enter' });

    // ASSERT
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is not interactive without openZoom or onClick', () => {
    // ARRANGE
    renderThumbnail();

    // ASSERT
    expect(screen.getByTestId('image-thumbnail')).not.toHaveAttribute('role');
  });

  it('renders the hover overlay when interactive', () => {
    // ARRANGE
    renderThumbnail({ openZoom: true });

    // ASSERT
    expect(screen.getByTestId('image-thumbnail-overlay')).toBeInTheDocument();
  });

  it('does not render the hover overlay when not interactive', () => {
    // ARRANGE
    renderThumbnail();

    // ASSERT
    expect(
      screen.queryByTestId('image-thumbnail-overlay'),
    ).not.toBeInTheDocument();
  });

  it('shows a delete affordance and calls onDelete without triggering onClick', () => {
    // ARRANGE
    const onDelete = vi.fn();
    const onClick = vi.fn();
    renderThumbnail({ deletable: true, onDelete, openZoom: true, onClick });

    // ACT
    fireEvent.click(screen.getByTestId('image-thumbnail-delete'));

    // ASSERT
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not render a delete affordance by default', () => {
    // ARRANGE
    renderThumbnail();

    // ASSERT
    expect(
      screen.queryByTestId('image-thumbnail-delete'),
    ).not.toBeInTheDocument();
  });

  it('labels the delete affordance with the default text', () => {
    // ARRANGE
    renderThumbnail({ deletable: true });

    // ASSERT
    expect(screen.getByTestId('image-thumbnail-delete')).toHaveAttribute(
      'aria-label',
      'Delete',
    );
  });

  it('overrides the delete label via the texts prop', () => {
    // ARRANGE
    renderThumbnail({ deletable: true, texts: { delete: 'Usuń' } });

    // ASSERT
    expect(screen.getByTestId('image-thumbnail-delete')).toHaveAttribute(
      'aria-label',
      'Usuń',
    );
  });
});
