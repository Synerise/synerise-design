import type { SearchInAction } from '../../ItemPickerNew/types/actions.types';
import type {
  BaseItemType,
  BaseSectionType,
} from '../../ItemPickerNew/types/baseItemSectionType.types';

type ResolveSectionIdOptions<ItemType extends BaseItemType> = {
  searchInItem: ItemType | undefined;
  searchInAction: SearchInAction | undefined;
  currentSection: BaseSectionType | undefined;
};

export const resolveSectionId = <ItemType extends BaseItemType>({
  currentSection,
  searchInAction,
  searchInItem,
}: ResolveSectionIdOptions<ItemType>) => {
  if (searchInAction) {
    const { searchInSectionId, loadItemsSectionId } = searchInAction;

    if (searchInItem) {
      return {
        isListItemsRenderingMode: !!searchInSectionId,
        activeSectionId: searchInSectionId || currentSection?.id,
      };
    }
    return {
      isListItemsRenderingMode: true,
      activeSectionId: loadItemsSectionId,
    };
  }
  return {
    isListItemsRenderingMode: false,
    activeSectionId: currentSection?.id,
  };
};
