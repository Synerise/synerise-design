import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { describe, expect, it } from 'vitest';

import { DropAreaButton as AvatarDropAreaButton } from '../AvatarUploader/AvatarUploader.styles';
import { DropAreaButton } from '../FileUploader.styles';

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
