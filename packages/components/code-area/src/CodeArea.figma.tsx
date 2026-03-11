import figma from '@figma/code-connect';

import CodeArea from './CodeArea';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=3143:21126&m=dev';

figma.connect(CodeArea, FIGMA_URL, {
  variant: { State: 'Default', Label: 'True', Border: 'True' },
  example: () => (
    <CodeArea
      label="Label"
      description="Description"
      currentSyntax="json"
      value=""
    />
  ),
});

figma.connect(CodeArea, FIGMA_URL, {
  variant: { State: 'Default', Label: 'False', Border: 'True' },
  example: () => <CodeArea currentSyntax="json" value="" />,
});

figma.connect(CodeArea, FIGMA_URL, {
  variant: { State: 'Default', Label: 'False', Border: 'False' },
  example: () => <CodeArea currentSyntax="json" value="" noBorder />,
});

figma.connect(CodeArea, FIGMA_URL, {
  variant: { State: 'Validated', Label: 'True', Border: 'True' },
  example: () => (
    <CodeArea
      label="Label"
      description="Description"
      currentSyntax="json"
      value=""
      errorText="Fill Code area"
    />
  ),
});

figma.connect(CodeArea, FIGMA_URL, {
  variant: { State: 'Validated', Label: 'False', Border: 'True' },
  example: () => (
    <CodeArea currentSyntax="json" value="" errorText="Fill Code area" />
  ),
});

figma.connect(CodeArea, FIGMA_URL, {
  variant: { State: 'Validated', Label: 'False', Border: 'False' },
  example: () => (
    <CodeArea
      currentSyntax="json"
      value=""
      errorText="Fill Code area"
      noBorder
    />
  ),
});

figma.connect(CodeArea, FIGMA_URL, {
  variant: { State: 'Read only', Label: 'False', Border: 'True' },
  example: () => <CodeArea currentSyntax="json" value="" readOnly />,
});

figma.connect(CodeArea, FIGMA_URL, {
  variant: { State: 'Read only', Label: 'False', Border: 'False' },
  example: () => <CodeArea currentSyntax="json" value="" readOnly noBorder />,
});
