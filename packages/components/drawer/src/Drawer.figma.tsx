import figma from '@figma/code-connect';

import Drawer from './Drawer';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=805-15260&m=dev';

figma.connect(Drawer, FIGMA_URL, {
  props: {
    headerText: figma.string('Header Text'),
    showTabs: figma.boolean('Show Tabs'),
    showBack: figma.boolean('Show Back', {
      true: (
        <Drawer.DrawerHeaderBack>{'<BackButton />'}</Drawer.DrawerHeaderBack>
      ),
      false: undefined,
    }),
    showAvatar: figma.boolean('Show Avatar', {
      true: <span>{'<Avatar />'}</span>,
      false: undefined,
    }),
    showEditIcon: figma.boolean('Show Edit Icon', {
      true: <span>{'<EditIcon />'}</span>,
      false: undefined,
    }),
  },
  example: ({ headerText, showTabs, showBack, showAvatar, showEditIcon }) => (
    <Drawer open placement="right" width={676} onClose={() => {}}>
      <Drawer.DrawerHeaderWithoutPadding>
        <Drawer.DrawerHeader>
          <Drawer.DrawerHeaderBar>
            {showBack}
            {showAvatar}
            <span>{headerText}</span>
            {showEditIcon}
          </Drawer.DrawerHeaderBar>
        </Drawer.DrawerHeader>
        {showTabs}
      </Drawer.DrawerHeaderWithoutPadding>
      <Drawer.DrawerBody>
        <Drawer.DrawerContent>{'Content'}</Drawer.DrawerContent>
      </Drawer.DrawerBody>
    </Drawer>
  ),
});
