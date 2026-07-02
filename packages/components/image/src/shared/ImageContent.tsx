import React, { type ReactNode } from 'react';

import Icon, { ImageM } from '@synerise/ds-icon';

import * as S from './ImageContent.styles';
import { useImageStatus } from './useImageStatus';

export type ImageContentProps = {
  /** Image source URL. */
  src: string;
  /** Alternative text. */
  alt: string;
  /** Rendered in place of the image when the `src` fails to load. */
  fallback?: ReactNode;
  /** Native lazy/eager loading hint. */
  loading?: 'lazy' | 'eager';
  draggable?: boolean;
  /** styled-components hook — applied to the `<img>`. */
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
  /** Forwarded after the internal load handler (e.g. for zoom measurement). */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  'data-testid'?: string;
};

/**
 * Renders an `<img>` and swaps in `fallback` (or a default broken-image
 * placeholder) when the source fails to load. The single place that knows how
 * to detect a broken image — reused by `Thumbnail` and `ImagePreview`. Style it
 * per consumer with `styled(ImageContent)`; the className lands on the `<img>`.
 */
const ImageContent = ({
  src,
  alt,
  fallback,
  loading = 'lazy',
  draggable,
  className,
  onClick,
  onLoad,
  onError,
  'data-testid': dataTestId,
}: ImageContentProps): JSX.Element => {
  const { ref, status, handleLoad, handleError } = useImageStatus(src);

  if (status === 'error') {
    return (
      <>
        {fallback ?? (
          <S.DefaultFallback
            data-testid={dataTestId && `${dataTestId}-fallback`}
          >
            <Icon component={<ImageM />} />
          </S.DefaultFallback>
        )}
      </>
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      draggable={draggable}
      onClick={onClick}
      data-testid={dataTestId}
      onLoad={(event): void => {
        handleLoad(event);
        onLoad?.(event);
      }}
      onError={(event): void => {
        handleError();
        onError?.(event);
      }}
    />
  );
};

export default ImageContent;
