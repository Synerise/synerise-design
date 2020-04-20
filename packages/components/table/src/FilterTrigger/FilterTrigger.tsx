import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import { FolderM } from '@synerise/ds-icon/dist/icons';
import Tooltip from '@synerise/ds-tooltip';
import * as S from './FilterTrigger.styles';

interface Props {
  selectedFilter?: {
    name: string;
  };
  iconComponent: React.ReactNode;
  tooltips: {
    default: string;
    define: string;
    clear: string;
    list: string;
  };
  onClear: (filter: object) => void;
  showList: () => void;
  showFilter: () => void;
}

const FilterTrigger: React.FC<Props> = ({
  selectedFilter,
  iconComponent,
  tooltips = {
    default: 'Filter',
    define: 'Define filter',
    clear: 'Clear filter',
    list: 'Saved filters',
  },
  onClear,
  showList,
  showFilter,
}) => {
  const [opened, setOpened] = React.useState<boolean>(false);
  React.useEffect(() => {
    selectedFilter && setOpened(true);
  }, [selectedFilter, opened, setOpened]);

  const handleOpen = React.useCallback(() => {
    setOpened(true);
  }, [opened, setOpened]);

  const renderOpened = React.useMemo(
    () => (
      <>
        <Tooltip title={tooltips.define}>
          <Button mode="icon-label" type="ghost" onClick={showFilter}>
            <Icon component={iconComponent} />
            Define
          </Button>
        </Tooltip>
        <Tooltip title={tooltips.list}>
          <Button mode="single-icon" type="ghost" onClick={showList}>
            <Icon component={<FolderM />} />
          </Button>
        </Tooltip>
      </>
    ),
    [opened, tooltips, selectedFilter, onClear, showFilter, showList]
  );

  const renderClosed = React.useMemo(
    () => (
      <Tooltip title={tooltips.default}>
        <Button mode="single-icon" type="ghost" onClick={handleOpen}>
          <Icon component={iconComponent} />
        </Button>
      </Tooltip>
    ),
    [iconComponent, handleOpen, tooltips]
  );

  return (
    <S.FilterTrigger>
      <S.FilterButton opened={opened}>
        {!opened && renderClosed}
        {opened && renderOpened}
      </S.FilterButton>
    </S.FilterTrigger>
  );
};

export default FilterTrigger;
