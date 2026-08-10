import React, { useCallback, useRef, useState } from 'react';

import Button from '@synerise/ds-button';
import { Input } from '@synerise/ds-input';

import * as S from '../RichText.styles';
import type { ImagePopoverProps } from '../RichText.types';
import { normalizeUrl } from '../utils';

export const ImagePopover = ({
  editor,
  texts,
  onClose,
  onImageUpload,
}: ImagePopoverProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const insertImage = useCallback(
    (src: string) => {
      editor.chain().focus().setImage({ src }).run();
      onClose();
    },
    [editor, onClose],
  );

  const handleApply = useCallback(() => {
    if (url) {
      insertImage(normalizeUrl(url));
    }
  }, [url, insertImage]);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }

      if (onImageUpload) {
        setIsUploading(true);
        try {
          const src = await onImageUpload(file);
          insertImage(src);
        } catch (error) {
          // The consumer's upload failed; keep the popover open so the user can retry.
          // eslint-disable-next-line no-console
          console.error('RichText: image upload failed', error);
        } finally {
          setIsUploading(false);
        }
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            insertImage(reader.result);
          }
        };
        reader.onerror = () => {
          // eslint-disable-next-line no-console
          console.error('RichText: failed to read image file', reader.error);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload, insertImage],
  );

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
        placeholder={texts.imagePlaceholder}
        autoFocus
        resetMargin
      />
      <S.PopoverActions>
        <Button
          type="primary"
          size="small"
          onClick={handleApply}
          disabled={!url}
        >
          {texts.imageConfirm}
        </Button>
        <Button
          type="ghost"
          size="small"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {texts.imageUpload}
        </Button>
      </S.PopoverActions>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </S.PopoverForm>
  );
};
