import React from 'react';

import { ObjectAvatar } from '@synerise/ds-avatar';
import Icon, { AddM, FileM, HashM } from '@synerise/ds-icon';
import type {
  Action,
  BaseItemType,
  LevelEntry,
  LoadLevelParams,
  MixedLoaderConfig,
  PathStep,
} from '@synerise/ds-item-picker';

export type MixedStoryItem = BaseItemType & {
  id: string;
  code: string;
  size?: 'default' | 'large';
  description?: string;
};

type TreeNode = {
  id: string;
  parentId: string | null;
  kind: 'folder' | 'item';
  name: string;
  code?: string;
  disabled?: boolean;
};

const ROOT_LABEL = 'All';

const folder = (id: string, parentId: string | null, name: string) => ({
  id,
  parentId,
  kind: 'folder' as const,
  name,
});

let codeCounter = 4800;
const item = (id: string, parentId: string | null, name: string) => ({
  id,
  parentId,
  kind: 'item' as const,
  name,
  code: `IT-${codeCounter++}`,
});

const TREE: TreeNode[] = [
  folder('f1', null, 'Folder 1'),
  folder('f1-1', 'f1', 'Folder 1.1'),
  folder('f1-1-1', 'f1-1', 'Folder 1.1.1'),
  folder('f1-1-1-1', 'f1-1-1', 'Folder 1.1.1.1'),
  item('i1-1-1-1-1', 'f1-1-1-1', 'Item 1.1.1.1.1'),
  item('i1-1-1', 'f1-1', 'Item 1.1.1'),
  item('i1-1-2', 'f1-1', 'Item 1.1.2'),
  folder('f1-2', 'f1', 'Folder 1.2'),
  item('i1-2-1', 'f1-2', 'Item 1.2.1'),
  item('i1-1', 'f1', 'Item 1.1'),
  item('i1-2', 'f1', 'Item 1.2'),
  folder('f2', null, 'Folder 2'),
  folder('f2-1', 'f2', 'Folder 2.1'),
  item('i2-1-1', 'f2-1', 'Item 2.1.1'),
  item('i2-1-2', 'f2-1', 'Item 2.1.2'),
  item('i2-1', 'f2', 'Item 2.1'),
  folder('f3', null, 'Folder 3'),
  ...[1, 2, 3, 4].map((n) => item(`i3-${n}`, 'f3', `Item 3.${n}`)),
  { ...folder('f4', null, 'Folder 4'), disabled: true },
  folder('f5', null, 'Folder 5'),
  folder('f6', null, 'Folder 6 (120 items)'),
  ...Array.from({ length: 120 }, (_, index) =>
    item(`i6-${index + 1}`, 'f6', `Item 6.${index + 1}`),
  ),
  ...[1, 2, 3, 4].map((n) => item(`i${n}`, null, `Item ${n}`)),
];

const byId = new Map(TREE.map((node) => [node.id, node]));

const pathOf = (folderId: string | null): PathStep[] => {
  const steps: PathStep[] = [];
  let current = folderId ? byId.get(folderId) : undefined;
  while (current) {
    steps.unshift({ id: current.id, text: current.name });
    current = current.parentId ? byId.get(current.parentId) : undefined;
  }
  return [{ id: null, text: ROOT_LABEL }, ...steps];
};

const locationOf = (node: TreeNode) =>
  pathOf(node.parentId)
    .map((step) => step.text)
    .join(' / ');

const isInside = (node: TreeNode, folderId: string): boolean => {
  const parent = node.parentId ? byId.get(node.parentId) : undefined;
  return Boolean(
    parent && (parent.id === folderId || isInside(parent, folderId)),
  );
};

const toItem = (node: TreeNode, large: boolean): MixedStoryItem => ({
  id: node.id,
  text: node.name,
  code: node.code ?? '',
  size: large ? 'large' : 'default',
  description: large && node.name.endsWith('.1') ? 'PNG · 1.3 MB' : undefined,
  prefixel: large ? (
    <ObjectAvatar
      size="medium"
      iconComponent={<Icon component={<FileM />} />}
    />
  ) : (
    <Icon component={<FileM />} />
  ),
  informationCardProps: {
    title: node.name,
    subtitle: node.id,
    propertyListItems: [
      { label: 'Location', value: locationOf(node) },
      { label: 'Code', value: node.code },
    ],
  },
});

