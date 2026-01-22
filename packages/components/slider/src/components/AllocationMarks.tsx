import React, { type ReactNode } from 'react';
import { useIntl } from 'react-intl';

import Tooltip from '@synerise/ds-tooltip';

import {
  type AllocationConfig,
  type AllocationVariant,
  type ColorMap,
} from '../Slider.types';
import { useSliderContext } from '../context/SliderContext';
import * as S from './AllocationMarks.styles';

type AllocationMarksProps = AllocationConfig & {
  allocations: number[];
  variants: AllocationVariant[];
  tracksColorMap: ColorMap;
};

export const AllocationMarks = ({
  controlGroupTooltip,
  controlGroupLabel,
  allocations,
  variants,
  tracksColorMap,
}: AllocationMarksProps) => {
  const intl = useIntl();
  const { rangerInstance } = useSliderContext();
  const renderMark = (
    value: ReactNode,
    index: number,
    allocationVariants: AllocationVariant[],
  ) => (
    <>
      {allocationVariants[index] && (
        <Tooltip
          title={
            <S.MarkTooltipWrapper>
              {allocationVariants[index].tabLetter}
            </S.MarkTooltipWrapper>
          }
        >
          <S.MarkLetter
            className={`ant-slider-segment-letter-${index}`}
            $color={tracksColorMap[index]}
          >
            {allocationVariants[index].tabLetter}
          </S.MarkLetter>
        </Tooltip>
      )}
      {!allocationVariants[index] && (
        <Tooltip
          title={
            controlGroupTooltip ||
            intl.formatMessage({
              id: 'DS.SLIDER.CONTROL-GROUP',
              defaultMessage: 'Control group',
            })
          }
        >
          <S.MarkLetter $color={tracksColorMap[index]}>
            {controlGroupLabel ||
              intl.formatMessage({
                id: 'DS.SLIDER.CONTROL-GROUP-TOOLTIP',
                defaultMessage: 'CG',
              })}
          </S.MarkLetter>
        </Tooltip>
      )}
      <S.MarkValue>{value}%</S.MarkValue>
    </>
  );

  return (
    <S.AllocationMarks data-testid="ds-allocation-marks">
      {rangerInstance.getSteps().map((section, index) => {
        return (
          <S.AllocationMark
            key={`slider-allocation-mark-${index}`}
            $left={section.left}
            $width={section.width}
          >
            {renderMark(allocations[index], index, variants || [])}
          </S.AllocationMark>
        );
      })}
    </S.AllocationMarks>
  );
};
