import React, { useCallback, useState } from 'react';

import Button from '@synerise/ds-button';
import { Input } from '@synerise/ds-input';

import * as S from '../RichText.styles';
import type { LinkPopoverProps } from '../RichText.types';
import { normalizeUrl } from '../utils';

export const LinkPopover = ({ editor, texts, onClose }: LinkPopoverProps) => {
  const currentHref = editor.getAttributes('link').href || '';
  const [url, setUrl] = useState(currentHref);

  const handleApply = useCallback(() => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: normalizeUrl(url) })
        .run();
    }
    onClose();
  }, [editor, url, onClose]);

  const handleRemove = useCallback(() => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    onClose();
  }, [editor, onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleApply();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [handleApply, onClose],
  );

  return (
    <S.PopoverForm onKeyDown={handleKeyDown}>
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder={texts.linkPlaceholder}
        autoFocus
        resetMargin
      />
      <S.PopoverActions>
        <Button type="primary" size="small" onClick={handleApply}>
          {texts.linkConfirm}
        </Button>
        {currentHref && (
          <Button type="ghost" size="small" onClick={handleRemove}>
            {texts.linkRemove}
          </Button>
        )}
      </S.PopoverActions>
    </S.PopoverForm>
  );
};
