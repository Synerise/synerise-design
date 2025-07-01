import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { itemSizes } from '@synerise/ds-list-item';

import type {
  BaseItemType,
  BaseSectionType,
  BaseSectionTypeWithFolders,
  ItemLoaderMeta,
  SearchActionType,
  SearchParamConfig,
} from '../../ItemPickerNew/ItemPickerNew.types';
import type {
  ItemPickerListProps,
  ItemPickerListTexts,
} from '../ItemPickerList.types';
import {
  FIRST_PAGE,
  GET_ITEM_KEY,
  ITEMS_PER_PAGE,
  ITEMS_PER_SECTION,
  ITEMS_PER_SECTION_IN_SEARCH,
  ITEM_SIZE,
  SECTION_HEADER_HEIGHT,
} from '../constants';
import { isItems, isItemsConfig, isWithOutSections } from '../utils';
import { getSearchActionItems } from '../utils/getSearchActionItems';
import { useFlattenFolders } from './useFlattenFolders';
import {
  getActionItems,
  getFolderItems,
  getItems,
  getRecentItems,
  getSectionActionItems,
  matchesSearchQuery,
} from './useItemsInSections.utils';

const getSectionHeight = (itemsCount: number, withTitle: boolean) => {
  const itemsHeight = itemsCount * ITEM_SIZE[itemSizes.DEFAULT];
  const titleHeight = withTitle && itemsCount ? ITEM_SIZE.title : 0;
  return itemsHeight + titleHeight;
};

type ItemsInSectionsType<
  ItemType extends BaseItemType,
  SectionType extends BaseSectionType | undefined,
> = {
  items: ItemPickerListProps<ItemType, SectionType>['items'];
  texts: ItemPickerListTexts;
  selectedItem?: ItemType;
  sections?: SectionType extends BaseSectionType
    ? BaseSectionTypeWithFolders<SectionType>[]
    : undefined;
  recents?: ItemPickerListProps<ItemType, SectionType>['recents'];
  actions?: ItemPickerListProps<ItemType, SectionType>['actions'];
  searchQuery?: string;
  handleItemSelect?: (item: ItemType) => void;
  onSectionChange?: SectionType extends BaseSectionType
    ? (section?: BaseSectionTypeWithFolders<SectionType>) => void
    : undefined;
  getItemKey?: (item: ItemType) => string | number;
  showItemsSectionLabel: boolean;
  changeSearchQuery: (query: string) => void;
};
const RENDER_MODES = {
  LIST_ITEMS_IN_SECTIONS: 'ITEMS_IN_SECTIONS',
  LIST_FOLDERS_IN_SECTIONS: 'LIST_FOLDERS_IN_SECTION',
  LIST_ITEMS: 'LIST_ITEMS',
};
export const useItemsInSections = <
  ItemType extends BaseItemType,
  SectionType extends BaseSectionType | undefined,
