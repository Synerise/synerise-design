import React from 'react';

import type {
  MultivalueProps,
  ProgressProps,
  ProgressTilesProps,
} from '@synerise/ds-progress-bar';

export type MockProgressBarProps = ProgressProps & {
  'data-testid'?: string;
};

export type MockMultivalueProps = MultivalueProps & {
  'data-testid'?: string;
};

export type MockProgressTilesProps = ProgressTilesProps & {
  'data-testid'?: string;
};

export const mockProgressBar = () => {
  jest.mock('@synerise/ds-progress-bar', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        className,
        percent,
        label,
        description,
        steps,
        'data-testid': dataTestId,
      }: MockProgressBarProps) => {
        const testId = dataTestId || 'ds-progress-bar';
        return (
          <div
            className={`ds-progress-bar ${className || ''}`}
            data-testid={testId}
            data-percent={percent}
            data-steps={steps}
          >
            {label && <span data-testid={`${testId}-label`}>{label}</span>}
            <div
              data-testid={`${testId}-bar`}
              style={{ width: `${percent}%` }}
            />
            {description && (
              <span data-testid={`${testId}-description`}>{description}</span>
            )}
          </div>
        );
      },
    ),
    Multivalue: jest.fn(
      ({
        values,
        stackedBars,
        'data-testid': dataTestId,
      }: MockMultivalueProps) => {
        const testId = dataTestId || 'ds-progress-bar-multivalue';
        return (
          <div
            data-testid={testId}
            data-stacked={stackedBars}
            className="ds-progress-bar-multivalue"
          >
            {values?.map(
              (
                val: { percent?: number; color?: string; onClick?: () => void },
                i: number,
              ) => (
                <div
                  key={i}
                  data-testid={`${testId}-bar-${i}`}
                  data-percent={val.percent}
                  data-color={val.color}
                  style={{
                    width: `${val.percent}%`,
                    backgroundColor: val.color,
                  }}
                  onClick={val.onClick}
                />
              ),
            )}
          </div>
        );
      },
    ),
    ProgressTiles: jest.fn(
      ({
        colors,
        percent,
        label,
        tileWidth,
        'data-testid': dataTestId,
      }: MockProgressTilesProps) => {
        const testId = dataTestId || 'ds-progress-tiles';
        return (
          <div
            data-testid={testId}
            data-percent={percent}
            className="ds-progress-tiles"
          >
            {label && <span data-testid={`${testId}-label`}>{label}</span>}
            {colors?.map((color: string, i: number) => (
              <div
                key={i}
                data-testid={`${testId}-tile-${i}`}
                style={{ width: tileWidth, backgroundColor: color }}
              />
            ))}
          </div>
        );
      },
    ),
  }));
};

export const mockProgressBarMinimal = () => {
  jest.mock('@synerise/ds-progress-bar', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    Multivalue: jest.fn(() => null),
    ProgressTiles: jest.fn(() => null),
  }));
};
