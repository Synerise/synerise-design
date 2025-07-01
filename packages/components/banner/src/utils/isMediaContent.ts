import {
  type BannerSlideMediaContentProps,
  type BannerSlideTextContentProps,
} from '../Banner.types';

export const isMediaContent = (
  props: BannerSlideTextContentProps | BannerSlideMediaContentProps,
): props is BannerSlideMediaContentProps => {
  return 'media' in props;
};
