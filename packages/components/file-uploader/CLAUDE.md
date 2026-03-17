# FileUploader (`@synerise/ds-file-uploader`)

> Drag-and-drop / click-to-upload file input with three visual variants: full drop-zone (`FileUploader`), avatar-preview (`AvatarUploader`), and compact button-row (`ItemUploader`). All variants share the same props shape and expose the same imperative ref.

## Package structure

```
src/
  FileUploader.tsx              — main drop-zone uploader (forwardRef)
  FileUploader.types.ts         — all shared types: props, ExtendedFile, FileUploaderRef, texts
  FileUploader.styles.ts        — styled-components for FileUploader
  index.ts                      — public exports + FileUploaderStyles aggregate

  FileView/
    FileView.tsx                — file row with progress/error/remove (used by FileUploader)
    FileView.types.ts           — FileViewProps
    FileView.styles.ts
    FileView.const.tsx          — ICON_MAP, isPreviewableMimeType

  AvatarUploader/
    AvatarUploader.tsx          — avatar-preview uploader (forwardRef)
    AvatarUploader.styles.ts
    FileViewAvatar/
      FileViewAvatar.tsx        — avatar + file row used by AvatarUploader
      FileViewAvatar.types.ts   — FileViewAvatarProps, FileViewAvatarTexts, PreviewableMimeType
      FileViewAvatar.styles.ts
      FileViewAvatar.const.tsx  — ICON_MAP
      FileViewAvatar.util.ts    — isPreviewableMimeType

  ItemUploader/
    ItemUploader.tsx            — compact button-row uploader (forwardRef)
    ItemUploader.types.ts       — re-exports ItemUploaderProps from FileUploader.types
    ItemUploader.styles.ts
    UploaderButton/
      FileViewItem.tsx          — compact file row used by ItemUploader
      FileViewItem.styles.ts
      FileViewItem.const.tsx    — ICON_MAP, isPreviewableMimeType

  __specs__/
    FileUploader.spec.tsx       — Jest tests
```

## Public exports

### `FileUploader` (default export)

Full-width drop-zone uploader. `forwardRef<FileUploaderRef, FileUploaderProps>`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'single' \| 'multi-medium' \| 'multi-large'` | `'single'` | Layout/behaviour mode. `multi-large` shows a large 160px drop area |
| `files` | `ExtendedFile[]` | `[]` | Controlled list of uploaded files to display |
| `onUpload` | `(files: FileWithContent[]) => void` | `undefined` | Called after drop/select with files enriched with `.content` |
| `onRemove` | `(file: FileWithContent, index: number) => void` | `undefined` | Called when user removes a file row |
| `accept` | `string[]` | `undefined` | Accepted MIME types (e.g. `['image/png', 'application/pdf']`) |
| `filesAmount` | `number` | `undefined` | Maximum number of files. Throws if set to `< 1`. Drop zone hides once limit is reached |
| `removable` | `boolean` | `true` | Show remove button on file rows |
| `disabled` | `boolean` | `undefined` | Disables the drop zone and file rows |
| `error` | `string` | `undefined` | Displays a global error message below the drop zone |
| `retry` | `boolean` | `undefined` | When `true` and a file has an error, shows a Retry button that re-opens the file dialog |
| `label` | `string` | `undefined` | Label above the drop zone |
| `tooltip` | `string` | `undefined` | Tooltip (ℹ icon) shown next to the label (requires `label`) |
| `description` | `string` | `undefined` | Hint text below the error area |
| `texts` | `FileUploaderTexts` | `undefined` | i18n overrides (see below). Falls back to `react-intl` message IDs |
| `className` | `string` | `undefined` | Extra CSS class; merged with `'ds-file-uploader'` |
| + HTML div attrs | — | — | Spread onto the outer `<div>` container |

**Imperative ref** (`FileUploaderRef`):
```ts
{ open: () => void; inputRef: RefObject<HTMLInputElement>; rootRef: RefObject<HTMLElement> }
```
Call `ref.current.open()` to programmatically open the file picker.

### `AvatarUploader`

`forwardRef<FileUploaderRef, FileUploaderProps>`. Same props as `FileUploader`. Shows uploaded files as avatar previews alongside a compact file row. Drop zone uses a picture-placeholder icon. "Add file" button label is **hardcoded** — not driven by `texts`. Does not accept `retry` in practice (it's in `FileUploaderProps` but not used in `AvatarUploader`).

### `ItemUploader`

`forwardRef<FileUploaderRef, ItemUploaderProps>`. Same as `FileUploader` except:
- `mode` type: `'single' | 'multi'` (not `'multi-medium' | 'multi-large'`)
- Shows a ghost-primary "Add file" button instead of a drop-zone area. Button label is **hardcoded** — not driven by `texts`.
- Does not render a `description` below error messages (it's passed to `FileViewItem` but `FileViewItem` doesn't render it).

### `FileUploaderStyles`

Aggregated style object exported for consumers who need to extend or override styled-components:
```ts
{
  FileUploader: FileUploaderStyles,
  FileView: FileViewStyles,
  ItemUploader: ItemUploaderStyles,
  AvatarUploader: AvatarUploaderStyles,
}
```

### Types exported

| Type | Description |
|------|-------------|
| `FileUploaderProps` | Main props interface (extends `WithHTMLAttributes<HTMLDivElement, ...>`) |
| `ItemUploaderProps` | Same as `FileUploaderProps` with narrower `mode` |
| `ExtendedFile` | `{ file: FileWithContent; error?: string; disabled?: boolean; progress?: number; success?: boolean }` |
| `FileWithContent` | `File & { content?: FileContent }` |
| `FileContent` | `string \| ArrayBuffer \| null` |
| `FileUploaderRef` | `{ open; inputRef; rootRef }` |

### `FileUploaderTexts` shape

| Key | Default (react-intl) | Description |
|-----|----------------------|-------------|
| `buttonLabel` | `"Upload file"` | Drop-zone button label (compact mode) |
| `buttonLabelLarge` | `"Upload file"` | Drop-zone label (multi-large, no files) |
| `buttonDescription` | `"Description"` | Drop-zone sub-label (multi-large) |
| `size` | `"Size"` | Prefix before file size in file row |
| `removeTooltip` | `"Remove"` | Tooltip on remove icon |
| `cancelText` | `"Cancel"` | Popconfirm cancel button |
| `okText` | `"OK"` | Popconfirm confirm button |
| `removeConfirmTitle` | `"Remove"` | Popconfirm title |
| `fileWeight` | `"File weight"` | Label for file weight during upload |
| `retryLabel` | `"Retry"` | Label on retry button |
| `percent` | — | Current upload percentage (number) — passed to `ProgressBar` |

## Usage patterns

```tsx
import FileUploader, { AvatarUploader, ItemUploader } from '@synerise/ds-file-uploader';
import type { ExtendedFile, FileWithContent } from '@synerise/ds-file-uploader';
import { useRef, useState } from 'react';

