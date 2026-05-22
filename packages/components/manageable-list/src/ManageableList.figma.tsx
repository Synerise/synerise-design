// @ts-nocheck
import figma from '@figma/code-connect';

import ContentItem from './Item/ContentItem/ContentItem';
import ManageableList from './ManageableList';

const MANAGEABLE_LIST_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=13950-15282&m=dev';

const CONTENT_ITEM_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=656-14582&m=dev';

const DEFAULT_ITEMS = [
  { id: '1', name: 'Basic', canUpdate: true, canDelete: true },
  { id: '2', name: 'My folder', canUpdate: true, canDelete: true },
  { id: '3', name: 'My folder 2', canUpdate: true, canDelete: true },
];

const CONTENT_ITEMS = [
  {
    id: '1',
    name: 'Welcome email',
    canUpdate: true,
    canDelete: true,
    content: <div>Content body</div>,
  },
  {
    id: '2',
    name: 'Promo email',
    canUpdate: true,
    canDelete: true,
    content: <div>Content body</div>,
  },
];

const CONTENT_ITEMS_LARGE = [
  {
    id: '1',
    name: 'Welcome flow',
    uniqueKey: 'WF-001',
    canUpdate: true,
    canDelete: true,
    content: <div>Content body</div>,
  },
  {
    id: '2',
    name: 'Onboarding flow',
    uniqueKey: 'OF-002',
    canUpdate: true,
    canDelete: true,
    content: <div>Content body</div>,
  },
];

const FILTER_ITEMS = [
  { id: '1', name: 'Segment A', selected: true },
  { id: '2', name: 'Segment B' },
  { id: '3', name: 'Segment C' },
];

const CONTENT_ITEM_EXAMPLE = {
  id: '1',
  name: 'Item name',
  canUpdate: true,
  canDelete: true,
  canDuplicate: true,
  content: <div>Content body</div>,
};

figma.connect(ManageableList, MANAGEABLE_LIST_URL, {
  variant: { Stories: 'Default' },
  example: () => (
    <ManageableList
      type="default"
      items={DEFAULT_ITEMS}
      loading={false}
      visibleItemsLimit={5}
      onItemAdd={({ name }) => {}}
      onItemEdit={({ id, name }) => {}}
      onItemRemove={({ id }) => {}}
    />
  ),
});

figma.connect(ManageableList, MANAGEABLE_LIST_URL, {
  variant: { Stories: 'Empty List' },
  example: () => (
    <ManageableList
      type="default"
      items={[]}
      loading={false}
      onItemAdd={({ name }) => {}}
    />
  ),
});

figma.connect(ManageableList, MANAGEABLE_LIST_URL, {
  variant: { Stories: 'With Custom Toggle Button' },
  example: () => (
    <ManageableList
      type="default"
      items={DEFAULT_ITEMS}
      loading={false}
      visibleItemsLimit={5}
      onItemAdd={({ name }) => {}}
      renderCustomToggleButton={({
        onClick,
        allItemsVisible,
        total,
        limit,
      }) => (
        <button onClick={onClick}>
          {allItemsVisible
            ? `Show ${total - limit} less`
            : `Show ${total - limit} more`}
        </button>
      )}
    />
  ),
});

figma.connect(ManageableList, MANAGEABLE_LIST_URL, {
  variant: { Stories: 'Content Items List' },
  example: () => (
    <ManageableList
      type="content"
      items={CONTENT_ITEMS}
      loading={false}
      onItemAdd={() => {}}
      onItemEdit={({ id, name }) => {}}
      onItemRemove={({ id }) => {}}
      onItemDuplicate={({ id }) => {}}
    />
  ),
});

figma.connect(ManageableList, MANAGEABLE_LIST_URL, {
  variant: { Stories: 'Content Items List Sortable' },
  example: () => (
    <ManageableList
      type="content"
      items={CONTENT_ITEMS}
      loading={false}
      onItemAdd={() => {}}
      onItemEdit={({ id, name }) => {}}
      onItemRemove={({ id }) => {}}
      onItemDuplicate={({ id }) => {}}
      onChangeOrder={(newOrder) => {}}
    />
  ),
});

figma.connect(ManageableList, MANAGEABLE_LIST_URL, {
  variant: { Stories: 'Content Items Large' },
  example: () => (
    <ManageableList
      type="content-large"
      items={CONTENT_ITEMS_LARGE}
      loading={false}
      onItemAdd={() => {}}
      onItemEdit={({ id, name }) => {}}
      onItemRemove={({ id }) => {}}
      onItemDuplicate={({ id }) => {}}
    />
  ),
});

figma.connect(ManageableList, MANAGEABLE_LIST_URL, {
  variant: { Stories: 'Content Items Large Draggable' },
  example: () => (
    <ManageableList
      type="content-large"
      items={CONTENT_ITEMS_LARGE}
      loading={false}
      onItemAdd={() => {}}
      onItemEdit={({ id, name }) => {}}
      onItemRemove={({ id }) => {}}
      onItemDuplicate={({ id }) => {}}
      onChangeOrder={(newOrder) => {}}
    />
  ),
});

