import React, { useCallback } from 'react';

import { FormFieldLabel } from '@synerise/ds-form-field';

import * as S from './ProgressTiles.styles';
import { type ProgressTilesProps } from './ProgressTiles.types';

const MAX_PERCENT = 100;

export const ProgressTiles = ({
  colors,
  label,
  tileWidth,
  percent,
  ...rest
}: ProgressTilesProps) => {
  const getTilesConfig = useCallback(() => {
    const TILES_COUNT = colors.length;

    const tileWidthRatio = MAX_PERCENT / TILES_COUNT;
    const currentProgress = percent / tileWidthRatio;
    const tileWidths = Array(Math.floor(currentProgress)).fill(1);
    const lastTileWidth = currentProgress % 1;
    const tilesWidthRatios = [...tileWidths, lastTileWidth];

    return colors.map((color, i) => ({
      key: i,
      color,
      width: `${(tilesWidthRatios[i] || 0) * MAX_PERCENT}%`,
    }));
  }, [colors, percent]);

  return (
    <S.TilesWrapper {...rest}>
      {label && (
        <FormFieldLabel className="progress-bar-label">{label}</FormFieldLabel>
      )}

      <div className="progress-bar-wrapper">
        {getTilesConfig().map((tile) => (
          <S.TileContainer key={`key-${tile.key}`} width={tileWidth}>
            <S.TileProgress color={tile.color} width={tile.width} />
          </S.TileContainer>
        ))}
      </div>
    </S.TilesWrapper>
  );
};

export default ProgressTiles;
