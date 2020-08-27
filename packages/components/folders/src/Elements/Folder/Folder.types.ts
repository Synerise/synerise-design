export type FolderProps = {
  id?: string;
  name: string;
  favourite?: boolean;
  onEdit?: (id: string, newName: string) => void;
  onDelete?: (id: string) => void;
  onFavourite?: (id: string) => void;
  onSettingsEnter?: (id: string) => void;
};
