import React from 'react';

type MockSliderProps = {
  value?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
};

export const mockSlider = () => {
  jest.mock('@synerise/ds-slider', () => {
    const Slider = jest.fn(
      ({
        value,
        onChange,
        min = 0,
        max = 100,
        step = 1,
        disabled,
        className,
        'data-testid': dataTestId,
      }: MockSliderProps) => {
        const testId = dataTestId || 'ds-slider';
        const isRange = Array.isArray(value);

        return (
          <div
            data-testid={testId}
            className={className || 'ds-slider'}
            data-disabled={disabled}
          >
            {isRange ? (
              <>
                <input
                  data-testid={`${testId}-input-min`}
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={value[0]}
                  disabled={disabled}
                  onChange={(e) =>
                    onChange?.([Number(e.target.value), value[1]])
                  }
                />
                <input
                  data-testid={`${testId}-input-max`}
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={value[1]}
                  disabled={disabled}
                  onChange={(e) =>
                    onChange?.([value[0], Number(e.target.value)])
                  }
                />
              </>
            ) : (
              <input
                data-testid={`${testId}-input`}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value ?? min}
                disabled={disabled}
                onChange={(e) => onChange?.(Number(e.target.value))}
              />
            )}
          </div>
        );
      },
    );

    return {
      __esModule: true,
      default: Slider,
    };
  });
};

export const mockSliderMinimal = () => {
  jest.mock('@synerise/ds-slider', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
