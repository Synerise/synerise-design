import React from 'react';
import { useIntl } from 'react-intl';

import { Title } from '@synerise/ds-typography';

import * as S from './Logic.style';
import { type LogicProps, type LogicSubComponents } from './Logic.types';
import Matching from './Matching/Matching';

const DEFAULT_OPTIONS = ['AND', 'OR'];

const Logic: React.FC<LogicProps> & LogicSubComponents = ({
  value,
  options,
  onChange,
  readOnly = false,
}) => {
  const intl = useIntl();

  const operators = React.useMemo(() => {
    if (options !== undefined && options.length) {
      return options;
    }
    return DEFAULT_OPTIONS.map((option) => ({
      value: option,
      label: intl.formatMessage({ id: `DS.LOGIC.${option}` }),
    }));
  }, [options, intl]);

  const handleNextLogic = React.useCallback(() => {
    const currentOperatorIndex = operators.findIndex(
      (operator) => operator.value === value,
    );
    const nextOperatorIndex =
      currentOperatorIndex + 1 >= operators.length
        ? 0
        : currentOperatorIndex + 1;

    onChange(operators[nextOperatorIndex].value);
  }, [onChange, operators, value]);

  const renderValue = React.useMemo(() => {
    return operators.find((option) => option.value === value)?.label;
  }, [operators, value]);

  return (
    <S.Logic
      className="ds-logic"
      onClick={!readOnly ? handleNextLogic : undefined}
      readOnly={readOnly}
    >
      <Title withoutMargin level={4}>
        {renderValue}
      </Title>
    </S.Logic>
  );
};

Logic.Matching = Matching;

export default Logic;
