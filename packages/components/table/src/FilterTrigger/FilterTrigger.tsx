import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { Close3S, FolderM } from '@synerise/ds-icon/dist/icons';
import Tooltip from '@synerise/ds-tooltip';
import { useOnClickOutside } from '@synerise/ds-utils';
import * as S from './FilterTrigger.styles';
import { Props } from './FilterTrigger.types';

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
  disabled
}) => {
  const [opened, setOpened] = React.useState<boolean>(false);
  React.useEffect(() => {
    selected && setOpened(true);
  }, [selected, opened, setOpened]);

  const handleOpen = React.useCallback(() => {
    setOpened(true);
  }, [setOpened]);

  const ref = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    !selected && setOpened(false);
  });

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
            disabled={disabled}
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
    [opened, tooltips, selected, handleClear, show, showList, handleOpen, iconComponent, openedLabel, disabled]
  );

  return (
    <S.FilterTrigger ref={ref} data-testid={`filter-trigger-${name}`} opened={opened} selected={selected}>
      <S.FilterButtons>{renderOpened}</S.FilterButtons>
    </S.FilterTrigger>
  );
};

export default FilterTrigger;
