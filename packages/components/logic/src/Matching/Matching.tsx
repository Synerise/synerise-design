import React from 'react';
import { useIntl } from 'react-intl';

import * as S from './Matching.styles';
import { type MatchingProps } from './Matching.types';

const MATCHING_TOGGLE = '#MATCHING_TOGGLE#';

const Matching = ({
  matching = true,
  sentence,
  onChange,
  texts,
  readOnly = false,
  ...htmlAttributes
}: MatchingProps) => {
  const intl = useIntl();

  const text = React.useMemo(() => {
    return {
      matching: intl.formatMessage({
        id: 'DS.MATCHING.MATCHING',
        defaultMessage: 'matching',
      }),
      notMatching: intl.formatMessage({
        id: 'DS.MATCHING.NOT-MATCHING',
        defaultMessage: 'not matching',
      }),
      ...texts,
    };
  }, [texts, intl]);

  const handleClick = React.useCallback(() => {
    onChange(!matching);
  }, [onChange, matching]);

  const getToggle = React.useMemo(() => {
    return (
      <S.Toggle
        onClick={!readOnly ? handleClick : undefined}
        matching={matching}
        className="ds-matching-toggle"
        readOnly={readOnly}
      >
        {matching ? text.matching : text.notMatching}
      </S.Toggle>
    );
  }, [handleClick, matching, text, readOnly]);

  const getLabelWithToggle = React.useMemo(() => {
    if (sentence) {
      const startOfToggle = sentence?.search(MATCHING_TOGGLE);
      const endOfToggle = startOfToggle + MATCHING_TOGGLE.length;
      return [
        sentence.substring(0, startOfToggle),
        getToggle,
        sentence.substring(endOfToggle, sentence.length),
      ];
    }

    return getToggle;
  }, [getToggle, sentence]);

  return (
    <S.MatchingWrapper {...htmlAttributes}>
      {getLabelWithToggle}
    </S.MatchingWrapper>
  );
};

export default Matching;