figma.connect(ManageableList, MANAGEABLE_LIST_URL, {
  variant: { Stories: 'Filter Items List' },
  example: () => (
    <ManageableList
      type="filter"
      items={FILTER_ITEMS}
      loading={false}
      selectedItemId="1"
      onItemSelect={({ id }) => {}}
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'Default', Background: 'White', Size: 'Default' },
  props: {
    draggable: figma.boolean('Show Grabber#657:0'),
    onRemove: figma.boolean('Show Crud#657:9', {
      true: () => {},
      false: undefined,
    }),
  },
  example: ({ draggable, onRemove }) => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      draggable={draggable}
      onRemove={onRemove}
      onUpdate={({ id, name }) => {}}
      onDuplicate={({ id }) => {}}
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'Default', Background: 'Grey', Size: 'Default' },
  props: {
    draggable: figma.boolean('Show Grabber#657:0'),
    onRemove: figma.boolean('Show Crud#657:9', {
      true: () => {},
      false: undefined,
    }),
  },
  example: ({ draggable, onRemove }) => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      greyBackground
      draggable={draggable}
      onRemove={onRemove}
      onUpdate={({ id, name }) => {}}
      onDuplicate={({ id }) => {}}
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'Default', Background: 'White', Size: 'Large' },
  props: {
    draggable: figma.boolean('Show Grabber#657:0'),
    onRemove: figma.boolean('Show Crud#657:9', {
      true: () => {},
      false: undefined,
    }),
  },
  example: ({ draggable, onRemove }) => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      size="large"
      draggable={draggable}
      onRemove={onRemove}
      onUpdate={({ id, name }) => {}}
      onDuplicate={({ id }) => {}}
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'Default', Background: 'Grey', Size: 'Large' },
  props: {
    draggable: figma.boolean('Show Grabber#657:0'),
    onRemove: figma.boolean('Show Crud#657:9', {
      true: () => {},
      false: undefined,
    }),
  },
  example: ({ draggable, onRemove }) => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      size="large"
      greyBackground
      draggable={draggable}
      onRemove={onRemove}
      onUpdate={({ id, name }) => {}}
      onDuplicate={({ id }) => {}}
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'Selected', Background: 'White', Size: 'Default' },
  example: () => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      selected
      onSelect={({ id }) => {}}
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'Selected', Background: 'Grey', Size: 'Default' },
  example: () => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      selected
      greyBackground
      onSelect={({ id }) => {}}
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'expand', Background: 'White', Size: 'Default' },
  example: () => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      expanded
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'expand', Background: 'Grey', Size: 'Default' },
  example: () => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      expanded
      greyBackground
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'expand', Background: 'White', Size: 'Large' },
  example: () => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      expanded
      size="large"
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'expand', Background: 'Grey', Size: 'Large' },
  example: () => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      expanded
      greyBackground
      size="large"
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'expand - selected', Background: 'White', Size: 'Default' },
  example: () => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      expanded
      selected
      onSelect={({ id }) => {}}
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'expand - selected', Background: 'Grey', Size: 'Default' },
  example: () => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      expanded
      selected
      greyBackground
      onSelect={({ id }) => {}}
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'Disabled', Background: 'White', Size: 'Default' },
  example: () => (
    <ContentItem
      item={{ ...CONTENT_ITEM_EXAMPLE, disabled: true }}
      texts={{}}
      setIsExpanded={() => {}}
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'Disabled', Background: 'Grey', Size: 'Default' },
  example: () => (
    <ContentItem
      item={{ ...CONTENT_ITEM_EXAMPLE, disabled: true }}
      texts={{}}
      setIsExpanded={() => {}}
      greyBackground
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'Disabled', Background: 'White', Size: 'Large' },
  example: () => (
    <ContentItem
      item={{ ...CONTENT_ITEM_EXAMPLE, disabled: true }}
      texts={{}}
      setIsExpanded={() => {}}
      size="large"
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'Disabled', Background: 'Grey', Size: 'Large' },
  example: () => (
    <ContentItem
      item={{ ...CONTENT_ITEM_EXAMPLE, disabled: true }}
      texts={{}}
      setIsExpanded={() => {}}
      greyBackground
      size="large"
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'Grabbed', Background: 'White', Size: 'Default' },
  example: () => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      draggable
      isDragOverlay
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'Grabbed', Background: 'Grey', Size: 'Default' },
  example: () => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      draggable
      isDragOverlay
      greyBackground
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'Grabbed', Background: 'White', Size: 'Large' },
  example: () => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      draggable
      isDragOverlay
      size="large"
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'Grabbed', Background: 'Grey', Size: 'Large' },
  example: () => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      draggable
      isDragOverlay
      greyBackground
      size="large"
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'placeholder', Background: 'White', Size: 'Default' },
  example: () => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      draggable
      isDragPlaceholder
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'placeholder', Background: 'Grey', Size: 'Default' },
  example: () => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      draggable
      isDragPlaceholder
      greyBackground
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'placeholder', Background: 'White', Size: 'Large' },
  example: () => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      draggable
      isDragPlaceholder
      size="large"
    />
  ),
});

figma.connect(ContentItem, CONTENT_ITEM_URL, {
  variant: { State: 'placeholder', Background: 'Grey', Size: 'Large' },
  example: () => (
    <ContentItem
      item={CONTENT_ITEM_EXAMPLE}
      texts={{}}
      setIsExpanded={() => {}}
      draggable
      isDragPlaceholder
      greyBackground
      size="large"
    />
  ),
});
