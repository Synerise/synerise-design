import figma from '@figma/code-connect';

import ItemsRoll from './ItemsRoll';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=579-9422&m=dev';

figma.connect(ItemsRoll, FIGMA_URL, {
  props: {
    itemsLabel: figma.string('Label'),
    onChangeSelection: figma.boolean('Add button', {
      true: () => {},
      false: undefined,
    }),
    hideSearch: figma.boolean('Search button', {
      true: false,
      false: true,
    }),
    actions: figma.boolean('Menu button', {
      true: [{ id: 'action-1', text: 'Action' }],
      false: undefined,
    }),
    useFooter: figma.boolean('Footer'),
  },
  example: ({
    itemsLabel,
    onChangeSelection,
    hideSearch,
    actions,
    useFooter,
  }) => (
    <ItemsRoll
      items={[
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
      ]}
      texts={{ itemsLabel }}
      onChangeSelection={onChangeSelection}
      hideSearch={hideSearch}
      actions={actions}
      useFooter={useFooter}
    />
  ),
});
