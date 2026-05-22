// @ts-nocheck
import figma from '@figma/code-connect';

import Popconfirm from './Popconfirm';

const POPCONFIRM_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=716-13536&m=dev';

figma.connect(Popconfirm, POPCONFIRM_URL, {
  props: {
    title: figma.string('Text Header'),
    description: figma.boolean('Show Description', {
      true: figma.string('Text Description'),
      false: undefined,
    }),
    icon: figma.boolean('Show Icon', {
      true: figma.instance('Icon'),
      false: undefined,
    }),
    hideButtons: figma.boolean('Show Actions', {
      true: undefined,
      false: true,
    }),
    cancelText: figma.boolean('Show Button 1', {
      true: 'Cancel',
      false: undefined,
    }),
    okText: figma.boolean('Show Button 2', {
      true: 'Confirm',
      false: undefined,
    }),
  },
  example: ({ title, description, icon, hideButtons, cancelText, okText }) => (
    <Popconfirm
      title={title}
      description={description}
      icon={icon}
      hideButtons={hideButtons}
      cancelText={cancelText}
      okText={okText}
      onConfirm={() => {}}
      onCancel={() => {}}
    >
      <button>Trigger</button>
    </Popconfirm>
  ),
});
