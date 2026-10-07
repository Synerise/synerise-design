import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { describe, expect, it } from 'vitest';

import { DropAreaButton as AvatarDropAreaButton } from '../AvatarUploader/AvatarUploader.styles';
import { DropAreaButton } from '../FileUploader.styles';
import { PreviewThumbnail } from '../FileView/FileView.styles';
import { SmallLoader as AvatarSmallLoader } from '../AvatarUploader/FileViewAvatar/FileViewAvatar.styles';
import { SmallLoader as ItemSmallLoader } from '../ItemUploader/UploaderButton/FileViewItem.styles';

const getCss = () =>
  Array.from(document.querySelectorAll('style'))
    .map((style) => style.textContent)
    .join('\n');

describe('FileUploader translucent background tokens', () => {
  it.each([
    ['FileUploader', DropAreaButton],
    ['AvatarUploader', AvatarDropAreaButton],
  ])('%s uses hover and pressed module tokens', (_name, Button) => {
    renderWithProvider(
      <Button mode="single" pressed filesLength={0} hidden={false} />,
    );
    const css = getCss();
    expect(css).toContain('var(--ds-file-uploader-bg-hover)');
    expect(css).toContain('var(--ds-file-uploader-bg-pressed)');
    expect(css).not.toMatch(/rgba\(/);
  });
});

describe('FileUploader file view tokens', () => {
  it('paints stored-file thumbnails with the muted-hover background token', () => {
    renderWithProvider(<PreviewThumbnail src="" alt="" />);
    const css = getCss();
    expect(css).toContain('var(--ds-color-background-base-mutedhover)');
    expect(css).not.toContain('#');
  });

  it.each([
    ['AvatarUploader', AvatarSmallLoader],
    ['ItemUploader', ItemSmallLoader],
  ])('%s loader border follows the custom-colour token', (_name, Loader) => {
    renderWithProvider(<Loader color="blue" size="S" />);
    expect(getCss()).toContain('var(--ds-color-custom-blue-600)');
  });
});
