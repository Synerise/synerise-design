/** RZPP scale at which the whole image is fitted to the working area. */
export const FIT_SCALE = 1;

/**
 * Per-click zoom multiplier (Figma: "Skok zooma"). `1.4` means each zoom step
 * scales by ×1.4. Converted to the additive step react-zoom-pan-pinch expects
 * via `multiplier - 1`.
 */
export const DEFAULT_ZOOM_STEP = 1.4;

/** Max zoom relative to the image's natural size (Figma: "Max zoom" = 300%). */
export const DEFAULT_MAX_ZOOM = 3;

/**
 * Gap (px) between the previewed image and the viewport edge. Kept constant
 * (not removed on zoom) so the zoom/pan working area never resizes mid-zoom —
 * resizing it makes react-zoom-pan-pinch re-fit and corrupts the first zoom step.
 */
export const PREVIEW_PADDING = 32;
