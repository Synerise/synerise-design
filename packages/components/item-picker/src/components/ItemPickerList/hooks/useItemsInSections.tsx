import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { itemSizes } from '@synerise/ds-list-item';

import type {
  ItemLoaderMeta,
  ItemPickerListProps,
  OnLoadedData,
} from '../../ItemPickerNew/ItemPickerNew.types';
import type {
  SearchByAction,
  SearchByParamConfig,
  SearchInAction,
} from '../../ItemPickerNew/types/actions.types';
import type {
  BaseItemType,
  BaseSectionType,
  BaseSectionTypeWithFolders,
} from '../../ItemPickerNew/types/baseItemSectionType.types';
import type { ItemPickerListTexts } from '../../ItemPickerNew/types/itemPickerListTexts.types';
import {
  FIRST_PAGE,
  GET_ITEM_KEY,
  ITEMS_PER_PAGE,
  ITEMS_PER_SECTION,
  ITEMS_PER_SECTION_IN_SEARCH,
  ITEM_SIZE,
  SECOND_PAGE,
  SECTION_HEADER_HEIGHT,
} from '../constants';
import { RENDER_MODES } from '../types/renderMode';
import { isItems, isItemsConfig, isWithOutSections } from '../utils';
import {
  getActionItems,
  getSectionActionItems,
} from '../utils/actionItemsUtils';
import { getSearchByActionItems } from '../utils/getSearchByActionItems';
import { resolveSectionId } from '../utils/resolveSectionId';
import { useFlattenFolders } from './useFlattenFolders';
import {
  getFolderItems,
  getItems,
  getRecentItems,
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
  onLoadedData?: OnLoadedData;
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
  onLoadedData,
}: ItemsInSectionsType<ItemType, SectionType>) => {
  const [currentSection, setCurrentSection] = useState<
    SectionType | BaseSectionType | undefined
  >();
  const [previousSection, setPreviousSection] = useState<
    SectionType | BaseSectionType | undefined
  >();

  const [searchByAction, setSearchByAction] = useState<
    SearchByAction | undefined
  >();
  const [searchByParamConfig, setSearchByParamConfig] = useState<
    SearchByParamConfig | undefined
  >();
  const [searchInAction, setSearchInAction] = useState<
    SearchInAction | undefined
  >();
  const [searchInItem, setSearchInItem] = useState<ItemType | undefined>();

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
  const pageToLoad = useRef(FIRST_PAGE);
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
  const isSearchInActionActive = !!searchInAction && !searchInItem;
  const canPerformListActions =
    actions !== undefined &&
    !searchByAction &&
    !searchByParamConfig &&
    !isSearchInActionActive;
  const listActions = searchQuery === '/' && canPerformListActions;

  const hasSearchQuery = !!searchQuery;

  const { activeSectionId, isListItemsRenderingMode } = resolveSectionId({
    currentSection,
    searchInAction,
    searchInItem,
  });

  const activeSectionIdWithFallback = activeSectionId || 'DEFAULT';

  const hasCurrentSection = !!activeSectionId;
  const hasSections = !isWithOutSections(sections);
  const hasSectionsAndFolders = useMemo(
    () => hasSections && sections?.some((section) => section.folders?.length),
    [hasSections, sections],
  );

  const handleItemSelectExtended = useCallback(
    (item: ItemType) => {
      if (searchInAction && !searchInItem) {
        changeSearchQuery('');
        setSearchInItem(item);
        setSearchByParamConfig(undefined);
        searchInAction.onSearchInItemClick?.(item);
        return;
      }
      handleItemSelect?.(item);
    },
    [changeSearchQuery, handleItemSelect, searchInAction, searchInItem],
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
    if (isListItemsRenderingMode) {
      return { listRenderingMode: RENDER_MODES.LIST_ITEMS };
    }
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
    isListItemsRenderingMode,
  ]);

  const globalActionsLength =
    actions?.filter((action) => !action.sectionId).length || 0;
  const recentsLength = recents?.length || 0;
  const currentItemsLength = currentItems.length;

  const resetCurrentSection = useCallback(() => {
    setSearchInAction(undefined);
    setSearchInItem(undefined);
    setCurrentSection(undefined);
    setPreviousSection(undefined);
  }, []);

  const goBack = useCallback(() => {
    if (searchByAction) {
      setSearchByAction(undefined);
      return;
    }
    if (searchInItem) {
      changeSearchQuery('');
      setSearchByParamConfig(undefined);
      setSearchInItem(undefined);
      return;
    }
    if (searchInAction) {
      changeSearchQuery('');
      setSearchInAction(undefined);
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
  }, [
    searchInAction,
    searchByAction,
    searchQuery,
    parentFolder,
    previousSection,
    searchInItem,
    changeSearchQuery,
  ]);

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
    if (isFixedItemsList && !searchQuery && !activeSectionId) {
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
    activeSectionId,
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
    if (isFixedItemsList || listActions || searchByAction) {
      return;
    }
    setIsLoading(true);
    setIsLoadingError(false);

    const currentRequestId = crypto.randomUUID();
    requestIdRef.current = currentRequestId;

    if (listRenderingMode === RENDER_MODES.LIST_ITEMS) {
      try {
        const { items: fetchedItems, meta } = await items.loadItems({
          page: FIRST_PAGE,
          searchQuery,
          sectionId: activeSectionIdWithFallback,
          limit: items.limitPerPage || ITEMS_PER_PAGE,
          meta: undefined,
          abortController: abortControllerRef.current,
          searchKey: searchByParamConfig?.paramKey,
          searchInItem,
        });
        if (currentRequestId !== requestIdRef.current) {
          return;
        }
        setIsLoading(false);
        pageToLoad.current = FIRST_PAGE + 1;
        metaRef.current[activeSectionIdWithFallback] = meta;
        onLoadedData?.({
          sectionId: activeSectionIdWithFallback,
          meta,
          renderMode: listRenderingMode,
        });
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
            const sectionId = folder.id;
            return items
              .loadItems({
                page: FIRST_PAGE,
                searchQuery,
                limit: (items.limitPerSection || ITEMS_PER_SECTION) + 1,
                sectionId,
                meta: undefined,
                abortController: abortControllerRef.current,
                searchKey: searchByParamConfig?.paramKey,
                searchInItem,
              })
              .then(({ items: sectionItems, total, meta }) => {
                onLoadedData?.({
                  sectionId,
                  meta,
                  renderMode: listRenderingMode,
                });
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
    searchByParamConfig,
    isFixedItemsList,
    currentFolders,
    listRenderingMode,
    items,
    listActions,
    searchQuery,
    searchByAction,
    onLoadedData,
    activeSectionIdWithFallback,
    searchInItem,
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
          const matchValue = searchByParamConfig
            ? String(item[searchByParamConfig.paramKey as keyof ItemType])
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
    searchByParamConfig,
  ]);

  useEffect(() => {
    pageToLoad.current = FIRST_PAGE;
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
    activeSectionId,
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
    if (pageToLoad.current < SECOND_PAGE) {
      return;
    }

    if (hasInfiniteScroll) {
      if (isLoadedAll || isLoadingMore) {
        return;
      }
      setIsLoadingMore(true);
      items
        .loadItems({
          page: pageToLoad.current,
          limit: items.limitPerPage || ITEMS_PER_PAGE,
          searchQuery,
          sectionId: activeSectionIdWithFallback,
          meta: metaRef.current[activeSectionIdWithFallback],
          searchKey: searchByParamConfig?.paramKey,
          searchInItem,
        })
        .then(({ items: fetchedItems, total, meta }) => {
          sectionTotals.current[activeSectionIdWithFallback] = total;
          metaRef.current[activeSectionIdWithFallback] = meta;
          setIsLoadingMore(false);
          setIsLoadingMoreError(false);
          if (
            sectionTotals.current[activeSectionIdWithFallback] <=
            (pageToLoad.current + 1) * (items.limitPerPage || ITEMS_PER_PAGE)
          ) {
            setIsLoadedAll(true);
          }
          pageToLoad.current += 1;
          setCurrentItems([...currentItems, ...fetchedItems]);
        })
        .catch(() => {
          setIsLoadingMore(false);
          setIsLoadingMoreError(true);
        });
    }
  }, [
    searchByParamConfig,
    isLoadingMore,
    hasInfiniteScroll,
    isLoadedAll,
    items,
    searchQuery,
    currentItems,
    activeSectionIdWithFallback,
    searchInItem,
  ]);

  const mergedItemsList = useMemo(() => {
    const isSearchInItemActive = !!searchInItem;

    if (searchByAction) {
      return getSearchByActionItems({
        action: searchByAction,
        setSearchByAction,
        setSearchByParamConfig,
        searchQuery,
        changeSearchQuery,
      });
    }

    if (listActions) {
      return getActionItems({
        actions,
        texts,
        sectionId: activeSectionId,
        setSearchByAction,
        changeSearchQuery,
        setSearchInAction,
        isSearchInItemActive,
        searchByParamConfig,
        setSearchByParamConfig,
      });
    }

    const sectionActions = getSectionActionItems({
      actions,
      texts,
      searchQuery,
      sectionId: activeSectionId,
      setSearchByAction,
      changeSearchQuery,
      setSearchInAction,
      isSearchInItemActive,
      searchByParamConfig,
      setSearchByParamConfig,
    });

    const recentItems =
      activeSectionId || isSearchInItemActive || searchByParamConfig
        ? []
        : getRecentItems({
            recents,
            texts,
            isSelected,
            searchQuery,
            handleItemSelect,
            isSearchParam: !!searchByParamConfig,
          });

    const folderItems = sections
      ? getFolderItems({ sections, handleSectionChange })
      : [];
    const listItems =
      !isListItemsRenderingMode && currentFolders
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
              isSearchParam: !!searchByParamConfig,
            });
          })
        : getItems({
            items: currentItems,
            texts,
            searchQuery,
            showItemsSectionLabel,
            isSelected,
            handleItemSelect: handleItemSelectExtended,
            isSearchParam: !!searchByParamConfig,
          });

    const listItemsLength = listItems.length;
    const isNoActionsRecentList =
      isSearchInActionActive || (!listItemsLength && isSearchInItemActive);
    const composedList = isNoActionsRecentList
      ? []
      : [...sectionActions, ...recentItems];

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
    activeSectionId,
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
    setSearchByParamConfig,
    searchByAction,
    searchByParamConfig,
    changeSearchQuery,
    handleItemSelectExtended,
    isSearchInActionActive,
    searchInItem,
    isListItemsRenderingMode,
  ]);

  const reloadActiveSection = useCallback(() => {
    pageToLoad.current = FIRST_PAGE;
    metaRef.current = {};
    setIsLoadedAll(false);
    setIsLoadingMore(false);
    sectionTotals.current = {};
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    if (!listActions) {
      loadItems();
    }
  }, [listActions, loadItems]);

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
    searchByAction,
    searchByParamConfig,
    setSearchByParamConfig,
    listActions,
    searchInItem,
    searchInAction,
    canPerformListActions,
    reloadActiveSection,
    activeSectionId,
  };
};
