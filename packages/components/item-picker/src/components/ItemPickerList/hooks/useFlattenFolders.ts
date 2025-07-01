import { type ReactNode, useMemo } from 'react';

import type {
  BaseSectionType,
  BaseSectionTypeWithFolders,
} from '../../ItemPickerNew/ItemPickerNew.types';

type NestedFoldersProps<SectionType extends BaseSectionType | undefined> = {
  currentSection?: SectionType extends BaseSectionType
    ? BaseSectionTypeWithFolders<SectionType>
    : undefined;
  sections?: SectionType extends BaseSectionType
    ? BaseSectionTypeWithFolders<SectionType>[]
    : undefined;
};

const mapParent = <SectionType extends BaseSectionType>(
  item: BaseSectionTypeWithFolders<SectionType>,
  parent?: BaseSectionTypeWithFolders<SectionType>,
): { id: string; parent?: BaseSectionTypeWithFolders<SectionType> }[] => {
  if (item.folders) {
    return [
      ...item.folders.flatMap((f) => mapParent(f, item)),
      { id: item.id, parent },
    ];
  }
  return [{ id: item.id, parent }];
};

const getFolders = <SectionType extends BaseSectionType>(
  folder: BaseSectionTypeWithFolders<SectionType>,
  titles?: ReactNode[],
): (BaseSectionTypeWithFolders<SectionType> & { titles?: ReactNode[] })[] => {
  const newPath = titles ? [...titles, folder.text] : [folder.text];
  if (folder.folders?.length) {
    return folder.folders.flatMap((f: SectionType) => getFolders(f, newPath));
  }
  return [{ ...folder, titles: newPath }];
};

export const useFlattenFolders = <
  SectionType extends BaseSectionType | undefined,
>({
  currentSection,
  sections,
}: NestedFoldersProps<SectionType>) => {
  const folderParentMap = useMemo(() => {
    return sections?.flatMap((section) =>
      section.folders ? section.folders.flatMap((f) => mapParent(f)) : [],
    );
  }, [sections]);
  const titlePathIndex = folderParentMap?.length ? 1 : 0;

  const allItemFolders = useMemo(() => {
    const mappedFolders = sections?.flatMap((section) => getFolders(section));
    return mappedFolders?.map((folder) => ({
      ...folder,
      titles: folder.titles?.slice(titlePathIndex),
    }));
  }, [sections, titlePathIndex]);

  const childFolders = useMemo(() => {
    return currentSection?.folders?.flatMap((folder) => getFolders(folder));
  }, [currentSection]);

  const parentFolder = useMemo(() => {
    return (
      currentSection &&
      folderParentMap?.find((item) => item.id === currentSection.id)?.parent
    );
  }, [currentSection, folderParentMap]);

  const currentTitlePath = allItemFolders?.find(
    (folder) => folder.id === currentSection?.id,
  )?.titles;

  const currentFolders = useMemo(() => {
    return currentSection ? childFolders : allItemFolders;
  }, [allItemFolders, childFolders, currentSection]);

  return {
    allFolders: allItemFolders,
    childFolders,
    parentFolder,
    currentFolders,
    currentSectionHasFolders: !!childFolders?.length,
    currentPath: currentTitlePath,
  };
};
