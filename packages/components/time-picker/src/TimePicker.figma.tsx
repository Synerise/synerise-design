// @ts-nocheck
import figma from '@figma/code-connect';

import TimePicker from './TimePicker';

const TIME_PICKER_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=12890-56483&m=dev';

figma.connect(TimePicker, TIME_PICKER_URL, {
  variant: { State: 'Default' },
  example: () => <TimePicker value={new Date()} onChange={() => {}} />,
});
