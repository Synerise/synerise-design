import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-core';

import { type ImageSource } from '../../shared/Image.shared.types';
import ImagePreview from '../ImagePreview';
import { type ImagePreviewProps } from '../ImagePreview.types';

const IMAGES: ImageSource[] = [
  { src: 'https://example.com/a.jpg', alt: 'Image A' },
  { src: 'https://example.com/b.jpg', alt: 'Image B' },
  { src: 'https://example.com/c.jpg', alt: 'Image C' },
];

const renderPreview = (props: Partial<ImagePreviewProps> = {}) =>
  renderWithProvider(
    <ImagePreview
      open
      images={IMAGES}
      index={0}
      onIndexChange={vi.fn()}
      onClose={vi.fn()}
      {...props}
    />,
  );

describe('ImagePreview', () => {
  it('renders the current image and dialog role when open', () => {
    // ARRANGE
    renderPreview();

    // ASSERT
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    const image = screen.getByTestId('image-preview-image');
    expect(image).toHaveAttribute('src', IMAGES[0].src);
    expect(image).toHaveAttribute('alt', IMAGES[0].alt);
  });

  it('renders the image at the controlled index', () => {
    // ARRANGE
    renderPreview({ index: 1 });

    // ASSERT
    expect(screen.getByTestId('image-preview-image')).toHaveAttribute(
      'src',
      IMAGES[1].src,
    );
  });

  it('moves initial focus to the dialog, not the close button', () => {
    // ARRANGE
    renderPreview();

    // ASSERT
    const dialog = screen.getByTestId('image-preview');
    expect(dialog).toHaveFocus();
    expect(screen.getByTestId('image-preview-close')).not.toHaveFocus();
  });

  it('does not mount when closed with destroyOnClose', () => {
    // ARRANGE
    renderPreview({ open: false, destroyOnClose: true });

    // ASSERT
    expect(screen.queryByTestId('image-preview')).not.toBeInTheDocument();
  });

  it('stays mounted but hidden when closed without destroyOnClose', () => {
    // ARRANGE
    renderPreview({ open: false });

    // ASSERT
    expect(screen.getByTestId('image-preview')).not.toBeVisible();
  });

  it('calls onClose when the close button is clicked', () => {
    // ARRANGE
    const onClose = vi.fn();
    renderPreview({ onClose });

    // ACT
    fireEvent.click(screen.getByTestId('image-preview-close'));

    // ASSERT
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the backdrop is clicked', () => {
    // ARRANGE
    const onClose = vi.fn();
    renderPreview({ onClose });

    // ACT
    fireEvent.click(screen.getByTestId('image-preview'));

    // ASSERT
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on backdrop click when maskClosable is false', () => {
    // ARRANGE
    const onClose = vi.fn();
    renderPreview({ onClose, maskClosable: false });

    // ACT
    fireEvent.click(screen.getByTestId('image-preview'));

    // ASSERT
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not close when a drag (pan) ends on the backdrop', () => {
    // ARRANGE
    const onClose = vi.fn();
    renderPreview({ onClose });
    const overlay = screen.getByTestId('image-preview');

    // ACT — pointer moves well beyond the click threshold before release
    fireEvent.mouseDown(overlay, { clientX: 20, clientY: 20 });
    fireEvent.click(overlay, { clientX: 200, clientY: 20 });

    // ASSERT
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes on a backdrop click that does not move (mousedown + click in place)', () => {
    // ARRANGE
    const onClose = vi.fn();
    renderPreview({ onClose });
    const overlay = screen.getByTestId('image-preview');

    // ACT
    fireEvent.mouseDown(overlay, { clientX: 30, clientY: 30 });
    fireEvent.click(overlay, { clientX: 31, clientY: 30 });

    // ASSERT
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when the image itself is clicked', () => {
    // ARRANGE
    const onClose = vi.fn();
    renderPreview({ onClose });

    // ACT
    fireEvent.click(screen.getByTestId('image-preview-image'));

    // ASSERT
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape is pressed', () => {
    // ARRANGE
    const onClose = vi.fn();
    renderPreview({ onClose });

    // ACT
    fireEvent.keyDown(document, { key: 'Escape' });

    // ASSERT
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('hides the close button when closable is false', () => {
    // ARRANGE
    renderPreview({ closable: false });

    // ASSERT
    expect(
      screen.queryByTestId('image-preview-close'),
    ).not.toBeInTheDocument();
  });

  it('shows the navigation counter for multiple images', () => {
    // ARRANGE
    renderPreview();

    // ASSERT
    expect(screen.getByTestId('image-preview-counter')).toHaveTextContent(
      '1 of 3',
    );
  });

  it('hides navigation for a single image', () => {
    // ARRANGE
    renderPreview({ images: [IMAGES[0]] });

    // ASSERT
    expect(
      screen.queryByTestId('image-preview-counter'),
    ).not.toBeInTheDocument();
  });

  it('navigates to the next image via the next button', () => {
    // ARRANGE
    const onIndexChange = vi.fn();
    renderPreview({ onIndexChange });

    // ACT
    fireEvent.click(screen.getByTestId('image-preview-next'));

    // ASSERT
    expect(onIndexChange).toHaveBeenCalledWith(1);
  });

  it('wraps to the last image when navigating back from the first', () => {
    // ARRANGE
    const onIndexChange = vi.fn();
    renderPreview({ onIndexChange });

    // ACT
    fireEvent.click(screen.getByTestId('image-preview-prev'));

    // ASSERT
    expect(onIndexChange).toHaveBeenCalledWith(2);
  });

  it('navigates with the arrow keys', () => {
    // ARRANGE
    const onIndexChange = vi.fn();
    renderPreview({ onIndexChange });

    // ACT
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    fireEvent.keyDown(document, { key: 'ArrowLeft' });

    // ASSERT
    expect(onIndexChange).toHaveBeenNthCalledWith(1, 1);
    expect(onIndexChange).toHaveBeenNthCalledWith(2, 2);
  });

  it('renders a download link for the current image', () => {
    // ARRANGE
    renderPreview({ index: 1 });

    // ASSERT
    const download = screen.getByTestId('image-preview-download');
    expect(download).toHaveAttribute('href', IMAGES[1].src);
    expect(download).toHaveAttribute('download');
  });

  it('does not render a download link when the image fails to load', () => {
    // ARRANGE
    renderPreview();

    // ACT
    fireEvent.error(screen.getByTestId('image-preview-image'));

    // ASSERT
    expect(
      screen.queryByTestId('image-preview-download'),
    ).not.toBeInTheDocument();
  });

  it('renders a custom fallback when the image fails to load', () => {
    // ARRANGE
    renderPreview({
      fallback: <div data-testid="custom-fallback">broken</div>,
    });

    // ACT
    fireEvent.error(screen.getByTestId('image-preview-image'));

    // ASSERT
    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(
      screen.queryByTestId('image-preview-image'),
    ).not.toBeInTheDocument();
  });

  it('labels the controls with default texts', () => {
    // ARRANGE
    renderPreview();

    // ASSERT
    expect(screen.getByTestId('image-preview-prev')).toHaveAttribute(
      'aria-label',
      'Previous image',
    );
    expect(screen.getByTestId('image-preview-next')).toHaveAttribute(
      'aria-label',
      'Next image',
    );
    expect(screen.getByTestId('image-preview-download')).toHaveAttribute(
      'aria-label',
      'Download',
    );
    expect(screen.getByTestId('image-preview-close')).toHaveAttribute(
      'aria-label',
      'Close',
    );
  });

  it('overrides control labels via the texts prop', () => {
    // ARRANGE
    renderPreview({ texts: { nextImage: 'Następny', close: 'Zamknij' } });

    // ASSERT
    expect(screen.getByTestId('image-preview-next')).toHaveAttribute(
      'aria-label',
      'Następny',
    );
    expect(screen.getByTestId('image-preview-close')).toHaveAttribute(
      'aria-label',
      'Zamknij',
    );
  });
});
