import React from 'react';

import {
  FloatingNode,
  FloatingTree,
  useFloatingParentNodeId,
} from '@floating-ui/react';

import type { PopoverProps } from './Popover.types';
import { PopoverContext } from './contexts';
import { usePopover } from './hooks';

// Inner component that must be called from within FloatingTree
const PopoverContent = ({
  children,
  modal = false,
  ...restOptions
}: PopoverProps) => {
  const popover = usePopover({ modal, ...restOptions });
  return (
    <FloatingNode id={popover.context.nodeId}>
      <PopoverContext.Provider value={popover}>
        {children}
      </PopoverContext.Provider>
    </FloatingNode>
  );
};

// Outer component that ensures FloatingTree exists
export const Popover = (props: PopoverProps) => {
  const parentId = useFloatingParentNodeId();

  // If there's no parent node, wrap with FloatingTree for nested popover support
  if (parentId === null) {
    return (
      <FloatingTree>
        <PopoverContent {...props} />
      </FloatingTree>
    );
  }

  return <PopoverContent {...props} />;
};
