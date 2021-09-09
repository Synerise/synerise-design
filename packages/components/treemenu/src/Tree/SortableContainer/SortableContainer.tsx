import React from 'react';
import { SortableContainer, SortableContainerProps } from 'react-sortable-hoc';

import * as S from '../../TreeMenu.styles';

const CustomSortableContainer = SortableContainer(
  ({ children }: SortableContainerProps & { children: React.ReactNode }) => {
    return <S.TreeMenu>{children}</S.TreeMenu>;
  },
  { withRef: true }
);

export default CustomSortableContainer;
