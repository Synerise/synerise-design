import Modal from '@synerise/ds-modal/dist/Modal';
import * as React from 'react';
import Select from '@synerise/ds-select';
import { InfoFillS, Add3M } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Button from '@synerise/ds-button';
import InputNumber from '@synerise/ds-input-number';
import { GroupSettings, GroupType } from '../ColumnManager.types';
import { Column } from '../ColumnManagerItem/ColumManagerIte.types';
import * as S from './ColumnManangerGroupSettings.styles';
import RangesForm from './RangesForm/RangesForm';

const GROUP_BY: { [key: string]: string } = {
  value: 'Value',
  ranges: 'Ranges',
  interval: 'Interval',
  disabled: 'Disabled',
};

interface Props {
  hide: () => void;
  onOk: (settings: GroupSettings | undefined) => void;
  visible: boolean;
  settings?: GroupSettings;
  column?: Column;
}

export interface Range {
  from: React.ReactText | undefined;
  to: React.ReactText | undefined;
}

const EMPTY_RANGE = {
  from: undefined,
  to: undefined,
};

const ColumnManagerGroupSettings: React.FC<Props> = ({ hide, visible, column, onOk, settings }: Props) => {
  const [groupBy, setGroupBy] = React.useState<GroupType | undefined>(undefined);
  const [ranges, setRanges] = React.useState<Range[]>([]);
  const [interval, setIntervalValue] = React.useState<number | undefined>(undefined);

  const clearState = React.useCallback(() => {
    setRanges([]);
    setGroupBy(undefined);
    setIntervalValue(undefined);
  }, []);

  React.useEffect(() => {
    setGroupBy(settings?.settings.type);
    setRanges(settings?.settings.ranges || []);
    setIntervalValue(settings?.settings.interval || undefined);
  }, [settings, setGroupBy, setRanges, setIntervalValue]);

  const handleOk = React.useCallback(() => {
    if (groupBy === GROUP_BY.disabled) {
      onOk(undefined);
      return;
    }
    const currentSettings = {
      column,
      settings: {
        type: groupBy,
        ranges: groupBy === GROUP_BY.ranges && ranges,
        interval: groupBy === GROUP_BY.interval && (interval as number),
      },
    };
    clearState();
    onOk(currentSettings);
  }, [onOk, column, groupBy, ranges, interval]);

  const selectLabel = React.useMemo(() => {
    return (
      <S.Title>
        Set grouping type
        <Tooltip title="More info about grouping types..." trigger={['hover']}>
          <S.IconWrapper>
            <Icon component={<InfoFillS />} color={theme.palette['grey-600']} />
          </S.IconWrapper>
        </Tooltip>
      </S.Title>
    );
  }, []);

  const addRow = React.useCallback(() => {
    setRanges([...ranges, EMPTY_RANGE]);
  }, [setRanges, ranges]);

  const renderForm = React.useCallback((): React.ReactNode => {
    if (groupBy === GROUP_BY.ranges) {
      return (
        <>
          <RangesForm setRanges={setRanges} ranges={ranges} type={column?.type || ''} />
          <Button onClick={addRow} type="ghost-primary" mode="icon-label">
            <Icon component={<Add3M />} />
            Add more
          </Button>
        </>
      );
    }
    if (groupBy === GROUP_BY.interval) {
      return (
        <S.IntervalInput>
          <InputNumber
            label="Set interval"
            value={interval}
            onChange={(value?: number): void => setIntervalValue(value)}
          />
        </S.IntervalInput>
      );
    }
    return null;
  }, [groupBy, ranges, column, interval]);

  const handleHide = React.useCallback(() => {
    clearState();
    hide();
  }, [hide]);

  const groupByRangesDisabled = React.useMemo(() => {
    const availableColumnTypes = ['text', 'number', 'date'];
    const type = column?.type || undefined;
    return !type || !availableColumnTypes.includes(type);
  }, [column]);

  return (
    <Modal onCancel={handleHide} visible={visible} onOk={handleOk} size="small" title="Table content group">
      <S.ModalContent>
        {/*
        // @ts-ignore */}
        <Select label={selectLabel} value={groupBy} onChange={(value): void => setGroupBy(value)} placeholder="Select">
          <Select.Option value={GROUP_BY.value}>Group by value</Select.Option>
          <Select.Option value={GROUP_BY.ranges} disabled={groupByRangesDisabled}>
            Group by ranges
          </Select.Option>
          <Select.Option value={GROUP_BY.interval}>Group by intervals</Select.Option>
          <Select.Option value={GROUP_BY.disabled}>Group disabled</Select.Option>
        </Select>
        {renderForm()}
      </S.ModalContent>
    </Modal>
  );
};

export default ColumnManagerGroupSettings;
