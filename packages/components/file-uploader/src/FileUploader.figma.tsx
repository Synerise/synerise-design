import figma from '@figma/code-connect';

import FileUploader from './FileUploader';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=772-15258&m=dev';

const SHARED_PROPS = {
  label: figma.boolean('Show Label#2898:0', {
    true: 'Label',
    false: undefined,
  }),
  description: figma.boolean('Show Description#2898:20', {
    true: 'Description',
    false: undefined,
  }),
};

// =========================================================
// Size: Small → single mode
// =========================================================

figma.connect(FileUploader, FIGMA_URL, {
  variant: { Size: 'Small', State: 'Default' },
  props: SHARED_PROPS,
  example: ({ label, description }) => (
    <FileUploader
      mode="single"
      files={[]}
      label={label}
      description={description}
    />
  ),
});

figma.connect(FileUploader, FIGMA_URL, {
  variant: { Size: 'Small', State: 'Disabled' },
  props: SHARED_PROPS,
  example: ({ label, description }) => (
    <FileUploader
      mode="single"
      files={[]}
      disabled
      label={label}
      description={description}
    />
  ),
});

figma.connect(FileUploader, FIGMA_URL, {
  variant: { Size: 'Small', State: 'Upload Error' },
  props: SHARED_PROPS,
  example: ({ label, description }) => (
    <FileUploader
      mode="single"
      files={[]}
      error="Upload failed"
      label={label}
      description={description}
    />
  ),
});

figma.connect(FileUploader, FIGMA_URL, {
  variant: { Size: 'Small', State: 'Uploaded' },
  props: SHARED_PROPS,
  example: ({ label, description }) => (
    <FileUploader
      mode="single"
      files={[
        {
          file: new File([''], 'document.pdf', { type: 'application/pdf' }),
          success: true,
        },
      ]}
      label={label}
      description={description}
    />
  ),
});

figma.connect(FileUploader, FIGMA_URL, {
  variant: { Size: 'Small', State: 'Uploaded Multi' },
  props: SHARED_PROPS,
  example: ({ label, description }) => (
    <FileUploader
      mode="multi-medium"
      files={[
        {
          file: new File([''], 'document-1.pdf', { type: 'application/pdf' }),
          success: true,
        },
        {
          file: new File([''], 'document-2.pdf', { type: 'application/pdf' }),
          success: true,
        },
      ]}
      label={label}
      description={description}
    />
  ),
});

figma.connect(FileUploader, FIGMA_URL, {
  variant: { Size: 'Small', State: 'Uploading' },
  props: SHARED_PROPS,
  example: ({ label, description }) => (
    <FileUploader
      mode="single"
      files={[
        {
          file: new File([''], 'document.pdf', { type: 'application/pdf' }),
          progress: 60,
        },
      ]}
      label={label}
      description={description}
    />
  ),
});

figma.connect(FileUploader, FIGMA_URL, {
  variant: { Size: 'Small', State: 'Validated' },
  props: SHARED_PROPS,
  example: ({ label, description }) => (
    <FileUploader
      mode="single"
      files={[
        {
          file: new File([''], 'document.pdf', { type: 'application/pdf' }),
          success: true,
        },
      ]}
      label={label}
      description={description}
    />
  ),
});

// =========================================================
// Size: Large → multi-large mode
// =========================================================

figma.connect(FileUploader, FIGMA_URL, {
  variant: { Size: 'Large', State: 'Default' },
  props: SHARED_PROPS,
  example: ({ label, description }) => (
    <FileUploader
      mode="multi-large"
      files={[]}
      label={label}
      description={description}
    />
  ),
});

figma.connect(FileUploader, FIGMA_URL, {
  variant: { Size: 'Large', State: 'Disabled' },
  props: SHARED_PROPS,
  example: ({ label, description }) => (
    <FileUploader
      mode="multi-large"
      files={[]}
      disabled
      label={label}
      description={description}
    />
  ),
});

figma.connect(FileUploader, FIGMA_URL, {
  variant: { Size: 'Large', State: 'Upload Error' },
  props: SHARED_PROPS,
  example: ({ label, description }) => (
    <FileUploader
      mode="multi-large"
      files={[]}
      error="Upload failed"
      label={label}
      description={description}
    />
  ),
});

figma.connect(FileUploader, FIGMA_URL, {
  variant: { Size: 'Large', State: 'Uploaded' },
  props: SHARED_PROPS,
  example: ({ label, description }) => (
    <FileUploader
      mode="multi-large"
      files={[
        {
          file: new File([''], 'document.pdf', { type: 'application/pdf' }),
          success: true,
        },
      ]}
      label={label}
      description={description}
    />
  ),
});

figma.connect(FileUploader, FIGMA_URL, {
  variant: { Size: 'Large', State: 'Uploading' },
  props: SHARED_PROPS,
  example: ({ label, description }) => (
    <FileUploader
      mode="multi-large"
      files={[
        {
          file: new File([''], 'document.pdf', { type: 'application/pdf' }),
          progress: 60,
        },
      ]}
      label={label}
      description={description}
    />
  ),
});

figma.connect(FileUploader, FIGMA_URL, {
  variant: { Size: 'Large', State: 'Validated' },
  props: SHARED_PROPS,
  example: ({ label, description }) => (
    <FileUploader
      mode="multi-large"
      files={[
        {
          file: new File([''], 'document.pdf', { type: 'application/pdf' }),
          success: true,
        },
      ]}
      label={label}
      description={description}
    />
  ),
});
