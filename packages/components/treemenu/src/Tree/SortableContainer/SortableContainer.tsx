import React from 'react';

import { SortableContainer, SortableContainerProps } from 'react-sortable-hoc';

import * as S from '../../TreeMenu.styles';

const CustomSortableContainer = SortableContainer(
  ({ children }: SortableContainerProps & React.PropsWithChildren) => {
    return <S.TreeMenu>{children}</S.TreeMenu>;
  },
  { withRef: true }
) as /* FIXME */ any;

export default CustomSortableContainer;
