import { useCallback, useEffect, useRef, useState } from 'react';

type UseDropdownVisibilityProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (newState: boolean) => void;
};

export const useDropdownVisibility = ({
  open,
  onOpenChange,
}: UseDropdownVisibilityProps) => {
  const [internalOpen, setInternalOpen] = useState(open);
  const skipDuplicates = useRef(0);

  const controlledComponent = open !== undefined;
  const actualOpen = controlledComponent ? open : internalOpen;

  useEffect(() => {
    skipDuplicates.current = 0;
  }, [internalOpen]);

  useEffect(() => {
    if (controlledComponent && open !== internalOpen) {
      if (skipDuplicates.current === 0) {
        skipDuplicates.current += 1;
        onOpenChange?.(open);
      }
      setInternalOpen(open);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledComponent, open]);

  const toggleOpen = useCallback(
    (openState: boolean) => {
      if (openState !== internalOpen) {
        setInternalOpen(openState);
      }
      // PopupTrigger fires toggleOpen onClick
      // the trigger in the implementation may or may not have an onClick that changes `open` state
      // this prevents duplicated onOpenChange calls if both have onClicks defined
      if (skipDuplicates.current === 0) {
        skipDuplicates.current += 1;
        onOpenChange?.(openState);
      }
    },
    [internalOpen, onOpenChange],
  );

  return {
    toggleOpen,
    open: actualOpen,
  };
};
