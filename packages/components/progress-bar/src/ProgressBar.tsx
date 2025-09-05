import React, { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import * as S from './ProgressBar.styles';
import { type ProgressProps } from './ProgressBar.types';

const MAX_PERCENT = 100;

const ProgressBar = ({
  description = '',
  label,
  steps = 1,
  width = '100%',
  customColor = '',
  percent = 50,
  className,
  thin = false,
  containerStyles,
  inline = false,
  ...rest
}: ProgressProps) => {
  const tiles = useMemo(
    () => Array.from({ length: steps }, () => ({ id: uuid() })),
    [steps],
  );
  const tileWidthRatio = MAX_PERCENT / steps;
  const currentProgress = percent / tileWidthRatio;
  const tileWidths = Array(Math.floor(currentProgress)).fill(1);
  const lastTileWidth = currentProgress % 1;
  const tilesWidthRatios = [...tileWidths, lastTileWidth];

  return (
    <S.Container
      className={`${className || ''} progress-bar-container`}
      data-testid="progress-bar-container"
      steps={steps}
      inline={inline}
      {...rest}
    >
      {label && !inline && (
        <S.LabelWrapper>
          <S.Label
            data-testid="progress-bar-label"
            className="progress-bar-label"
          >
            {label}
          </S.Label>
          <span data-testid="progress-bar-max-percent">{`${percent}%`}</span>
        </S.LabelWrapper>
      )}
      <div className="progress-div">
        {tiles.map((tile, i) => (
          <S.ProgressWrapper thin={thin} key={`key-${tile.id}`} width={width}>
            <S.ProgressBar
              customColor={customColor}
              width={`${(tilesWidthRatios[i] || 0) * MAX_PERCENT}%`}
            />
          </S.ProgressWrapper>
        ))}
      </div>
      {inline && <S.PercentWrapper>{`${percent}%`}</S.PercentWrapper>}
      {description && !inline && (
        <span
          className="progress-bar-description"
          data-testid="progress-bar-description"
        >
          {description}
        </span>
      )}
    </S.Container>
  );
};

export default ProgressBar;
