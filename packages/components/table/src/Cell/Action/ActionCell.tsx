import React from 'react';

import * as S from './ActionCell.styles';
import { type ActionCellProps } from './ActionCell.types';

const DEFAULT_GAP_SIZE = 24;

const ActionCell = ({
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

export default React.memo(ActionCell);
