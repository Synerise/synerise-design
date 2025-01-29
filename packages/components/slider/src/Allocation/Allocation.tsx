import React, { useState, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';

import Tooltip from '@synerise/ds-tooltip';

import { DescriptionWrapper, Description } from '../Slider.styles';
import { buildDefaultTracksColorMap } from '../Slider';
import {
  checkIsPercentageInBoundaries,
  countAllocation,
  mapSliderValueToVariants,
  mapUserAllocationToHandles,
  mapUserAllocationToMarks,
} from '../utils/allocation.utils';
import { BlockedHandlersWithTooltip } from './BlockedHandlersWithTooltip';
import {
  calculateHandlersPercentagePosition,
  checkIsBlockedHandlersConfigEnabled,
  checkIsBlockedVariantsChange,
  getBlockedHandlersKeys,
} from '../utils/allocationHandlers.utils';
import type { SliderProps } from '../Slider.types';
import type { AllocationConfig, AllocationVariant } from './Allocation.types';
import * as S from './Allocation.styles';

const Allocation = ({
  allocationConfig,
  tracksColorMap = buildDefaultTracksColorMap(),
  description,
  tipFormatter,
  handlers,
  ...rest
}: SliderProps) => {
  const { variants, onAllocationChange, controlGroupEnabled, controlGroupLabel, controlGroupTooltip } =
    allocationConfig as AllocationConfig;
  const [allocations, setAllocations] = useState(countAllocation(variants, controlGroupEnabled));
  const intl = useIntl();

  useEffect(() => {
    setAllocations(countAllocation(variants, controlGroupEnabled));
  }, [variants, controlGroupEnabled]);

  const markRenderer = (value: number, index: number, allocationVariants: AllocationVariant[]) => (
    <S.Mark className="slider-mark">
      <S.MarkValue>{value}</S.MarkValue>
      {allocationVariants[index] && (
        <Tooltip title={<S.MarkTooltipWrapper>{allocationVariants[index].tabLetter}</S.MarkTooltipWrapper>}>
          <S.MarkLetter className={`ant-slider-segment-letter-${index}`} index={index}>
            {allocationVariants[index].tabLetter}
          </S.MarkLetter>
        </Tooltip>
      )}
      {!allocationVariants[index] && (
        <Tooltip
          title={
            controlGroupTooltip ||
            intl.formatMessage({ id: 'DS.SLIDER.CONTROL-GROUP', defaultMessage: 'Control group' })
          }
        >
          <S.MarkLetter index="cg">
            {controlGroupLabel || intl.formatMessage({ id: 'DS.SLIDER.CONTROL-GROUP-TOOLTIP', defaultMessage: 'CG' })}
          </S.MarkLetter>
        </Tooltip>
      )}
    </S.Mark>
  );

  const currentHandlersPercentagePositions = calculateHandlersPercentagePosition(variants);

  const { blockedHandlersKeys, isBlockedHandlersConfigEnabled } = useMemo(
    () => ({
      blockedHandlersKeys: getBlockedHandlersKeys(handlers),
      isBlockedHandlersConfigEnabled: checkIsBlockedHandlersConfigEnabled(handlers),
    }),
    [handlers]
  );

  const handleChange = (value: [number, number]) => {
    if (typeof value === 'number') {
      return;
    }
    const calculatedVariants = mapSliderValueToVariants(value, variants);

    if (!checkIsPercentageInBoundaries(calculatedVariants)) {
      return;
    }

    if (isBlockedHandlersConfigEnabled) {
      const afterChangeHandlersPercentagePositions = calculateHandlersPercentagePosition(calculatedVariants);
      const isBlockedVariantChanged = checkIsBlockedVariantsChange(
        blockedHandlersKeys,
        currentHandlersPercentagePositions,
        afterChangeHandlersPercentagePositions
      );

      if (isBlockedVariantChanged) {
        return;
      }
    }
    // eslint-disable-next-line no-unused-expressions
    onAllocationChange?.(calculatedVariants);
  };

  return (
    <S.AllocationSliderWrapper blockedHandlersKeys={blockedHandlersKeys} tracksColorMap={tracksColorMap}>
      <S.AllocationSlider
        {...rest}
        useColorPalette
        tracksColorMap={tracksColorMap}
        dots={false}
        value={mapUserAllocationToHandles(allocations)}
        range
        min={0}
        max={100}
        marks={mapUserAllocationToMarks(allocations, markRenderer, variants)}
        onChange={handleChange}
        step={1}
        tipFormatter={(value?: number) => (
          <DescriptionWrapper>
            {description && <Description>{description}</Description>}
            {tipFormatter && tipFormatter(value)}
          </DescriptionWrapper>
        )}
      />
      <BlockedHandlersWithTooltip
        blockedHandlersKeys={blockedHandlersKeys}
        handlersPosition={currentHandlersPercentagePositions}
        handlers={handlers}
      />
      <S.TrackContainer controlGroup={controlGroupEnabled}>
        {allocations.map((u: number, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <S.Track key={`${u}-${index}`} className={`ant-slider-segment-${index}`} index={index} width={u} />
        ))}
      </S.TrackContainer>
    </S.AllocationSliderWrapper>
  );
};

export default Allocation;
