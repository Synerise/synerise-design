import figma from '@figma/code-connect';

import FormatPicker from './FormatPicker';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=2564-17083&m=dev';

figma.connect(FormatPicker, FIGMA_URL, {
  example: () => (
    <FormatPicker
      value={19000.7}
      format={{
        dataFormat: 'numeric',
        currency: 'USD',
        useSeparator: false,
        compactNumbers: false,
        fixedLength: 2,
      }}
      onDataFormatChange={() => {}}
      onCurrencyChange={() => {}}
      onUseSeparatorChange={() => {}}
      onCompactNumbersChange={() => {}}
      onFixedLengthChange={() => {}}
      onSetDefault={() => {}}
    />
  ),
});
