import React from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import Button from '@synerise/ds-button';
import {
  ImagePreview,
  type ImagePreviewProps,
  useImagePreview,
} from '@synerise/ds-image';

import { avatar1, avatar2, avatar3 } from '../../constants';

const IMAGES = [
  { src: avatar1, alt: 'User avatar 1' },
  { src: avatar2, alt: 'User avatar 2' },
  { src: avatar3, alt: 'User avatar 3' },
];

/** Drives the controlled preview from a single trigger button. */
const PreviewDemo = (args: ImagePreviewProps): JSX.Element => {
  const preview = useImagePreview(args.images);
  return (
    <>
      <Button type="primary" onClick={(): void => preview.open(0)}>
        Open preview
      </Button>
      <ImagePreview {...args} {...preview.previewProps} />
    </>
  );
};

/** Opens the preview from an arbitrary list — no thumbnail gallery involved. */
const FromListDemo = (args: ImagePreviewProps): JSX.Element => {
  const preview = useImagePreview(args.images);
  return (
    <>
      <ul>
        {args.images.map((image, imageIndex) => (
          <li key={image.src}>
            <Button type="ghost" onClick={(): void => preview.open(imageIndex)}>
              {image.alt}
            </Button>
          </li>
        ))}
      </ul>
      <ImagePreview {...args} {...preview.previewProps} />
    </>
  );
};

const meta: Meta<ImagePreviewProps> = {
  title: 'Components/Image/Preview',
  component: ImagePreview,
  render: (args) => <PreviewDemo {...args} />,
  argTypes: {
    zoomable: { control: 'boolean' },
    closable: { control: 'boolean' },
    maskClosable: { control: 'boolean' },
    destroyOnClose: { control: 'boolean' },
    zoomStep: { control: 'number' },
    maxZoom: { control: 'number' },
    initialZoom: { control: 'inline-radio', options: ['fit', 'real-size'] },
    onZoom: { action: 'zoom' },
    open: { table: { disable: true } },
    index: { table: { disable: true } },
    onIndexChange: { table: { disable: true } },
    onClose: { table: { disable: true } },
    images: { table: { disable: true } },
    getContainer: { table: { disable: true } },
    fallback: { table: { disable: true } },
    texts: { table: { disable: true } },
  },
  args: {
    images: IMAGES,
    open: false,
    index: 0,
    onIndexChange: fn(),
    onClose: fn(),
    zoomable: true,
    closable: true,
    maskClosable: true,
    zoomStep: 1.4,
    maxZoom: 3,
    initialZoom: 'fit',
  },
};

export default meta;

type Story = StoryObj<ImagePreviewProps>;

export const MultipleImages: Story = {};

export const SingleImage: Story = {
  args: { images: [IMAGES[0]] },
};

export const TriggeredFromList: Story = {
  render: (args) => <FromListDemo {...args} />,
};

/** Tooltips/labels overridden with custom (here Polish) translations. */
export const CustomTexts: Story = {
  args: {
    texts: {
      zoomIn: 'Powiększ',
      zoomOut: 'Pomniejsz',
      nextImage: 'Następne zdjęcie',
      previousImage: 'Poprzednie zdjęcie',
      download: 'Pobierz',
      close: 'Zamknij',
    },
  },
};
