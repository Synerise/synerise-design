import figma from '@figma/code-connect';

import Mapping from './Mapping';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=13212-17132&m=dev';

figma.connect(Mapping, FIGMA_URL, {
  variant: { Type: 'Default' },
  example: () => (
    <Mapping
      leftTitle="Source parameter"
      rightTitle="Target parameter"
      dataSource={[
        { id: 1, source: 'param_1', target: 'mapped_1' },
        { id: 2, source: 'param_2', target: 'mapped_2' },
        { id: 3, source: 'param_3', target: 'mapped_3' },
        { id: 4, source: 'param_4', target: 'mapped_4' },
        { id: 5, source: 'param_5', target: 'mapped_5' },
      ]}
      leftComponent={({ item }) => <span>{item.source}</span>}
      rightComponent={({ item }) => <span>{item.target}</span>}
    />
  ),
});

figma.connect(Mapping, FIGMA_URL, {
  variant: { Type: 'Bulk Action' },
  example: () => (
    <Mapping
      leftTitle="Source parameter"
      rightTitle="Target parameter"
      dataSource={[
        { id: 1, source: 'param_1', target: 'mapped_1' },
        { id: 2, source: 'param_2', target: 'mapped_2' },
        { id: 3, source: 'param_3', target: 'mapped_3' },
        { id: 4, source: 'param_4', target: 'mapped_4' },
        { id: 5, source: 'param_5', target: 'mapped_5' },
      ]}
      leftComponent={({ item }) => <span>{item.source}</span>}
      rightComponent={({ item }) => <span>{item.target}</span>}
      batchSelection={{
        onSelectionChange: () => {},
        actionButtons: null,
      }}
    />
  ),
});
