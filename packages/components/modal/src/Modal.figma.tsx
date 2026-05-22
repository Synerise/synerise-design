// @ts-nocheck
import figma from '@figma/code-connect';

import Modal from './Modal';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=328-8946&m=dev';

figma.connect(Modal, FIGMA_URL, {
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      'Extra Large': 'extraLarge',
    }),
    title: figma.boolean('showHeader', {
      true: 'Modal Header',
      false: undefined,
    }),
  },
  example: ({ size, title }) => (
    <Modal
      open
      size={size}
      title={title}
      okText="Button"
      cancelText="Cancel"
      onOk={() => {}}
      onCancel={() => {}}
    >
      Modal content
    </Modal>
  ),
});
