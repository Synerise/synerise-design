import { type RefObject, useEffect, useState } from 'react';

import { useResizeObserver } from '@synerise/ds-utils';

import type { ContainerHeightType } from '../../ItemPickerNew/ItemPickerNew.types';
import {
  DEFAULT_HEIGHT,
  DEFAULT_HEIGHT_BELOW_THRESHOLD,
  DEFAULT_HEIGHT_THRESHOLD,
  FOOTER_HEIGHT,
  LIST_INNER_PADDING,
  SEARCH_BAR_HEIGHT,
} from '../constants';

type UseListHeightType = {
  heightConfig?: ContainerHeightType;
  calculatedContentHeight?: number;
  containerRef: RefObject<HTMLElement | undefined>;
  includeSearchBar?: boolean;
  includeFooter?: boolean;
};
export const useListHeight = ({
  heightConfig,
  calculatedContentHeight,
  containerRef,
  includeSearchBar = true,
  includeFooter = true,
}: UseListHeightType) => {
  const dimensionsConfig = {
    defaultHeight: DEFAULT_HEIGHT,
    belowThresholdHeight: DEFAULT_HEIGHT_BELOW_THRESHOLD,
    viewportHeightThreshold: DEFAULT_HEIGHT_THRESHOLD,
    ...(typeof heightConfig === 'object' ? heightConfig : {}),
  };

  const [outerHeight, setOuterHeight] = useState(
    dimensionsConfig.defaultHeight,
  );
  useEffect(() => {
    const checkViewportHeight = () =>
      setOuterHeight(
        window.innerHeight < dimensionsConfig.viewportHeightThreshold
          ? dimensionsConfig.belowThresholdHeight
          : dimensionsConfig.defaultHeight,
      );
    checkViewportHeight();
    window.addEventListener('resize', checkViewportHeight);
    return () => {
      window.removeEventListener('resize', checkViewportHeight);
    };
  }, [
    dimensionsConfig.defaultHeight,
    dimensionsConfig.belowThresholdHeight,
    dimensionsConfig.viewportHeightThreshold,
  ]);

  const [measuredHeight, setMeasuredHeight] = useState<number>();
  useResizeObserver(containerRef, (dimensions) => {
    setMeasuredHeight(dimensions.height);
  });

  const offsetSpace =
    (includeSearchBar ? SEARCH_BAR_HEIGHT : 0) +
    (includeFooter ? FOOTER_HEIGHT : 0);

  let outerWrapperHeight = '0px';
  let listWrapperHeight = 0;
  if (heightConfig === 'fillSpace' && measuredHeight !== undefined) {
    outerWrapperHeight = '100%';
    listWrapperHeight = Math.max(measuredHeight - offsetSpace, 0);
  } else if (heightConfig === 'fitContent' && calculatedContentHeight) {
    listWrapperHeight = calculatedContentHeight + 2 * LIST_INNER_PADDING;
    outerWrapperHeight = `${listWrapperHeight + offsetSpace}px`;
  } else {
    listWrapperHeight = outerHeight - offsetSpace;
    outerWrapperHeight = `${outerHeight}px`;
  }
  return {
    listWrapperHeight,
    outerWrapperHeight,
    offsetSpace,
  };
};
