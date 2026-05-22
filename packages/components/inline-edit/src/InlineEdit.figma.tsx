// @ts-nocheck
import figma from '@figma/code-connect';

import InlineEdit from './InlineEdit';
import InlineSelect from './InlineSelect/InlineSelect';

const INLINE_EDIT_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=2211-36566&m=dev';

const INLINE_SELECT_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=2220-36836&m=dev';

figma.connect(InlineEdit, INLINE_EDIT_URL, {
  props: {
    value: figma.string('Text#342:0'),
    size: figma.enum('Size', {
      Small: 'small',
      Normal: 'normal',
      Large: 'large',
    }),
    disabled: figma.enum('State', {
      Default: undefined,
      Error: undefined,
      Disabled: true,
      State4: undefined,
      State5: undefined,
      State6: undefined,
    }),
    error: figma.enum('State', {
      Default: undefined,
      Error: true,
      Disabled: undefined,
      State4: undefined,
      State5: undefined,
      State6: undefined,
    }),
  },
  example: ({ value, size, disabled, error }) => (
    <InlineEdit
      size={size}
      disabled={disabled}
      error={error}
      input={{
        value,
        onChange: () => {},
      }}
    />
  ),
});

figma.connect(InlineSelect, INLINE_SELECT_URL, {
  props: {
    value: figma.string('Text#342:0'),
    size: figma.enum('Size', {
      Small: 'small',
      Normal: 'normal',
    }),
    disabled: figma.enum('State', {
      Default: undefined,
      Error: undefined,
      Disabled: true,
      Hover: undefined,
      Selected: undefined,
    }),
    error: figma.enum('State', {
      Default: undefined,
      Error: true,
      Disabled: undefined,
      Hover: undefined,
      Selected: undefined,
    }),
  },
  example: ({ value, size, disabled, error }) => (
    <InlineSelect
      size={size}
      disabled={disabled}
      error={error}
      input={{ value }}
      dataSource={[{ text: 'Option A' }, { text: 'Option B' }]}
    />
  ),
});
