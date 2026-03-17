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
| filesAmount | uploader maximum files number                                                    | number                                    | -        |
| description | description shown with uploader                                                  | string                                    | -        |
| disabled    | whether the uploader should be disabled                                          | boolean                                   | -        |
| removable   | whether or not files should be removable                                         | boolean                                   | `true`   |
| label       | label shown on top of the uploader                                               | string                                    | -        |
| tooltip     | display a tooltip near the label (label value is required for tooltip to appear) | string                                    | -        |
| error       | display general error                                                            | string                                    | -        |
| retry       | when true and a file has an error, shows a retry button that re-opens the dialog | boolean                                   | -        |
| texts       | texts to display                                                                 | FileUploaderTexts                         | -        |
| files       | uploaded files                                                                   | ExtendedFile[]                            | `[]`     |
| accept      | accepted mime types to upload                                                    | string[]                                  | -        |
| onRemove    | event fired when a file is removed                                               | (file: FileWithContent, index: number) => void | -   |
| onUpload    | event fired when files are selected or dropped                                   | (files: FileWithContent[]) => void        | -        |

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

| Property          | Description                                              | Type                     | Default |
| ----------------- | -------------------------------------------------------- | ------------------------ | ------- |
| buttonLabel       | upload button label (compact drop zone)                  | string / React.ReactNode | -       |
| buttonLabelLarge  | upload label (multi-large mode, no files uploaded yet)   | string / React.ReactNode | -       |
| buttonDescription | upload button description (multi-large mode)             | string / React.ReactNode | -       |
| size              | file size label prefix                                   | string / React.ReactNode | -       |
| removeTooltip     | tooltip text on the remove icon                          | string / React.ReactNode | -       |
| cancelText        | popconfirm cancel button label                           | string / React.ReactNode | -       |
| okText            | popconfirm confirm button label                          | string / React.ReactNode | -       |
| removeConfirmTitle| popconfirm title                                         | string / React.ReactNode | -       |
| fileWeight        | label for file weight during upload                      | string / React.ReactNode | -       |
| retryLabel        | label on the retry button                                | string / React.ReactNode | -       |
| percent           | current upload percentage (passed to ProgressBar)        | number                   | -       |
