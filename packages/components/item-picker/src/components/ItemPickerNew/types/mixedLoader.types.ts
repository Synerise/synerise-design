import type { ReactNode } from 'react';

import type { InformationCardProps } from '@synerise/ds-information-card';

import type { BaseItemType } from './baseItemSectionType.types';

export type FolderNode = {
  id: string;
  text: string;
  /** Second line of a large row. */
  description?: ReactNode;
  disabled?: boolean;
  /** Shown on the right of a disabled default row, or as the second line of a large one. */
  disabledReason?: ReactNode;
  informationCardProps?: InformationCardProps;
};

export type LevelEntry<ItemType extends BaseItemType> = (
  | { type: 'folder'; folder: FolderNode }
  | { type: 'item'; item: ItemType }
) & {
  /** Where a search result sits; the second line of a large row in search results. */
  location?: ReactNode;
};

/** `id: null` is the root. */
export type PathStep = { id: string | null; text: string };

export type LoadLevelParams = {
  /** `null` is the root. */
  folderId: string | null;
  /** Empty: the level itself. Otherwise: matches from this level and every level below it. */
  searchQuery: string;
  searchKey?: string;
  page: number;
  limit: number;
  abortController?: AbortController;
};

export type LoadLevelResult<ItemType extends BaseItemType> = {
  /** One page, folders first. */
  entries: LevelEntry<ItemType>[];
  total: number;
  /** From the root to `folderId`. */
  path: PathStep[];
};

export type MixedLoaderConfig<ItemType extends BaseItemType> = {
  loadLevel: (params: LoadLevelParams) => Promise<LoadLevelResult<ItemType>>;
  /** @default 30 */
  limitPerPage?: number;
  /** @default 'default' */
  rowSize?: 'default' | 'large';
};
