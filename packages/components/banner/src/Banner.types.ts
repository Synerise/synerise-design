import type { ReactNode } from 'react';

import type { TagProps } from '@synerise/ds-tag';
import type { WithHTMLAttributes } from '@synerise/ds-utils';

type Texts = 'expand' | 'collapse' | 'closeTooltip';
export type BannerTexts = {
  [k in Texts]: ReactNode;
};

export type BannerProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    slides: Array<BannerSlideProps>;
    autoPlay?: boolean;
    transitionEffect?: 'scrollx' | 'fade';
    autoPlaySpeed?: number;
    onAfterChange?: (index: number) => void;
    onBeforeChange?: (from: number, to: number) => void;
    onClose?: () => void;
    expandable?: Omit<BannerHeaderProps, 'closeButton' | 'onToggle' | 'texts'>;
    texts?: Partial<BannerTexts>;
  }
>;

export type BannerHeaderProps = {
  closeButton?: ReactNode;
  title: ReactNode;
  icon?: ReactNode;
  isExpanded?: boolean;
  onToggle: (isExpanded: boolean) => void;
  texts: BannerTexts;
};

export type BannerSlideProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    mainContent?: BannerSlideTextContentProps | BannerSlideMediaContentProps;
    leftSideContent?:
      | BannerSlideTextContentProps
      | BannerSlideMediaContentProps;
    rightSideContent?:
      | BannerSlideTextContentProps
      | BannerSlideMediaContentProps;
  }
>;
export type BannerSlideContentProps = {
  position: 'left' | 'right' | 'main';
  hasMainContent?: boolean;
};
export type BannerSlideTextContentProps = {
  titlePrefix?: ReactNode;
  titleStatus?: Pick<TagProps, 'textColor' | 'color' | 'name'>;
  title?: ReactNode;
  buttons?: ReactNode;
  description?: ReactNode;
};

export type BannerSlideMediaContentProps = { media?: ReactNode };

export type BannerCounterProps = {
  slides: Array<BannerSlideProps & { id: string }>;
  currentIndex: number;
  onDotClick: (index: number) => void;
  onNextClick: () => void;
  onPrevClick: () => void;
};
