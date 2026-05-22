import figma from '@figma/code-connect';

import Dropdown from './Dropdown';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=2104-37656&m=dev';

figma.connect(Dropdown, FIGMA_URL, {
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      Custom: 588,
    }),
    showSearch: figma.boolean('Show Search', {
      true: <Dropdown.SearchInput placeholder="Search" />,
      false: undefined,
    }),
    showNavigation: figma.boolean('Show Navigation', {
      true: <Dropdown.BackAction label="Folder Name" onClick={() => {}} />,
      false: undefined,
    }),
    showFooter: figma.boolean('Show Footer', {
      true: <span>{'<Footer />'}</span>,
      false: undefined,
    }),
  },
  example: ({ size, showSearch, showNavigation, showFooter }) => (
    <Dropdown
      open
      size={size}
      overlay={
        <>
          {showSearch}
          {showNavigation}
          <Dropdown.MenuWrapper>{'<MenuItems />'}</Dropdown.MenuWrapper>
        </>
      }
      footer={showFooter}
    >
      <span>{'<Trigger />'}</span>
    </Dropdown>
  ),
});
