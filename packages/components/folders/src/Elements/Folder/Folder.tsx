import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { FolderFavouriteFlatM, FolderFavouriteM, FolderM } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { FolderProps } from './Folder.types';
import * as S from './Folder.styles';
import ActionsDropdown from '../Actions/Dropdown/ActionsDropdown';

const Folder: React.FC<FolderProps> = ({ name, favourite }: FolderProps) => {
  const [hovered, setHovered] = React.useState<boolean>(false);
  const [folderName, setFolderName] = React.useState<string>(name);
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const getPrefix = React.useCallback((isFavourite, isHovered): React.ReactNode => {
    if (isFavourite) {
      return isHovered ? <FolderFavouriteFlatM /> : <FolderFavouriteM />;
    }
    return <FolderM />;
  }, []);
  const onMouseOver = React.useCallback((): void => {
    setHovered(true);
  }, [setHovered]);

  const onMouseOut = React.useCallback((): void => {
    setHovered(false);
  }, [setHovered]);

  React.useEffect(() => {
    inputRef?.current !== null && inputRef.current.focus();
  }, [inputRef, editMode]);
  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <S.FolderItem
      prefixel={
        <Icon
          component={getPrefix(favourite, hovered)}
          color={hovered ? theme.palette['blue-600'] : theme.palette['grey-600']}
        />
      }
      suffixel={
        <ActionsDropdown
          onDelete={() => {}}
          onFavourite={() => {}}
          onSettingsEnter={() => {}}
          onEdit={() => {
            setEditMode(true);
          }}
          isFavourite={favourite}
        />
      }
      text={
        editMode ? (
          <S.InlineEditInput
            value={folderName}
            onChange={(e: React.SyntheticEvent<HTMLInputElement>): void => setFolderName(e.currentTarget.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => {
              if (e.key === 'Enter') {
                setEditMode(false);
              }
            }}
            ref={inputRef}
          />
        ) : (
          folderName
        )
      }
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    />
  );
};

export default Folder;