>({
  items,
  texts,
  selectedItem,
  sections,
  recents,
  actions,
  searchQuery,
  handleItemSelect,
  onSectionChange,
  getItemKey = GET_ITEM_KEY,
  showItemsSectionLabel,
  changeSearchQuery,
}: ItemsInSectionsType<ItemType, SectionType>) => {
  const [currentSection, setCurrentSection] = useState<
    SectionType | BaseSectionType | undefined
  >();
  const [previousSection, setPreviousSection] = useState<
    SectionType | BaseSectionType | undefined
  >();

  const [searchActionSection, setSearchActionSection] = useState<
    SearchActionType | undefined
  >();
  const [searchParamConfig, setSearchParamConfig] = useState<
    SearchParamConfig | undefined
  >();

  const {
    currentSectionHasFolders,
    currentFolders,
    parentFolder,
    currentPath,
  } = useFlattenFolders({
    currentSection,
    sections,
  });

  const requestIdRef = useRef<string>();
  const loadedPage = useRef(FIRST_PAGE);
  const metaRef = useRef<Record<string, ItemLoaderMeta>>({});
  const sectionTotals = useRef<Record<string, number>>({});
  const abortControllerRef = useRef<AbortController>();
  const isFixedItemsList = isItems(items) || isItemsConfig(items);
  const [contentHeight, setContentHeight] = useState<number | undefined>();
  const [isInitialDataLoaded, setIsInitialDataLoaded] =
    useState(isFixedItemsList);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isLoadingMoreError, setIsLoadingMoreError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoadedAll, setIsLoadedAll] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState<number>();

  const [currentItems, setCurrentItems] = useState<ItemType[]>(() => {
    if (isFixedItemsList) {
      const fixedItems = isItemsConfig(items) ? items.items : items;
      if (searchQuery) {
        return fixedItems.filter(
          (item) => item.text && matchesSearchQuery(item.text, searchQuery),
        );
      }
      return fixedItems;
    }
    return [];
  });
  const listActions =
    searchQuery === '/' && !searchActionSection && !searchParamConfig;
  const hasSearchQuery = !!searchQuery;
  const hasCurrentSection = !!currentSection;
  const hasSections = !isWithOutSections(sections);
  const hasSectionsAndFolders = useMemo(
    () => hasSections && sections?.some((section) => section.folders?.length),
    [hasSections, sections],
  );

  const itemsLimitPerSection = useMemo(() => {
    const fallbackLimit = searchQuery
      ? ITEMS_PER_SECTION_IN_SEARCH
      : ITEMS_PER_SECTION;
    if (isFixedItemsList) {
      return isItemsConfig(items)
        ? (items.limitPerSection ?? fallbackLimit)
        : fallbackLimit;
    }
    return items.limitPerSection ?? fallbackLimit;
  }, [isFixedItemsList, searchQuery, items]);

  const { listRenderingMode } = useMemo(() => {
    if (hasSectionsAndFolders) {
      if (hasCurrentSection) {
        if (!currentSectionHasFolders) {
          return { listRenderingMode: RENDER_MODES.LIST_ITEMS };
        }
        return { listRenderingMode: RENDER_MODES.LIST_ITEMS_IN_SECTIONS };
      }

      return {
        listRenderingMode: hasSearchQuery
          ? RENDER_MODES.LIST_ITEMS_IN_SECTIONS
          : RENDER_MODES.LIST_FOLDERS_IN_SECTIONS,
      };
    }
    if (hasSections && !hasCurrentSection) {
      return { listRenderingMode: RENDER_MODES.LIST_ITEMS_IN_SECTIONS };
    }
    return { listRenderingMode: RENDER_MODES.LIST_ITEMS };
  }, [
    hasCurrentSection,
    hasSections,
    hasSearchQuery,
    hasSectionsAndFolders,
    currentSectionHasFolders,
  ]);

  const globalActionsLength =
    actions?.filter((action) => !action.sectionId).length || 0;
  const recentsLength = recents?.length || 0;
  const currentItemsLength = currentItems.length;

  const resetCurrentSection = useCallback(() => {
    setCurrentSection(undefined);
    setPreviousSection(undefined);
  }, []);

  const goBack = useCallback(() => {
    if (searchActionSection) {
      setSearchActionSection(undefined);
      return;
    }
    if (searchQuery) {
      setCurrentSection(previousSection);
      setPreviousSection(undefined);
      return;
    }
    if (parentFolder) {
      setCurrentSection(parentFolder);
      return;
    }
    setCurrentSection(undefined);
  }, [searchActionSection, searchQuery, parentFolder, previousSection]);

  const handleCurrentSectionChange = useCallback(
    (section?: SectionType | BaseSectionType) => {
      setPreviousSection(currentSection);
      setCurrentSection(section);
    },
    [currentSection],
  );

  const handleSectionChange = useCallback(
    (section?: SectionType | BaseSectionType) => {
      handleCurrentSectionChange(section);

      onSectionChange?.(section);
    },
    [onSectionChange, handleCurrentSectionChange],
  );

  const getLargestSectionHeight = useCallback(() => {
    const itemsPerSection: Record<string, Record<string, number>> = {};

    currentItems.forEach((item) => {
      if (!item.sectionId) {
        return;
      }
      if (!itemsPerSection[item.sectionId]) {
        itemsPerSection[item.sectionId] = {
          items: 0,
          actions: 0,
        };
      }
      itemsPerSection[item.sectionId].items += ITEM_SIZE[itemSizes.DEFAULT];
    });
    if (actions) {
      actions.forEach((item) => {
        if (!item.sectionId) {
          return;
        }
        if (!itemsPerSection[item.sectionId]) {
          itemsPerSection[item.sectionId] = {
            items: 0,
            actions: 0,
          };
        }
        itemsPerSection[item.sectionId].actions += ITEM_SIZE[itemSizes.DEFAULT];
      });
    }
    const largestSectionHeight = Object.values(itemsPerSection).reduce(
      (maxHeight, sectionData) => {
        const sectionHeight =
          sectionData.actions +
          sectionData.items +
          (+Boolean(sectionData.actions) + +Boolean(sectionData.items)) *
            ITEM_SIZE.title;
        return Math.max(maxHeight, sectionHeight);
      },
      0,
    );

    return largestSectionHeight + SECTION_HEADER_HEIGHT;
  }, [currentItems, actions]);

  const calculatedContentHeight: number | undefined = useMemo(() => {
    if (isFixedItemsList && !searchQuery && !currentSection) {
      const globalActionsHeight = getSectionHeight(
        globalActionsLength,
        !!globalActionsLength,
      );
      const recentHeight = getSectionHeight(recentsLength, !!recentsLength);

      if (!hasSections) {
        const mainItemsHeight = getSectionHeight(
          currentItemsLength,
          showItemsSectionLabel || !!(globalActionsHeight || recentHeight),
        );
        return mainItemsHeight + globalActionsHeight + recentHeight;
      }

      const largestSectionHeight = getLargestSectionHeight();

      if (hasSectionsAndFolders) {
        const initialViewHeight =
          globalActionsHeight +
          recentHeight +
          ITEM_SIZE.title *
            (sections.length +
              sections.reduce(
                (folderCount, section) =>
                  folderCount + (section.folders?.length || 0),
                0,
              ));
        return Math.max(initialViewHeight, largestSectionHeight);
      }
      // sections but no folders
      const initialViewHeight =
        globalActionsHeight +
        recentHeight +
        ITEM_SIZE.title * sections.length +
        getSectionHeight(
          currentItemsLength,
          showItemsSectionLabel || !!(globalActionsHeight || recentHeight),
        );
      return Math.max(initialViewHeight, largestSectionHeight);
    }
    return undefined;
  }, [
    isFixedItemsList,
    searchQuery,
    currentSection,
    globalActionsLength,
    recentsLength,
    hasSections,
    getLargestSectionHeight,
    hasSectionsAndFolders,
    sections,
    currentItemsLength,
    showItemsSectionLabel,
  ]);

  const isSelected = useCallback(
    (item: ItemType) => {
      return !!(selectedItem && getItemKey(item) === getItemKey(selectedItem));
    },
    [getItemKey, selectedItem],
  );

  const loadItems = useCallback(async () => {
    if (isFixedItemsList || listActions || searchActionSection) {
      return;
    }
    setIsLoading(true);
    setIsLoadingError(false);

    const currentRequestId = crypto.randomUUID();
    requestIdRef.current = currentRequestId;

    if (listRenderingMode === RENDER_MODES.LIST_ITEMS) {
      const sectionId = currentSection?.id || 'DEFAULT';
      try {
        const { items: fetchedItems, meta } = await items.loadItems({
          page: FIRST_PAGE,
          searchQuery,
          sectionId,
          limit: items.limitPerPage || ITEMS_PER_PAGE,
          meta: undefined,
          abortController: abortControllerRef.current,
          searchKey: searchParamConfig?.paramKey,
        });
        if (currentRequestId !== requestIdRef.current) {
          return;
        }
        setIsLoading(false);
        loadedPage.current = FIRST_PAGE;
        metaRef.current[sectionId] = meta;
        setIsInitialDataLoaded(true);
        setCurrentItems(fetchedItems);
      } catch (_event) {
        setIsLoading(false);
        setIsInitialDataLoaded(true);
        setIsLoadingError(true);
      }
      return;
    }

    let fetchedItems: ItemType[] = [];

    const requests =
      listRenderingMode === RENDER_MODES.LIST_FOLDERS_IN_SECTIONS
        ? [Promise.resolve()]
        : currentFolders?.map((folder) => {
            return items
              .loadItems({
                page: FIRST_PAGE,
                searchQuery,
                limit: (items.limitPerSection || ITEMS_PER_SECTION) + 1,
                sectionId: folder.id,
                meta: undefined,
                abortController: abortControllerRef.current,
                searchKey: searchParamConfig?.paramKey,
              })
              .then(({ items: sectionItems, total, meta }) => {
                metaRef.current[folder.id] = meta;
                sectionTotals.current[folder.id] = total;
                fetchedItems = [...fetchedItems, ...sectionItems];
              });
          });
    try {
      const results = requests ? await Promise.allSettled(requests) : [];
      if (currentRequestId !== requestIdRef.current) {
        return;
      }
      setIsLoading(false);
      setIsInitialDataLoaded(true);
      if (results.every((result) => result.status === 'fulfilled')) {
        setCurrentItems(fetchedItems);
        return;
      }
      setIsLoadingError(true);
    } catch (_event) {
      setIsLoading(false);
      setIsInitialDataLoaded(true);
      setIsLoadingError(true);
    }
  }, [
    searchParamConfig,
    currentSection,
    isFixedItemsList,
    currentFolders,
    listRenderingMode,
    items,
    listActions,
    searchQuery,
    searchActionSection,
  ]);

  useEffect(() => {
    if (listActions) {
      return;
    }
    if (isFixedItemsList) {
      const allItems = isItemsConfig(items) ? items.items : items;
      const itemsInSection =
        currentSection && !currentSectionHasFolders
          ? allItems.filter((item) => item.sectionId === currentSection.id)
          : allItems;
      if (searchQuery) {
        const matchingItems = itemsInSection.filter((item) => {
          const matchValue = searchParamConfig
            ? String(item[searchParamConfig.paramKey as keyof ItemType])
            : item.text;
          return matchValue && matchesSearchQuery(matchValue, searchQuery);
        });
        setCurrentItems(matchingItems);
        return;
      }
      setCurrentItems(itemsInSection);
    }
  }, [
    isFixedItemsList,
    isLoading,
    currentSection,
    isLoadingError,
    currentSectionHasFolders,
    currentItemsLength,
    items,
    listActions,
    searchQuery,
    searchParamConfig,
  ]);

  useEffect(() => {
    loadedPage.current = FIRST_PAGE;
    metaRef.current = {};
    setIsLoadedAll(false);
    setIsLoadingMore(false);
    sectionTotals.current = {};
    if (!isFixedItemsList) {
      if (!listActions) {
        loadItems();
      }
    }
    return () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentSection,
    isFixedItemsList,
    searchQuery,
    listActions,
    refreshTrigger,
  ]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (!hasSearchQuery && !hasCurrentSection && calculatedContentHeight) {
      timeout = setTimeout(() => setContentHeight(calculatedContentHeight), 50);
    }
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [calculatedContentHeight, hasCurrentSection, hasSearchQuery]);

  const hasInfiniteScroll =
    !listActions &&
    !isFixedItemsList &&
    listRenderingMode === RENDER_MODES.LIST_ITEMS;

  const refreshItems = useMemo(() => {
    if (!isFixedItemsList) {
      return () => setRefreshTrigger(Date.now());
    }
    return undefined;
  }, [isFixedItemsList]);

  const handleScrollEndReach = useCallback(() => {
    if (hasInfiniteScroll) {
      const sectionId = currentSection?.id || 'DEFAULT';
      if (isLoadedAll || isLoadingMore) {
        return;
      }
      setIsLoadingMore(true);
      items
        .loadItems({
          page: loadedPage.current + 1,
          limit: items.limitPerPage || ITEMS_PER_PAGE,
          searchQuery,
          sectionId: currentSection?.id,
          meta: metaRef.current[sectionId],
          searchKey: searchParamConfig?.paramKey,
        })
        .then(({ items: fetchedItems, total, meta }) => {
          sectionTotals.current[sectionId] = total;
          metaRef.current[sectionId] = meta;
          setIsLoadingMore(false);
          setIsLoadingMoreError(false);
          if (
            sectionTotals.current[sectionId] <=
            (loadedPage.current + 2) * (items.limitPerPage || ITEMS_PER_PAGE)
          ) {
            setIsLoadedAll(true);
          }
          loadedPage.current += 1;
          setCurrentItems([...currentItems, ...fetchedItems]);
        })
        .catch(() => {
          setIsLoadingMore(false);
          setIsLoadingMoreError(true);
        });
    }
  }, [
    searchParamConfig,
    isLoadingMore,
    hasInfiniteScroll,
    currentSection?.id,
    isLoadedAll,
    items,
    searchQuery,
    currentItems,
  ]);

  const mergedItemsList = useMemo(() => {
    if (searchActionSection) {
      return getSearchActionItems({
        action: searchActionSection,
        setSearchActionSection,
        setSearchParamConfig,
        searchQuery,
        changeSearchQuery,
      });
    }

    if (listActions) {
      return getActionItems({
        actions,
        texts,
        sectionId: currentSection?.id,
        setSearchActionSection,
        changeSearchQuery,
      });
    }
    const globalActions = getSectionActionItems({
      actions,
      texts,
      searchQuery,
      sectionId: undefined,
      setSearchActionSection,
      changeSearchQuery,
    });
    const sectionActions = getSectionActionItems({
      actions,
      texts,
      searchQuery,
      sectionId: currentSection?.id,
      setSearchActionSection,
      changeSearchQuery,
    });
    const recentItems = getRecentItems({
      recents,
      texts,
      isSelected,
      searchQuery,
      handleItemSelect,
      isSearchParam: !!searchParamConfig,
    });
    const folderItems = sections
      ? getFolderItems({ sections, handleSectionChange })
      : [];
    const listItems = currentFolders
      ? currentFolders.flatMap((folder) => {
          const itemsInFolder = currentItems.filter(
            (item) => item.sectionId === folder.id,
          );
          return getItems({
            items: itemsInFolder,
            titlePath: folder.titles,
            texts,
            searchQuery,
            maxItems: itemsLimitPerSection,
            showMoreOnClick: () => handleSectionChange(folder),
            showItemsSectionLabel,
            isSelected,
            handleItemSelect,
            isSearchParam: !!searchParamConfig,
          });
        })
      : getItems({
          items: currentItems,
          texts,
          searchQuery,
          showItemsSectionLabel,
          isSelected,
          handleItemSelect,
          isSearchParam: !!searchParamConfig,
        });

    const actionsRecentList = currentSection
      ? [...sectionActions]
      : [...globalActions, ...recentItems];
    const composedList = searchParamConfig ? [] : actionsRecentList;

    switch (listRenderingMode) {
      case RENDER_MODES.LIST_ITEMS:
        return [...composedList, ...listItems];
      case RENDER_MODES.LIST_FOLDERS_IN_SECTIONS:
        return [...composedList, ...folderItems];

      case RENDER_MODES.LIST_ITEMS_IN_SECTIONS:
      default:
        return [...composedList, ...listItems];
    }
  }, [
    listActions,
    currentSection,
    actions,
    texts,
    searchQuery,
    recents,
    currentItems,
    showItemsSectionLabel,
    sections,
    currentFolders,
    itemsLimitPerSection,
    listRenderingMode,
    isSelected,
    handleItemSelect,
    handleSectionChange,
    setSearchParamConfig,
    searchActionSection,
    searchParamConfig,
    changeSearchQuery,
  ]);

  return {
    currentSection: !listActions ? currentSection : undefined,
    currentPath,
    goBack,
    resetCurrentSection,
    setCurrentSection: handleCurrentSectionChange,
    mergedItemsList,
    isLoading: isLoading || !isInitialDataLoaded,
    isLoadingMore,
    isLoadedAll,
    handleScrollEndReach,
    refreshItems,
    isLoadingError,
    isLoadingMoreError,
    contentHeight,
    refreshEnabled: !listActions,
    searchActionSection,
    searchParamConfig,
    setSearchParamConfig,
    listActions,
  };
};
