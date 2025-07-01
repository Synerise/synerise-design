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
  filesAmount={1}
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

<iframe src="/storybook-static/iframe.html?id=components-fileuploader--single"></iframe>

## FileUploader

| Property    | Description                                                                      | Type                                      | Default  |
| ----------- | -------------------------------------------------------------------------------- | ----------------------------------------- | -------- |
| mode        | uploader operation mode                                                          | `single` / `multi-medium` / `multi-large` | `single` |
| mode        | uploader maximum files number                                                    | number                                    | -        |
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

| Property | Description                                | Type            | Default |
| -------- | ------------------------------------------ | --------------- | ------- |
| file     | actual file                                | FileWithContent | -       |
| disabled | whether or not the file should be disabled | boolean         | -       |
| error    | file error text                            | string          | -       |
| progress | upload progress                            | number          | -       |
| success  | upload success                             | boolean         | -       |

## FileWithContent (extends [File](https://developer.mozilla.org/pl/docs/Web/API/File))

| Property | Description                                                 | Type                      | Default |
| -------- | ----------------------------------------------------------- | ------------------------- | ------- |
| content  | Plain text of txt files, for other file types contains null | string, null, ArrayBuffer | null    |

## FileUploaderTexts

| Property          | Description                           | Type                     | Default |
| ----------------- | ------------------------------------- | ------------------------ | ------- |
| buttonLabel       | upload button label                   | string / React.ReactNode | -       |
| buttonDescription | upload button description             | string / React.ReactNode | -       |
| size              | file size label                       | string / React.ReactNode | -       |
| uploading         | text to display when uploading a file | string / React.ReactNode | -       |
