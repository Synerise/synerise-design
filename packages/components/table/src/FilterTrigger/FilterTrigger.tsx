import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { Close3S, FolderM } from '@synerise/ds-icon/dist/icons';
import Tooltip from '@synerise/ds-tooltip';
import * as S from './FilterTrigger.styles';

interface Props {
  name: string;
  selected?: {
    name: string;
  };
  iconComponent: React.ReactNode;
  tooltips: {
    default: string;
    define: string;
    clear: string;
    list: string;
  };
  openedLabel: string;
  handleClear: () => void;
  showList: () => void;
  show: () => void;
}

const FilterTrigger: React.FC<Props> = ({
  name,
  selected,
  iconComponent,
  tooltips = {
    default: 'Filter',
    define: 'Define filter',
    clear: 'Clear filter',
    list: 'Saved filters',
  },
  openedLabel,
  handleClear,
  showList,
  show,
}) => {
  const [opened, setOpened] = React.useState<boolean>(false);
  React.useEffect(() => {
    selected && setOpened(true);
  }, [selected, opened, setOpened]);

  const handleOpen = React.useCallback(() => {
    setOpened(true);
  }, [setOpened]);

  const renderOpened = React.useMemo(
    () => (
      <>
        <Tooltip title={selected?.name || tooltips.define}>
          <S.FilterButton
            opened={opened}
            mode={opened ? 'icon-label' : 'single-icon'}
            type="ghost"
            onClick={opened ? show : handleOpen}
            data-testid="show-filter-button"
          >
            <Icon component={iconComponent} />
            <S.FilterButtonLabel>{selected?.name || openedLabel}</S.FilterButtonLabel>
          </S.FilterButton>
        </Tooltip>
        {selected && (
          <Tooltip title={tooltips.clear}>
            <S.ClearButton mode="single-icon" type="ghost" onClick={handleClear} data-testid="clear-button">
              <Icon component={<Close3S />} />
            </S.ClearButton>
          </Tooltip>
        )}
        {opened && (
          <Tooltip title={tooltips.list}>
            <S.ListButton mode="single-icon" type="ghost" onClick={showList} data-testid="show-list-button">
              <Icon component={<FolderM />} />
            </S.ListButton>
          </Tooltip>
        )}
      </>
    ),
    [opened, tooltips, selected, handleClear, show, showList, handleOpen, iconComponent, openedLabel]
  );

  return (
    <S.FilterTrigger data-testid={`filter-trigger-${name}`} opened={opened} selected={selected}>
      <S.FilterButtons>{renderOpened}</S.FilterButtons>
    </S.FilterTrigger>
  );
};

export default FilterTrigger;
