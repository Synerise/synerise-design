import React from 'react';

import Icon, {
  AngleLeftM,
  AngleRightM,
  FileDownloadM,
  FormulaMinusM,
  FormulaPlusM,
} from '@synerise/ds-icon';
import {
  ToolbarButton,
  ToolbarGroup,
  ToolbarLabel,
} from '@synerise/ds-toolbar';

import { type ImageTexts } from '../shared/Image.shared.types';

const TOOLTIP_PLACEMENT = 'top';

export type PreviewToolbarProps = {
  showNavigation: boolean;
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  showZoom: boolean;
  zoomPercent: number;
  canZoomIn: boolean;
  canZoomOut: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  showDownload: boolean;
  downloadHref: string;
  downloadName: string;
  texts: ImageTexts;
};

/** Bottom-center controls: a navigation pill and a zoom/download pill. */
const PreviewToolbar = ({
  showNavigation,
  current,
  total,
  onPrev,
  onNext,
  showZoom,
  zoomPercent,
  canZoomIn,
  canZoomOut,
  onZoomIn,
  onZoomOut,
  showDownload,
  downloadHref,
  downloadName,
  texts,
}: PreviewToolbarProps): JSX.Element => (
  <>
    {showNavigation && (
      <ToolbarGroup isCompact>
        <ToolbarButton
          mode="single-icon"
          aria-label={texts.previousImage}
          tooltipProps={{
            title: texts.previousImage,
            placement: TOOLTIP_PLACEMENT,
          }}
          onClick={onPrev}
          data-testid="image-preview-prev"
        >
          <Icon component={<AngleLeftM />} />
        </ToolbarButton>
        <ToolbarLabel data-testid="image-preview-counter">
          {current} of {total}
        </ToolbarLabel>
        <ToolbarButton
          mode="single-icon"
          aria-label={texts.nextImage}
          tooltipProps={{
            title: texts.nextImage,
            placement: TOOLTIP_PLACEMENT,
          }}
          onClick={onNext}
          data-testid="image-preview-next"
        >
          <Icon component={<AngleRightM />} />
        </ToolbarButton>
      </ToolbarGroup>
    )}
    {(showZoom || showDownload) && (
      <ToolbarGroup isCompact>
        {showZoom && (
          <>
            <ToolbarButton
              mode="single-icon"
              aria-label={texts.zoomOut}
              tooltipProps={{
                title: texts.zoomOut,
                placement: TOOLTIP_PLACEMENT,
              }}
              disabled={!canZoomOut}
              onClick={onZoomOut}
              data-testid="image-preview-zoom-out"
            >
              <Icon component={<FormulaMinusM />} />
            </ToolbarButton>
            <ToolbarLabel data-testid="image-preview-zoom-level">
              {zoomPercent}%
            </ToolbarLabel>
            <ToolbarButton
              mode="single-icon"
              aria-label={texts.zoomIn}
              tooltipProps={{
                title: texts.zoomIn,
                placement: TOOLTIP_PLACEMENT,
              }}
              disabled={!canZoomIn}
              onClick={onZoomIn}
              data-testid="image-preview-zoom-in"
            >
              <Icon component={<FormulaPlusM />} />
            </ToolbarButton>
          </>
        )}
        {showDownload && (
          <ToolbarButton
            mode="single-icon"
            aria-label={texts.download}
            tooltipProps={{
              title: texts.download,
              placement: TOOLTIP_PLACEMENT,
            }}
            href={downloadHref}
            download={downloadName}
            target="_blank"
            data-testid="image-preview-download"
          >
            <Icon component={<FileDownloadM />} />
          </ToolbarButton>
        )}
      </ToolbarGroup>
    )}
  </>
);

export default PreviewToolbar;
