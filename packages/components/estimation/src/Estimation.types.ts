import { type ReactNode } from 'react';

import { type BaseLabelProps } from '@synerise/ds-form-field';
import { type ProgressValue } from '@synerise/ds-progress-bar';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type EstimationProgressValue = ProgressValue & {
  label?: ReactNode;
};

type SkeletonConfig = {
  total?: boolean;
  progressBar?: boolean;
};

export type EstimationBaseProps = BaseLabelProps & {
  /**
   * main estimation value
   */
  value?: ReactNode;
  /**
   * renders loading state (skeletons)
   */
  isLoading?: boolean | SkeletonConfig;
  /**
   * top right corner value / values. provide preformatted content here
   */
  total?: ReactNode;
  /**
   * renders an inline alert in footer with this message
   */
  errorMessage?: ReactNode;
  /**
   * refresh / show conditions buttons to render in footer right side
   */
  footerButtons?: ReactNode;
  /**
   * translations to overwrite DS defaults
   */
  texts?: Partial<EstimationTexts>;
  /**
   * renders "calculated date" a relative (if recent) or absolute date using FormattedDate
   * alternatively provide any reactNode to render as calculated date
   */
  calculatedDate?: Date | ReactNode;
  /**
   * render multivalue progressbar.
   * provide label for each entry to render a legend below multivalue bar
   */
  progressBarValues?: EstimationProgressValue[];
};

export type EstimationProps = WithHTMLAttributes<
  HTMLDivElement,
  EstimationBaseProps
>;

export type EstimationTexts = {
  calculated: ReactNode;
  loading: ReactNode;
};
