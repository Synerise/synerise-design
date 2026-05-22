// @ts-nocheck
import figma from '@figma/code-connect';

import SubtleForm from './SubtleForm';

const URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=16656-7455&m=dev';

figma.connect(SubtleForm, URL, {
  variant: { State: 'Default' },
  example: () => (
    <SubtleForm.TextArea
      label="Label"
      value=""
      placeholder="Placeholder"
      onChange={() => {}}
    />
  ),
});
