import type {
  BaseSectionType,
  BaseSectionTypeWithFolders,
} from '../../ItemPickerNew/ItemPickerNew.types';

export const findSectionById = <SectionType extends BaseSectionType>(
  nestedFolders?: BaseSectionTypeWithFolders<SectionType>[],
  sectionId?: string | number,
): BaseSectionTypeWithFolders<SectionType> | undefined => {
  if (nestedFolders?.length && sectionId !== undefined) {
    const flattenFolders = (
      folders: BaseSectionTypeWithFolders<SectionType>[],
    ): BaseSectionTypeWithFolders<SectionType>[] => {
      return folders.flatMap((folder) =>
        folder.folders?.length ? flattenFolders(folder.folders) : folder,
      );
    };
    return flattenFolders(nestedFolders).find(
      (folder) => folder.id === sectionId,
    );
  }
  return undefined;
};
