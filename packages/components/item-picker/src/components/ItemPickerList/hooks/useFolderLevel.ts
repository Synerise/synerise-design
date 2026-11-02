import { useCallback, useState } from 'react';

import type {
  FolderNode,
  PathStep,
} from '../../ItemPickerNew/types/mixedLoader.types';

export const useFolderLevel = () => {
  const [folderId, setFolderId] = useState<string | null>(null);
  const [path, setPath] = useState<PathStep[]>([]);

  // The path is extended right away for the back header; the level's load replaces it with the real one.
  const openFolder = useCallback((folder: FolderNode) => {
    setFolderId(folder.id);
    setPath((current) => [...current, { id: folder.id, text: folder.text }]);
  }, []);

  const goUp = useCallback(() => {
    setFolderId(path.length > 1 ? path[path.length - 2].id : null);
    setPath((current) => current.slice(0, -1));
  }, [path]);

  const reset = useCallback(() => {
    setFolderId(null);
    setPath((current) => current.slice(0, 1));
  }, []);

  return { folderId, path, setPath, openFolder, goUp, reset };
};
