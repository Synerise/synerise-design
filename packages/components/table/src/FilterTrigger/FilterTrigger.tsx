import React from 'react';

import Icon, { Close3S, FolderM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { useOnClickOutside } from '@synerise/ds-utils';

import * as S from './FilterTrigger.styles';
import { type Props } from './FilterTrigger.types';

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
  disabled,
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

  const triggerMode = opened ? 'icon-label' : 'single-icon';
  const triggerType = opened ? 'tertiary' : 'ghost';
  const triggerOnClick = opened ? show : handleOpen;

  return (
    <span ref={ref}>
      <S.FilterButtonGroup splitMode>
        <Tooltip title={selected?.name || tooltips.define}>
          <S.FilterButton
            opened={opened}
            selected={selected}
            type={triggerType}
            mode={triggerMode}
            disabled={disabled}
            onClick={triggerOnClick}
            data-testid={`filter-trigger-${name}`}
          >
            <Icon component={iconComponent} />
            <S.FilterButtonLabel>
              {selected?.name || openedLabel}
            </S.FilterButtonLabel>
          </S.FilterButton>
        </Tooltip>
        {selected && (
          <Tooltip title={tooltips.clear}>
            <S.ClearButton
              mode="single-icon"
              type="tertiary"
              onClick={handleClear}
              data-testid="clear-button"
            >
              <Icon component={<Close3S />} />
            </S.ClearButton>
          </Tooltip>
        )}
        {opened && (
          <Tooltip title={tooltips.list}>
            <S.ListButton
              mode="single-icon"
              type="tertiary"
              onClick={showList}
              data-testid="show-list-button"
            >
              <Icon component={<FolderM />} />
            </S.ListButton>
          </Tooltip>
        )}
      </S.FilterButtonGroup>
    </span>
  );
};

export default React.memo(FilterTrigger);
