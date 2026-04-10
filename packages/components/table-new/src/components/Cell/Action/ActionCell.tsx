import React from 'react';

import * as S from './ActionCell.styles';
import { type ActionCellProps } from './ActionCell.types';

const DEFAULT_GAP_SIZE = 24;

const ActionCellComponent = ({
  children,
  gapSize = DEFAULT_GAP_SIZE,
  contentAlign = 'right',
  ...htmlAttributes
}: ActionCellProps) => {
  return (
    <S.ActionCell
      gapSize={gapSize}
      contentAlign={contentAlign}
      {...htmlAttributes}
    >
      {children}
    </S.ActionCell>
  );
};

export const ActionCell = React.memo(ActionCellComponent);
