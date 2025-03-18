import type { ReactNode } from 'react';
import { TITLE_PATH_SEPARATOR } from '../constants';

export const createTitleFromTitlePath = (titlePath: ReactNode[]) => {
  return titlePath.flatMap((pathItem: ReactNode, index: number) => {
    return index !== 0 ? [TITLE_PATH_SEPARATOR, pathItem] : pathItem;
  });
};