const [files, setFiles] = useState<ExtendedFile[]>([]);
const uploaderRef = useRef(null);

// Standard drop-zone
<FileUploader
  mode="multi-medium"
  files={files}
  accept={['image/png', 'image/jpeg']}
  filesAmount={5}
  onUpload={(newFiles: FileWithContent[]) =>
    setFiles(prev => [...prev, ...newFiles.map(f => ({ file: f }))])
  }
  onRemove={(_, index) => setFiles(prev => prev.filter((_, i) => i !== index))}
  label="Attachments"
  tooltip="Max 5 files"
/>

// Avatar variant
<AvatarUploader
  mode="single"
  files={files}
  onUpload={...}
  onRemove={...}
/>

// Compact button variant
<ItemUploader
  mode="multi"
  files={files}
  onUpload={...}
  onRemove={...}
/>

// Programmatic open
<FileUploader ref={uploaderRef} ... />
<button onClick={() => uploaderRef.current?.open()}>Browse</button>
```

## Styling

Styles in `FileUploader.styles.ts` (and per-variant siblings). Uses `props.theme.palette` tokens from `@synerise/ds-core` throughout — no hardcoded hex values. Drop area transitions colours on `isDragActive`, hover, focus, error, and disabled states.

## Key dependencies

- `react-dropzone` — core drag-and-drop, file input wiring, `isDragActive`, `open()`, `inputRef`/`rootRef`
- `filesize.js` — human-readable file size strings in `FileView`
- `react-intl` — default text strings (peer dependency)
- `@synerise/ds-popconfirm` — remove confirmation dialog in `FileView`
- `@synerise/ds-progress-bar` — upload progress bar in `FileView`
- `@synerise/ds-loader` — spinner in `FileViewAvatar` / `FileViewItem` during upload
- `@synerise/ds-tooltip` — remove/retry tooltips

## Implementation notes

- **File content reading:** `onUpload` is called with `FileWithContent[]`. For `.txt` files only, `content` is populated with the file text via `FileReader.readAsText`. For all other MIME types, `content` is `null`. This happens automatically before `onUpload` fires.
- **`filesAmount` enforcement:** When more files are dropped than `filesAmount - files.length`, the upload is silently rejected and a local error "To many files uploaded" [sic] is appended. The prop mutation (`filesAmount = 1`) + `throw` when `< 1` is a runtime guard but does not prevent re-render.
- **`FileViewAvatar` memory leak:** `URL.createObjectURL(data.file)` is called on every render without a matching `URL.revokeObjectURL` call — leaks memory for long-lived file lists.
- **"Add file" hardcoded:** Both `AvatarUploader` and `ItemUploader` render a hardcoded "Add file" button label that cannot be overridden via `texts`.
- **`retry` in `FileView`:** When `retry=true` and a file row has `error`, the retry button spreads `getRootProps()` (from `useDropzone`) to open the file picker — it first calls `onRemove` to clear the errored entry, then re-opens the dialog.
- **`texts.percent`** is typed `number` (not `ReactNode`) because it's passed directly to `ProgressBar`'s `percent` prop.
- **`FileViewAvatarTexts`** is not exported from `index.ts` — accessible only as a deep import.
- **Tests use Jest** (`jest.config.js`) — not yet migrated to Vitest.
