import React, {
  type MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { type Ranger, useRanger } from '@tanstack/react-ranger';

import * as S from '../Slider.styles';
import type { AllocationSliderProps } from '../Slider.types';
import { SliderProvider } from '../context/SliderContext';
import { useColorMap } from '../hooks/useColorMap';
import { getClosestIndex } from '../utils/Slider.utils';
import {
  checkIsPercentageInBoundaries,
  countAllocation,
  mapSliderValueToVariants,
  mapUserAllocationToHandles,
} from '../utils/allocation.utils';
import {
  calculateHandlersPercentagePosition,
  checkIsBlockedHandlersConfigEnabled,
  checkIsBlockedVariantsChange,
  getBlockedHandlersKeys,
} from '../utils/allocationHandlers.utils';
import { AllocationMarks } from './AllocationMarks';
import { SliderAbove } from './SliderAbove';
import { SliderLine } from './SliderLine';

export const AllocationSlider = ({
  allocationConfig,
  tracksColorMap,
  description,
  handlers,
  step = 1,
  label,
  thick,
  disabled,
  dots,
}: Omit<AllocationSliderProps, 'type'>) => {
  const rangerHandlesRef = useRef<Record<number, HTMLElement>>({});
  const { variants, onAllocationChange, controlGroupEnabled } =
    allocationConfig;

  const [allocations, setAllocations] = useState(
    countAllocation(variants, controlGroupEnabled),
  );

  useEffect(() => {
    setAllocations(countAllocation(variants, controlGroupEnabled));
  }, [variants, controlGroupEnabled]);

  const rangerRef = useRef<HTMLDivElement>(null);

  const { blockedHandlersKeys, isBlockedHandlersConfigEnabled } = useMemo(
    () => ({
      blockedHandlersKeys: getBlockedHandlersKeys(handlers),
      isBlockedHandlersConfigEnabled:
        checkIsBlockedHandlersConfigEnabled(handlers),
    }),
    [handlers],
  );

  const colorMap = useColorMap(
    variants?.length ?? 9,
    'allocation',
    tracksColorMap,
  );

  const currentHandlersPercentagePositions =
    calculateHandlersPercentagePosition(variants);

  const handleChange = useCallback(
    (value: readonly number[]) => {
      const calculatedVariants = mapSliderValueToVariants(value, variants);

      if (!checkIsPercentageInBoundaries(calculatedVariants)) {
        return;
      }

      if (isBlockedHandlersConfigEnabled) {
        const afterChangeHandlersPercentagePositions =
          calculateHandlersPercentagePosition(calculatedVariants);

        const isBlockedVariantChanged = checkIsBlockedVariantsChange(
          blockedHandlersKeys,
          currentHandlersPercentagePositions,
          afterChangeHandlersPercentagePositions,
        );

        if (isBlockedVariantChanged) {
          return;
        }
      }
      setAllocations(countAllocation(variants, controlGroupEnabled));
      onAllocationChange?.(calculatedVariants);
    },
    [
      blockedHandlersKeys,
      controlGroupEnabled,
      currentHandlersPercentagePositions,
      isBlockedHandlersConfigEnabled,
      onAllocationChange,
      variants,
    ],
  );

  const rangerInstance = useRanger<HTMLDivElement>({
    getRangerElement: () => rangerRef.current,
    values: mapUserAllocationToHandles(allocations),
    min: 0,
    max: 100,
    stepSize: step,
    tickSize: step,
    onDrag: (instance: Ranger<HTMLDivElement>) => {
      handleChange(instance.sortedValues);
    },
    onChange: (instance: Ranger<HTMLDivElement>) => {
      handleChange(instance.sortedValues);
    },
  });

  const handleLineClick = (event: MouseEvent) => {
    const clicked = rangerInstance.getValueForClientX(event.clientX);
    const newValue = rangerInstance.roundToStep(clicked);
    const handleValues = mapUserAllocationToHandles(allocations);
    const closestIndex = getClosestIndex(handleValues, clicked);
    const updatedValues = handleValues
      .map((item, index) => (index === closestIndex ? newValue : item))
      .sort((a, b) => a - b);
    handleChange(updatedValues);
  };

  return (
    <SliderProvider
      rangerInstance={rangerInstance}
      rangerHandles={rangerHandlesRef}
    >
      <S.SliderWrapper ref={rangerRef} $disabled={disabled}>
        <SliderAbove label={label} description={description} />
        <SliderLine
          onLineClick={!disabled ? handleLineClick : undefined}
          type="allocation"
          tracksColorMap={colorMap}
          thick={thick}
          disabled={disabled}
          handlersConfig={handlers}
          dots={dots}
        />
        <AllocationMarks
          variants={[]}
          {...allocationConfig}
          tracksColorMap={colorMap}
          allocations={allocations}
        />
      </S.SliderWrapper>
    </SliderProvider>
  );
};
