import React, { type KeyboardEvent, type MouseEvent } from 'react';

import Icon, { Close3FullBackgroundM, ImageM, ShowS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { useImageGalleryContext } from '../context/ImageGalleryContext';
import { useImageTexts } from '../shared/useImageTexts';
import {
  ASPECT_RATIO_MAP,
  DEFAULT_ASPECT_RATIO,
  DEFAULT_SIZE,
  SIZE_MAP,
} from './Thumbnail.const';
import * as S from './Thumbnail.styles';
import { type ThumbnailProps } from './Thumbnail.types';

const Thumbnail = ({
  src,
  alt,
  aspectRatio,
  size,
  height,
  background,
  objectFit,
  loading,
  deletable = false,
  onDelete,
  openZoom = false,
  onClick,
  fallback,
  texts,
  className,
  'data-testid': dataTestId = 'image-thumbnail',
}: ThumbnailProps): JSX.Element => {
  const context = useImageGalleryContext();
  const labels = useImageTexts(texts ?? context?.texts);

  const resolvedAspectRatio =
    aspectRatio ?? context?.aspectRatio ?? DEFAULT_ASPECT_RATIO;
  const resolvedSize = size ?? context?.size ?? DEFAULT_SIZE;
  const resolvedHeight = height ?? context?.height;
  const resolvedBackground = background ?? context?.background ?? 'none';
  const resolvedObjectFit = objectFit ?? context?.objectFit ?? 'contain';
  const resolvedLoading = loading ?? context?.loading ?? 'lazy';
  const resolvedFallback = fallback ?? context?.fallback;

  const interactive = Boolean(openZoom || onClick);
  const isSource = resolvedAspectRatio === 'source';
  const cssAspectRatio =
    resolvedAspectRatio === 'source'
      ? undefined
      : ASPECT_RATIO_MAP[resolvedAspectRatio];
  const pixelHeight =
    resolvedSize === 'custom'
      ? (resolvedHeight ?? SIZE_MAP[DEFAULT_SIZE])
      : SIZE_MAP[resolvedSize];

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  const handleDelete = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    // Drop focus so the control doesn't linger (focus-within) after clicking.
    event.currentTarget.blur();
    onDelete?.();
  };

  return (
    <S.Tile
      className={className}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      $height={pixelHeight}
      $aspectRatio={cssAspectRatio}
      $interactive={interactive}
      onClick={interactive ? onClick : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      data-testid={dataTestId}
    >
      <S.Clip $background={resolvedBackground} $source={isSource}>
        {src ? (
          <S.ThumbnailImage
            src={src}
            alt={alt}
            loading={resolvedLoading}
            fallback={resolvedFallback}
            $objectFit={resolvedObjectFit}
            $source={isSource}
            data-testid={`${dataTestId}-image`}
          />
        ) : (
          <S.EmptyPlaceholder data-testid={`${dataTestId}-empty`}>
            <Icon component={<ImageM />} />
          </S.EmptyPlaceholder>
        )}
        {interactive && src && (
          <S.HoverOverlay data-testid={`${dataTestId}-overlay`}>
            <Icon component={<ShowS />} />
          </S.HoverOverlay>
        )}
      </S.Clip>
      {deletable && (
        <Tooltip title={labels.delete} placement="top">
          <S.DeleteButton
            type="button"
            aria-label={labels.delete}
            onClick={handleDelete}
            data-testid={`${dataTestId}-delete`}
          >
            <Icon component={<Close3FullBackgroundM />} />
          </S.DeleteButton>
        </Tooltip>
      )}
    </S.Tile>
  );
};

export default Thumbnail;
