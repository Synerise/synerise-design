import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { FolderFavouriteFlatM, FolderFavouriteM, FolderM } from '@synerise/ds-icon/dist/icons';
import { FolderProps } from './Folder.types';
import * as S from './Folder.styles';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import ActionsRow from '../Actions/Row/ActionsRow';
import ActionsDropdown from '../Actions/Dropdown/ActionsDropdown';

const Folder: React.FC<FolderProps> = ({ name, favourite }: FolderProps) => {
  const [hovered, setHovered] = React.useState<boolean>(false);
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

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <S.FolderItem
      prefixel={
        <Icon
          component={getPrefix(favourite, hovered)}
          color={hovered ? theme.palette['blue-600'] : theme.palette['grey-600']}
        />
      }
      suffixel={<ActionsDropdown onDelete={() => {}} onFavourite={() => {}} onSettingsEnter={() => {}} onEdit={() => {}} />}
      text={name}
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    />
  );
};

export default Folder;
