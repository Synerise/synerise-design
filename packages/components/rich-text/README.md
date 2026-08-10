---
id: rich-text
title: RichText
---

RichText UI Component — a WYSIWYG editor for the Synerise Design System, built on TipTap (ProseMirror).

## Installation

```
npm i @synerise/ds-rich-text
or
yarn add @synerise/ds-rich-text
```

## Usage

### HTML mode (default)

```tsx
import RichText from '@synerise/ds-rich-text';

<RichText
  label="Description"
  placeholder="Start typing..."
  value={html}
  onChange={(html) => setHtml(html)}
/>
```

### Document mode (Portable Block Model)

```tsx
import RichText from '@synerise/ds-rich-text';
import type { RichTextDocument } from '@synerise/ds-rich-text';

const [doc, setDoc] = useState<RichTextDocument>();

<RichText
  format="document"
  label="Article body"
  value={doc}
  onChange={(doc) => setDoc(doc)}
/>
```

### With image upload

```tsx
<RichText
  value={content}
  onChange={setContent}
  onImageUpload={async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/media/upload', { method: 'POST', body: formData });
    const { url } = await res.json();
    return url;
  }}
/>
```

### Limited toolbar

```tsx
<RichText
  toolbarFeatures={['bold', 'italic', 'link']}
  value={content}
  onChange={setContent}
/>
```

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| format | Output format — `'html'` emits string, `'document'` emits `RichTextDocument` | `'html' \| 'document'` | `'html'` |
| value | Controlled value (accepts both HTML string and `RichTextDocument`) | `string \| RichTextDocument` | - |
| defaultValue | Initial value for uncontrolled mode | `string \| RichTextDocument` | - |
| onChange | Called when content changes | `(value: string \| RichTextDocument) => void` | - |
| onEditorReady | Called with the TipTap Editor instance after mount | `(editor: Editor) => void` | - |
| placeholder | Placeholder text when editor is empty | `string` | - |
| readOnly | Makes the editor non-editable | `boolean` | `false` |
| disabled | Disables the editor (greyed out) | `boolean` | `false` |
| label | Label above the editor | `ReactNode` | - |
| tooltip | Tooltip content next to label | `ReactNode` | - |
| tooltipConfig | Full tooltip configuration | `TooltipProps` | - |
| description | Description text below editor | `ReactNode` | - |
| errorText | Error message below editor (triggers error styling) | `ReactNode` | - |
| height | Height of the editor area | `string \| number` | - |
| maxHeight | Max height before scrolling | `string \| number` | - |
| toolbarFeatures | Which toolbar buttons to show | `ToolbarFeature[]` | all features |
| hideToolbar | Hide the toolbar entirely | `boolean` | `false` |
| headingLevels | Available heading levels | `(1 \| 2 \| 3 \| 4 \| 5 \| 6)[]` | `[1, 2, 3]` |
| texts | Override i18n strings | `Partial<RichTextTexts>` | - |
| noBorder | Remove the border | `boolean` | `false` |
| autoFocus | Auto-focus the editor on mount | `boolean` | `false` |
| onImageUpload | Custom image upload handler; receives File, returns URL | `(file: File) => string \| Promise<string>` | - |
| style | Inline styles on wrapper | `CSSProperties` | - |
| className | Class name on wrapper | `string` | - |

### ToolbarFeature

```ts
'bold' | 'italic' | 'underline' | 'strikethrough' | 'heading' |
'bulletList' | 'orderedList' | 'link' | 'textAlign' | 'codeBlock' | 'image'
```

### RichTextTexts

Customisable user-facing labels:

| Property | Description | Default |
| --- | --- | --- |
| bold | Bold button tooltip | `'Bold'` |
| italic | Italic button tooltip | `'Italic'` |
| underline | Underline button tooltip | `'Underline'` |
| strikethrough | Strikethrough button tooltip | `'Strikethrough'` |
| heading | Heading button tooltip prefix | `'Heading'` |
| bulletList | Bullet list button tooltip | `'Bullet list'` |
| orderedList | Ordered list button tooltip | `'Ordered list'` |
| link | Link button tooltip | `'Link'` |
| alignLeft | Align left button tooltip | `'Align left'` |
| alignCenter | Align center button tooltip | `'Align center'` |
| alignRight | Align right button tooltip | `'Align right'` |
| codeBlock | Code block button tooltip | `'Code block'` |
| image | Image button tooltip | `'Image'` |
| linkPlaceholder | Link URL input placeholder | `'Enter URL...'` |
| linkConfirm | Link confirm button label | `'Apply'` |
| linkRemove | Link remove button label | `'Remove link'` |
| imagePlaceholder | Image URL input placeholder | `'Enter image URL...'` |
| imageConfirm | Image confirm button label | `'Insert'` |
| imageUpload | Image upload button label | `'Upload file'` |

## Block Model

The component can output a structured `RichTextDocument` instead of HTML when `format="document"` is set. This is an editor-agnostic JSON format suitable for database storage and independent rendering.

### Serializers

```ts
import {
  htmlToDocument,       // HTML string → RichTextDocument
  documentToHtml,       // RichTextDocument → HTML string
  tiptapJsonToDocument, // ProseMirror JSON → RichTextDocument
  documentToTiptapJson, // RichTextDocument → ProseMirror JSON
} from '@synerise/ds-rich-text';
```

### RichTextDocument structure

```json
{
  "type": "doc",
  "version": 1,
  "children": [
    {
      "type": "heading",
      "attrs": { "level": 2 },
      "children": [{ "type": "text", "text": "Title" }]
    },
    {
      "type": "paragraph",
      "children": [
        { "type": "text", "text": "Text with " },
        { "type": "text", "text": "bold", "marks": [{ "type": "bold" }] }
      ]
    }
  ]
}
```


