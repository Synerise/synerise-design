import React, { useMemo, useState } from 'react';

import ImagePreview from '../Preview/ImagePreview';
import Thumbnail from '../Thumbnail/Thumbnail';
import { ImageGalleryContext } from '../context/ImageGalleryContext';
import * as S from './Gallery.styles';
import { type GalleryProps } from './Gallery.types';

const Gallery = ({
  images,
  aspectRatio,
  size,
  height,
  background,
  objectFit,
  loading,
  fallback,
  deletable = false,
  onDelete,
  openZoom = true,
  zoomable,
  zoomStep,
  maxZoom,
  initialZoom,
  getContainer,
  texts,
  className,
}: GalleryProps): JSX.Element => {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const contextValue = useMemo(
    () => ({
      aspectRatio,
      size,
      height,
      background,
      objectFit,
      loading,
      fallback,
      texts,
    }),
    [
      aspectRatio,
      size,
      height,
      background,
      objectFit,
      loading,
      fallback,
      texts,
    ],
  );

  return (
    <ImageGalleryContext.Provider value={contextValue}>
      <S.Container className={className} data-testid="image-gallery">
        {images.map((image, imageIndex) => (
          <Thumbnail
            key={`${image.src}-${imageIndex}`}
            src={image.src}
            alt={image.alt}
            fallback={image.fallback}
            deletable={deletable}
            onDelete={onDelete ? (): void => onDelete(imageIndex) : undefined}
            openZoom={openZoom}
            onClick={
              openZoom ? (): void => setPreviewIndex(imageIndex) : undefined
            }
          />
        ))}
      </S.Container>
      {openZoom && (
        <ImagePreview
          open={previewIndex !== null}
          images={images}
          index={previewIndex ?? 0}
          onIndexChange={setPreviewIndex}
          onClose={(): void => setPreviewIndex(null)}
          zoomable={zoomable}
          zoomStep={zoomStep}
          maxZoom={maxZoom}
          initialZoom={initialZoom}
          fallback={fallback}
          getContainer={getContainer}
          texts={texts}
        />
      )}
    </ImageGalleryContext.Provider>
  );
};

export default Gallery;
