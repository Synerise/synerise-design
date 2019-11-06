---
id: file-uploader
title: FileUploader
---

FileUploader UI Component

## Installation

```
npm i @synerise/ds-file-uploader
or
yarn add @synerise/ds-file-uploader
```

## Usage

```
import FileUploader from '@synerise/ds-file-uploader'

<FileUploader
  mode="single"
  files={[]}
  accept={['image/png']}
  texts={{
    buttonLabel: 'Upload a new file',
    buttonDescription: 'or drag one here',
    size: 'Size:',
    uploading: 'Uploading...',
  }}
  onUpload={files => processFiles(files)}
/>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-file-uploader--default"></iframe>

## FileUploader

| Property    | Description                                                                      | Type                                      | Default  |
| ----------- | -------------------------------------------------------------------------------- | ----------------------------------------- | -------- |
| mode        | uploader operation mode                                                          | 'single' / 'multi-medium' / 'multi-large' | 'single' |
| description | description shown with uploader                                                  | string                                    | -        |
| disabled    | whether the uploader should be disabled                                          | boolean                                   | -        |
| removable   | whether or not files should be removable                                         | boolean                                   | -        |
| label       | label shown on top of the uploader                                               | string                                    | -        |
| infoTooltip | display a tooltip near the label (label value is required for tooltip to appear) | string                                    | -        |
| error       | display general error                                                            | string                                    | -        |
| texts       | texts to display                                                                 | FileUploaderTexts                         | -        |
| files       | uploaded files                                                                   | ExtendedFile[]                            | -        |
| accept      | accepted mime types to upload                                                    | string[]                                  | -        |
| onRemove    | event fired when a file is removed                                               | (file: File, index: number) => void       | -        |
| onUpload    | event fired when a file is removed                                               | (files: File[]) => void                   | -        |

## ExtendedFile

| Property | Description                                | Type    | Default |
| -------- | ------------------------------------------ | ------- | ------- |
| file     | actual file                                | File    | -       |
| disabled | whether or not the file should be disabled | boolean | -       |
| error    | file error text                            | string  | -       |
| progress | upload progress                            | number  | -       |

## FileUploaderTexts

| Property          | Description                           | Default |
| ----------------- | ------------------------------------- | ------- |
| buttonLabel       | upload button label                   | -       |
| buttonDescription | upload button description             | -       |
| size              | file size label                       | -       |
| uploading         | text to display when uploading a file | -       |
