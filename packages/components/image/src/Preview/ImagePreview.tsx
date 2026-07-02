import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  type ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from 'react-zoom-pan-pinch';

import Icon, { CloseM, ImageM } from '@synerise/ds-icon';
import { ToolbarButton, ToolbarGroup } from '@synerise/ds-toolbar';
import { useFocusTrap } from '@synerise/ds-utils';

import { useImageStatus } from '../shared/useImageStatus';
import { useImageTexts } from '../shared/useImageTexts';
import {
  DEFAULT_MAX_ZOOM,
  DEFAULT_ZOOM_STEP,
  FIT_SCALE,
  PREVIEW_PADDING,
} from './ImagePreview.const';
import * as S from './ImagePreview.styles';
import { type ImagePreviewProps } from './ImagePreview.types';
import PreviewToolbar from './PreviewToolbar';

const SCALE_EPSILON = 0.01;
const ZOOM_ANIMATION_MS = 200;
// Pointer travel (px) above which a backdrop release is treated as a drag (e.g.
// panning a zoomed image) rather than a click, so it must not close the viewer.
const CLICK_MOVE_THRESHOLD = 5;

const stopPropagation = (event: React.MouseEvent): void => {
  event.stopPropagation();
};

/** Suggested filename for the download link, derived from the image URL. */
const getDownloadName = (src: string): string => {
  if (!src || src.startsWith('data:')) {
    return 'image';
  }
  const path = src.split(/[?#]/)[0];
  return path.substring(path.lastIndexOf('/') + 1) || 'image';
};

const ImagePreview = ({
  open,
  images,
  index,
  onIndexChange,
  onClose,
  zoomable = true,
  zoomStep = DEFAULT_ZOOM_STEP,
  maxZoom = DEFAULT_MAX_ZOOM,
  initialZoom = 'fit',
  closable = true,
  maskClosable = true,
  fallback,
  getContainer,
  destroyOnClose = false,
  onZoom,
  texts: textsProp,
}: ImagePreviewProps): React.ReactPortal | null => {
  const texts = useImageTexts(textsProp);
  const overlayRef = useRef<HTMLDivElement>(null);
  const workingAreaRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);
  const pointerDownRef = useRef<{ x: number; y: number } | null>(null);

  const total = images.length;
  const currentImage = images[index];
  const currentSrc = currentImage?.src ?? '';

  const {
    ref: imgRef,
    status,
    handleLoad,
    handleError,
  } = useImageStatus(currentSrc);

  // RZPP scale that renders the image at its natural size (100%). Stays at
  // FIT_SCALE for images that already fit; > 1 for images larger than the area.
  const [naturalScaleFactor, setNaturalScaleFactor] = useState(FIT_SCALE);
  const [maxScale, setMaxScale] = useState(FIT_SCALE);
  const [scale, setScale] = useState(FIT_SCALE);
  const [isPanning, setIsPanning] = useState(false);

  useFocusTrap(overlayRef, open);

  // `useFocusTrap` focuses the first control (the close button) on open; move
  // focus to the dialog itself instead so the whole modal is the entry point.
  // Runs after the trap effect, so it overrides that initial focus.
  useEffect(() => {
    if (open) {
      overlayRef.current?.focus();
    }
  }, [open]);

  const goTo = useCallback(
    (next: number): void => {
      if (total < 2) {
        return;
      }
      onIndexChange((next + total) % total);
    },
    [total, onIndexChange],
  );

  const measureZoom = useCallback((): number => {
    const area = workingAreaRef.current;
    const img = imgRef.current;
    if (!area || !img || !img.naturalWidth) {
      return FIT_SCALE;
    }
    // RZPP scale 1 fits the whole image to the working area (the wrapper's
    // content box, i.e. minus the padding). The factor needed to reach natural
    // size is how much bigger the natural image is than its fitted display
    // (1 when the image already shows at natural size or smaller).
    const availableWidth = area.clientWidth - 2 * PREVIEW_PADDING;
    const availableHeight = area.clientHeight - 2 * PREVIEW_PADDING;
    const fitToNatural = Math.max(
      img.naturalWidth / availableWidth,
      img.naturalHeight / availableHeight,
    );
    const factor = fitToNatural > FIT_SCALE ? fitToNatural : FIT_SCALE;
    setNaturalScaleFactor(factor);
    setMaxScale(factor * maxZoom);
    return factor;
  }, [imgRef, maxZoom]);

  const applyInitialZoom = useCallback(
    (factor: number): void => {
      if (initialZoom === 'real-size' && factor > FIT_SCALE) {
        transformRef.current?.centerView?.(factor, 0);
      }
    },
    [initialZoom],
  );

  const handleImageLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>): void => {
      handleLoad(event);
      applyInitialZoom(measureZoom());
    },
    [handleLoad, measureZoom, applyInitialZoom],
  );

  // Reset zoom on open / image change; measure immediately for cached images
  // (a cached src swap may not fire onLoad).
  useEffect(() => {
    if (!open) {
      return;
    }
    transformRef.current?.resetTransform?.(0);
    setScale(FIT_SCALE);
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth) {
      applyInitialZoom(measureZoom());
    }
  }, [open, currentSrc, imgRef, measureZoom, applyInitialZoom]);

  // Escape + arrow navigation; lock body scroll and re-measure on resize.
  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && closable) {
        event.stopPropagation();
        onClose();
      } else if (event.key === 'ArrowLeft') {
        goTo(index - 1);
      } else if (event.key === 'ArrowRight') {
        goTo(index + 1);
      }
    };
    const handleResize = (): void => {
      measureZoom();
    };
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return (): void => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, closable, onClose, goTo, index, measureZoom]);

  const handleTransformed = useCallback(
    (_ref: ReactZoomPanPinchRef, state: { scale: number }): void => {
      setScale(state.scale);
      onZoom?.(state.scale);
    },
    [onZoom],
  );

  const handleOverlayPointerDown = useCallback(
    (event: React.MouseEvent): void => {
      pointerDownRef.current = { x: event.clientX, y: event.clientY };
    },
    [],
  );

  const handleMaskClick = useCallback(
    (event: React.MouseEvent): void => {
      const start = pointerDownRef.current;
      pointerDownRef.current = null;
      if (!maskClosable) {
        return;
      }
      // Ignore the click that ends a drag (e.g. panning a zoomed image) so it
      // doesn't dismiss the viewer.
      if (
        start &&
        (Math.abs(event.clientX - start.x) > CLICK_MOVE_THRESHOLD ||
          Math.abs(event.clientY - start.y) > CLICK_MOVE_THRESHOLD)
      ) {
        return;
      }
      onClose();
    },
    [maskClosable, onClose],
  );

  // Wheel keeps RZPP's continuous relative step.
  const rzppStep = Math.max(zoomStep - 1, SCALE_EPSILON);

  // Button zoom steps on a stable multiplicative grid anchored at natural size
  // (100%): levels are `naturalScaleFactor * zoomStep^k`, so 100% is always a
  // stop and zoom-in/out are exact inverses (…71%, 100%, 140%…). Driven via
  // `centerView` with an exact target scale instead of RZPP's relative
  // zoomIn/zoomOut, whose steps compound and don't round-trip.
  const stepZoom = useCallback(
    (direction: 1 | -1): void => {
      const level = Math.round(
        Math.log(scale / naturalScaleFactor) / Math.log(zoomStep),
      );
      const target = naturalScaleFactor * zoomStep ** (level + direction);
      const clamped = Math.min(Math.max(target, FIT_SCALE), maxScale);
      transformRef.current?.centerView?.(clamped, ZOOM_ANIMATION_MS);
    },
    [scale, naturalScaleFactor, zoomStep, maxScale],
  );
  const handleZoomIn = useCallback((): void => stepZoom(1), [stepZoom]);
  const handleZoomOut = useCallback((): void => stepZoom(-1), [stepZoom]);

  if (!open && destroyOnClose) {
    return null;
  }

  const isZoomed = scale > FIT_SCALE + SCALE_EPSILON;
  const showZoomControls = zoomable && maxScale > FIT_SCALE + SCALE_EPSILON;
  // Grab cursor signals the zoomed image can be dragged to pan.
  const getPanCursor = (): string => {
    if (!isZoomed) {
      return 'default';
    }
    return isPanning ? 'grabbing' : 'grab';
  };
  const zoomPercent =
    naturalScaleFactor > 0
      ? Math.round((scale / naturalScaleFactor) * 100)
      : 100;
  const hasError = status === 'error' || !currentImage;
  const showDownload = !hasError && Boolean(currentSrc);

  const image = (
    <S.Image
      key={index}
      ref={imgRef}
      src={currentSrc}
      alt={currentImage?.alt ?? ''}
      onLoad={handleImageLoad}
      onError={handleError}
      onClick={stopPropagation}
      draggable={false}
      data-testid="image-preview-image"
    />
  );

  const content = hasError ? (
    <S.Fallback onClick={stopPropagation} data-testid="image-preview-fallback">
      {currentImage?.fallback ?? fallback ?? (
        <S.FallbackBox>
          <Icon component={<ImageM />} />
        </S.FallbackBox>
      )}
    </S.Fallback>
  ) : (
    image
  );

  return createPortal(
    <S.Overlay
      ref={overlayRef}
      role="dialog"
      aria-modal
      aria-label={currentImage?.alt}
      tabIndex={-1}
      $hidden={!open}
      onMouseDown={handleOverlayPointerDown}
      onClick={handleMaskClick}
      data-testid="image-preview"
    >
      <S.ImageWrapper ref={workingAreaRef}>
        {zoomable && !hasError ? (
          <TransformWrapper
            ref={transformRef}
            minScale={FIT_SCALE}
            maxScale={maxScale}
            initialScale={FIT_SCALE}
            centerOnInit
            doubleClick={{ mode: 'reset' }}
            wheel={{ step: rzppStep }}
            panning={{ disabled: !isZoomed }}
            onPanningStart={(): void => setIsPanning(true)}
            onPanningStop={(): void => setIsPanning(false)}
            onTransformed={handleTransformed}
          >
            <TransformComponent
              wrapperStyle={{
                width: '100%',
                height: '100%',
                cursor: getPanCursor(),
              }}
              contentStyle={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              {content}
            </TransformComponent>
          </TransformWrapper>
        ) : (
          content
        )}
      </S.ImageWrapper>

      {closable && (
        <S.CloseWrapper onClick={stopPropagation}>
          <ToolbarGroup>
            <ToolbarButton
              mode="single-icon"
              aria-label={texts.close}
              tooltipProps={{ title: texts.close, placement: 'bottom' }}
              onClick={onClose}
              data-testid="image-preview-close"
            >
              <Icon component={<CloseM />} />
            </ToolbarButton>
          </ToolbarGroup>
        </S.CloseWrapper>
      )}

      {(total > 1 || showZoomControls || showDownload) && (
        <S.ToolbarWrapper onClick={stopPropagation}>
          <PreviewToolbar
            showNavigation={total > 1}
            current={index + 1}
            total={total}
            onPrev={(): void => goTo(index - 1)}
            onNext={(): void => goTo(index + 1)}
            showZoom={showZoomControls}
            zoomPercent={zoomPercent}
            canZoomIn={scale < maxScale - SCALE_EPSILON}
            canZoomOut={isZoomed}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            showDownload={showDownload}
            downloadHref={currentSrc}
            downloadName={getDownloadName(currentSrc)}
            texts={texts}
          />
        </S.ToolbarWrapper>
      )}
    </S.Overlay>,
    getContainer?.() || document.body,
  );
};

export default ImagePreview;
