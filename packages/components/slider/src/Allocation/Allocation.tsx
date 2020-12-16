import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip';
import { SliderValue } from 'antd/es/slider';
import { DescriptionWrapper, Description } from '../Slider.styles';
import * as S from './Allocation.styles';
import { Props } from '../Slider.types';
import {
  countAllocation,
  isLowerOrUpperBound,
  mapSliderValueToVariants,
  mapUserAllocationToHandles,
  mapUserAllocationToMarks,
} from './utils';
import { AllocationConfig, AllocationVariant } from './Allocation.types';

const Allocation: React.FC<Props> = ({
  allocationConfig,
  tracksColorMap,
  description,
  tipFormatter,
  ...rest
}: Props) => {
  const {
    variants,
    onAllocationChange,
    controlGroupEnabled,
    controlGroupLabel,
    controlGroupTooltip,
  } = allocationConfig as AllocationConfig;
  const [allocations, setAllocations] = React.useState(countAllocation(variants, controlGroupEnabled));
  React.useEffect(() => {
    setAllocations(countAllocation(variants, controlGroupEnabled));
  }, [variants, controlGroupEnabled]);

  const markRenderer = React.useCallback(
    (value: number, index: number, allocationVariants: AllocationVariant[]) => (
      <S.Mark className="slider-mark">
        <S.MarkValue>{value}</S.MarkValue>
        {allocationVariants[index] && (
          <Tooltip title={<S.MarkTooltipWrapper>{allocationVariants[index].tabLetter}</S.MarkTooltipWrapper>}>
            <S.MarkLetter index={index}>{allocationVariants[index].tabLetter}</S.MarkLetter>
          </Tooltip>
        )}
        {!allocationVariants[index] && (
          <Tooltip title={controlGroupTooltip || 'Control group'}>
            <S.MarkLetter index="cg">{controlGroupLabel || 'CG'}</S.MarkLetter>
          </Tooltip>
        )}
      </S.Mark>
    ),
    [controlGroupTooltip, controlGroupLabel]
  );

  const handleChange = React.useCallback(
    (value: SliderValue) => {
      if (typeof value === 'number') {
        return;
      }
      const calculatedVariants = mapSliderValueToVariants(value, variants);
      !isLowerOrUpperBound(value, calculatedVariants) && onAllocationChange && onAllocationChange(calculatedVariants);
    },
    [onAllocationChange, variants]
  );

  return (
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
      tipFormatter={(value): React.ReactNode => (
        <DescriptionWrapper>
          {description && <Description>{description}</Description>}
          {tipFormatter && tipFormatter(value)}
        </DescriptionWrapper>
      )}
    >
      <S.TrackContainer controlGroup={controlGroupEnabled}>
        {allocations.map((u: number, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <S.Track key={`${u}-${index}`} index={index} width={u} />
        ))}
      </S.TrackContainer>
    </S.AllocationSlider>
  );
};

export default Allocation;
