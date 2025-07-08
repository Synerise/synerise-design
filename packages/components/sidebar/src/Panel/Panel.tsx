import React, { useContext } from 'react';

import { DraggablePanel } from '../DraggablePanel/DraggablePanel';
import { PanelContent } from '../PanelContent/PanelContent';
import { SidebarContext } from '../Sidebar.context';
import { type PanelProps } from '../Sidebar.types';

export const Panel = (props: PanelProps) => {
  const context = useContext(SidebarContext);
  const { isSortable } = context || {};

  return isSortable ? (
    <DraggablePanel {...props} />
  ) : (
    <PanelContent {...props} />
  );
};

export default Panel;
