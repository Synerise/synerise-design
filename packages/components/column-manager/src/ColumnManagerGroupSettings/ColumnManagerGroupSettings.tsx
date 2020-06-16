import Modal from '@synerise/ds-modal/dist/Modal';
import * as React from 'react';
import Select from '@synerise/ds-select';
import { InfoFillS, Add3M } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Button from '@synerise/ds-button';
import InputNumber from '@synerise/ds-input-number';
import Alert from '@synerise/ds-alert';
import { GroupType } from '../ColumnManager.types';
import * as S from './ColumnManangerGroupSettings.styles';
import RangesForm from './RangesForm/RangesForm';
import { GROUP_BY, GroupSettingsProps, Range } from './ColumnManagerGroupSettings.types';

const EMPTY_RANGE = {
  from: {
    value: undefined,
    error: undefined,
  },
  to: {
    value: undefined,
    error: undefined,
  },
};

const validateRange = (range: Range, index: number, ranges: Range[]): Range => {
  const validRange = { ...range };
  if (
    (range.from.value === undefined || range.from.value === '') &&
    (range.to.value === undefined || range.to.value === '')
  ) {
    validRange.from.error = 'You should fill on of these fields';
    validRange.to.error = 'You should fill on of these fields';
  } else {
    if ((range.from.value === undefined || range.from.value === '') && index > 0) {
      validRange.from.error = 'Only first From input can be set as empty';
    } else {
      validRange.from.error = undefined;
    }
    if ((range.to.value === undefined || range.from.value === '') && index < ranges.length - 1) {
      validRange.to.error = 'Only last To input can be set as empty';
    } else {
      validRange.to.error = undefined;
    }
  }

  return validRange;
};

const ColumnManagerGroupSettings: React.FC<GroupSettingsProps> = ({
  hide,
  visible,
  column,
  onOk,
  settings,
  texts,
}: GroupSettingsProps) => {
  const [groupBy, setGroupBy] = React.useState<GroupType | undefined>(undefined);
  const [ranges, setRanges] = React.useState<Range[]>([EMPTY_RANGE]);
  const [interval, setIntervalValue] = React.useState<number | undefined>(undefined);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const clearState = React.useCallback(() => {
    setRanges([]);
    setError(undefined);
    setGroupBy(undefined);
    setIntervalValue(undefined);
  }, []);

  React.useEffect(() => {
    setGroupBy(settings?.settings.type);
    setRanges(settings?.settings.ranges || []);
    setIntervalValue(settings?.settings.interval || undefined);

    return (): void => {
      clearState();
    };
  }, [settings, setGroupBy, setRanges, clearState, setIntervalValue]);

  const validate = React.useCallback((): boolean => {
    if (groupBy === GROUP_BY.value) return true;
    if (groupBy === undefined) {
      setError('Error - Choose type of grouping');
      return false;
    }
    if (groupBy === GROUP_BY.interval) {
      if (!interval) {
        setError('Error - Provide correct interval value');
      } else {
        setError(undefined);
      }
      return Boolean(interval);
    }
    if (groupBy === GROUP_BY.ranges) {
      const validatedRanges = ranges.map(validateRange);
      const hasErrors = validatedRanges.filter(range => range.from.error || range.to.error);

      setRanges(validatedRanges);
      if (hasErrors.length) {
        setError('Error - Provide correct value');
        return false;
      }
    }
    setError(undefined);
    return true;
  }, [groupBy, ranges, interval, setError, setRanges]);

  const handleOk = React.useCallback(() => {
    if (groupBy === GROUP_BY.disabled) {
      onOk(undefined);
      return;
    }
    if (validate()) {
      const currentSettings = {
        column,
        settings: {
          type: groupBy,
          ranges: groupBy === GROUP_BY.ranges && ranges.map(range => ({ from: range.from, to: range.to })),
          interval: groupBy === GROUP_BY.interval && (interval as number),
        },
      };
      clearState();
      onOk(currentSettings);
    }
  }, [onOk, column, groupBy, ranges, interval, clearState, validate]);

  const selectLabel = React.useMemo(() => {
    return (
      <S.Title>
        {texts.groupingType}
        <Tooltip title={texts.groupingTypeTooltip} trigger={['hover']}>
          <S.IconWrapper>
            <Icon component={<InfoFillS />} color={theme.palette['grey-600']} />
          </S.IconWrapper>
        </Tooltip>
      </S.Title>
    );
  }, [texts]);

  const addRow = React.useCallback(() => {
    setRanges([...ranges, EMPTY_RANGE]);
  }, [setRanges, ranges]);

  const renderForm = React.useCallback((): React.ReactNode => {
    if (groupBy === GROUP_BY.ranges) {
      return (
        <>
          <RangesForm setRanges={setRanges} ranges={ranges} type={column?.type || ''} texts={texts} />
          <Button onClick={addRow} type="ghost-primary" mode="icon-label">
            <Icon component={<Add3M />} />
            {texts.addRange}
          </Button>
        </>
      );
    }
    if (groupBy === GROUP_BY.interval) {
      return (
        <S.IntervalInput>
          <InputNumber min={1} label={texts.intervalPlaceholder} value={interval} onChange={setIntervalValue} />
        </S.IntervalInput>
      );
    }
    return null;
  }, [groupBy, ranges, column, interval, addRow, texts]);

  const handleHide = React.useCallback(() => {
    clearState();
    hide();
  }, [hide, clearState]);

  const groupByRangesDisabled = React.useMemo(() => {
    const availableColumnTypes = ['text', 'number', 'date'];
    const type = column?.type || undefined;
    return !type || !availableColumnTypes.includes(type);
  }, [column]);

  return (
    <Modal onCancel={handleHide} visible={visible} onOk={handleOk} size="small" title={texts.groupTitle}>
      <S.ModalContent>
        {/*
        // @ts-ignore */}
        <Select label={selectLabel} value={groupBy} onChange={setGroupBy} placeholder={texts.selectPlaceholder}>
          <Select.Option value={GROUP_BY.value}>{texts.groupByValue}</Select.Option>
          <Select.Option value={GROUP_BY.ranges} disabled={groupByRangesDisabled}>
            {texts.groupByRanges}
          </Select.Option>
          <Select.Option value={GROUP_BY.interval}>{texts.groupByIntervals}</Select.Option>
          <Select.Option value={GROUP_BY.disabled}>{texts.groupDisabled}</Select.Option>
        </Select>
        {error && <Alert type="error" description={error} message="" showIcon />}
        {renderForm()}
      </S.ModalContent>
    </Modal>
  );
};

export default ColumnManagerGroupSettings;
