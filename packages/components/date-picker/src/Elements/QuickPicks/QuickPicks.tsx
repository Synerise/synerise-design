import React from 'react';

import { ButtonToggle } from '@synerise/ds-button';
import { useDataFormat } from '@synerise/ds-data-format';
import { Title } from '@synerise/ds-typography';

import type { QuickPick, Texts } from '../../DatePicker.types';
import { fnsIsSameDay } from '../../fns';
import * as S from './QuickPicks.styles';

type QuickPicksProps = {
  value?: Date;
  onChange: (item: QuickPick) => void;
  items: QuickPick[];
  texts: Texts;
};

export const quickPickMatchesValue = (item: QuickPick, value?: Date) => {
  return value ? fnsIsSameDay(item.value, value) : false;
};

export const QuickPicks = ({
  value,
  items,
  texts,
  onChange,
}: QuickPicksProps) => {
  const { formatValue } = useDataFormat();
  return (
    <S.QuickPicksWrapper>
      <Title level={6}>{texts.quickPicks}</Title>
      {items.map((item) => (
        <ButtonToggle
          type="ghost"
          activated={quickPickMatchesValue(item, value)}
          onClick={() => onChange(item)}
          tooltipProps={{
            title: <>{formatValue(item.value)}</>,
          }}
        >
          {item.label}
        </ButtonToggle>
      ))}
    </S.QuickPicksWrapper>
  );
};
