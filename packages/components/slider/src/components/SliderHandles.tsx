import React from 'react';

import Tooltip from '@synerise/ds-tooltip';
import { Text } from '@synerise/ds-typography';

import * as S from '../Slider.styles';
import { type BaseSliderProps, type HandlerConfig } from '../Slider.types';
import { useSliderContext } from '../context/SliderContext';

type SliderHandlesProps = Pick<BaseSliderProps, 'tipFormatter'> & {
  disabled?: boolean;
  handlersConfig?: HandlerConfig;
  type: 'allocation' | 'range' | 'default';
};
export const SliderHandles = ({
  disabled,
  handlersConfig,
  tipFormatter,
  type,
}: SliderHandlesProps) => {
  const { rangerInstance, rangerHandles } = useSliderContext();
  return (
    <S.EventTrap
      data-testid="ds-slider-handles"
      onClick={(e) => e.stopPropagation()}
    >
      {rangerInstance
        .handles()
        .map(
          (
            {
              value,
              onKeyDownHandler,
              onMouseDownHandler,
              onTouchStart,
              isActive,
            },
            i,
          ) => {
            const { blocked, blockedTooltipProps } =
              handlersConfig && handlersConfig[i + 1]
                ? handlersConfig[i + 1]
                : {};
            const handle = (
              <S.SliderHandleWrapper
                key={`slider-handle-${i}`}
                $left={rangerInstance.getPercentageForValue(value)}
              >
                <S.SliderHandle
                  data-testid="ds-slider-handle"
                  data-index={i}
                  $disabled={disabled}
                  $blocked={blocked}
                  onKeyDown={
                    !disabled && !blocked ? onKeyDownHandler : undefined
                  }
                  onMouseDown={
                    !disabled && !blocked ? onMouseDownHandler : undefined
                  }
                  onTouchStart={
                    !disabled && !blocked ? onTouchStart : undefined
                  }
                  role="slider"
                  aria-valuemin={rangerInstance.options.min}
                  aria-valuemax={rangerInstance.options.max}
                  aria-valuenow={value}
                  isActive={isActive}
                />
                {type !== 'allocation' && tipFormatter !== false && (
                  <S.SliderHandleValue
                    ref={(node) =>
                      node &&
                      rangerHandles.current &&
                      (rangerHandles.current[i] = node)
                    }
                    isActive={isActive}
                  >
                    <Text size="medium">
                      {tipFormatter ? tipFormatter(value) : value}
                    </Text>
                  </S.SliderHandleValue>
                )}
              </S.SliderHandleWrapper>
            );
            return blocked && blockedTooltipProps ? (
              <Tooltip {...blockedTooltipProps}>{handle}</Tooltip>
            ) : (
              handle
            );
          },
        )}
    </S.EventTrap>
  );
};
