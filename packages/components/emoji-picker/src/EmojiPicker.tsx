import React, { useRef, useState } from 'react';

import Dropdown from '@synerise/ds-dropdown';
import { useOnClickOutside } from '@synerise/ds-utils';

import { EmojiOverlay } from './EmojiOverlay/EmojiOverlay';
import * as S from './EmojiPicker.styles';
import type { EmojiPickerProps } from './EmojiPicker.types';

export const EmojiPicker = ({
  children,
  closeOnSelect = true,
  onSelect,
  texts,
  dropdownProps,
}: EmojiPickerProps) => {
  const [isOpen, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);

  useOnClickOutside(ref, (event) => {
    if (triggerRef.current && event.target) {
      if (triggerRef.current.contains(event.target as HTMLElement)) {
        return;
      }
    }
    setOpen(false);
  });

  const toggleOpen = (newState: boolean) => {
    setOpen(newState);
    setFocus(newState);
  };

  return (
    <Dropdown
      open={isOpen}
      onOpenChange={toggleOpen}
      placement="bottomRight"
      asChild
      {...dropdownProps}
      popoverProps={{
        testId: 'emojipicker',
        ...dropdownProps?.popoverProps,
      }}
      size="medium"
      overlay={
        <S.Overlay ref={ref} onClick={(event) => event.stopPropagation()}>
          <EmojiOverlay
            onSelect={(val) => {
              closeOnSelect && toggleOpen(false);
              onSelect?.(val);
            }}
            texts={texts}
            focus={focus}
          />
        </S.Overlay>
      }
    >
      {children}
    </Dropdown>
  );
};
