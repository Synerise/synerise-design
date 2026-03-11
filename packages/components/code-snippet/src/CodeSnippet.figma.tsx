import figma from '@figma/code-connect';

import CodeSnippet from './CodeSnippet';
import { CodeSnippetType, FontSize } from './CodeSnippet.types';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=725:13723&m=dev';

figma.connect(CodeSnippet, FIGMA_URL, {
  variant: { Size: 'Small' },
  example: () => (
    <CodeSnippet type={CodeSnippetType.SINGLE_LINE} fontSize={FontSize.SMALL}>
      {'code here'}
    </CodeSnippet>
  ),
});

figma.connect(CodeSnippet, FIGMA_URL, {
  variant: { Size: 'Large' },
  example: () => (
    <CodeSnippet type={CodeSnippetType.SINGLE_LINE} fontSize={FontSize.MEDIUM}>
      {'code here'}
    </CodeSnippet>
  ),
});

const FIGMA_URL_INLINE =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=725:13620&m=dev';

figma.connect(CodeSnippet, FIGMA_URL_INLINE, {
  example: () => (
    <CodeSnippet type={CodeSnippetType.INLINE}>{'code here'}</CodeSnippet>
  ),
});

const FIGMA_URL_MULTI =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=725:13726&m=dev';

figma.connect(CodeSnippet, FIGMA_URL_MULTI, {
  example: () => (
    <CodeSnippet type={CodeSnippetType.MULTI_LINE} colorSyntax>
      {'code here'}
    </CodeSnippet>
  ),
});