const toEntry = (
  node: TreeNode,
  large: boolean,
  withLocation: boolean,
): LevelEntry<MixedStoryItem> => {
  const location = withLocation ? locationOf(node) : undefined;
  if (node.kind === 'folder') {
    return {
      type: 'folder',
      location,
      folder: {
        id: node.id,
        text: node.name,
        disabled: node.disabled,
        disabledReason: node.disabled ? 'Empty' : undefined,
        informationCardProps: {
          title: node.name,
          subtitle: node.id,
          propertyListItems: [{ label: 'Location', value: locationOf(node) }],
        },
      },
    };
  }
  return { type: 'item', location, item: toItem(node, large) };
};

const wait = (ms: number, abortController?: AbortController) =>
  new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(resolve, ms);
    abortController?.signal.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });

type SourceOptions = {
  rowSize?: 'default' | 'large';
  delay?: number;
  /** Fails the first load, so the error state and Refresh can be seen. */
  failFirstLoad?: boolean;
  limitPerPage?: number;
};

export const createMixedSource = ({
  rowSize = 'default',
  delay = 400,
  failFirstLoad = false,
  limitPerPage,
}: SourceOptions = {}): MixedLoaderConfig<MixedStoryItem> => {
  let shouldFail = failFirstLoad;
  const large = rowSize === 'large';
  const byName = (a: TreeNode, b: TreeNode) =>
    a.name.localeCompare(b.name, undefined, { numeric: true });

  const loadLevel = async ({
    folderId,
    searchQuery,
    searchKey,
    page,
    limit,
    abortController,
  }: LoadLevelParams) => {
    await wait(delay, abortController);
    if (shouldFail) {
      shouldFail = false;
      throw new Error('Load failed');
    }
    const needle = searchQuery.trim().toLowerCase();
    const nodes = needle
      ? TREE.filter((node) => folderId === null || isInside(node, folderId))
          .filter((node) =>
            searchKey === 'code' ? node.kind === 'item' : true,
          )
          .filter((node) =>
            (searchKey === 'code' ? (node.code ?? '') : node.name)
              .toLowerCase()
              .includes(needle),
          )
      : TREE.filter((node) => node.parentId === folderId);
    const ordered = [
      ...nodes.filter((node) => node.kind === 'folder').sort(byName),
      ...nodes.filter((node) => node.kind === 'item').sort(byName),
    ];
    return {
      entries: ordered
        .slice(page * limit, (page + 1) * limit)
        .map((node) => toEntry(node, large, Boolean(needle))),
      total: ordered.length,
      path: pathOf(folderId),
    };
  };

  return { loadLevel, rowSize, limitPerPage };
};

export const createRecents = (large = false): MixedStoryItem[] =>
  ['i6-118', 'i6-119', 'i6-120'].map((id) => {
    const node = byId.get(id) as TreeNode;
    return {
      ...toItem(node, large),
      description: large ? locationOf(node) : undefined,
    };
  });

export const SEARCH_BY_ACTION: Action = {
  id: 'search-by',
  actionType: 'searchBy',
  text: 'Search by',
  icon: <Icon component={<HashM />} />,
  searchParams: [
    {
      paramKey: 'code',
      paramListLabel: 'Code',
      paramKeyLabel: 'Code:',
      icon: <HashM />,
    },
  ],
};

export const MODULE_ACTIONS: Action[] = [
  {
    id: 'create',
    actionType: 'custom',
    text: 'Create item',
    icon: <Icon component={<AddM />} />,
    onClick: () => {},
  },
  {
    id: 'export',
    actionType: 'custom',
    text: 'Export list',
    showInList: false,
    onClick: () => {},
  },
];
