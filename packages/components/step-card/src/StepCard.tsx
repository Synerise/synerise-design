import * as React from 'react';
import { useIntl } from 'react-intl';

import Matching from '@synerise/ds-logic/dist/Matching/Matching';
import Cruds from '@synerise/ds-cruds';
import { DragHandleM } from '@synerise/ds-icon';

import { Title } from '@synerise/ds-typography';
import * as S from './StepCard.styles';
import { StepCardProps } from './StepCard.types';

const StepCard = React.forwardRef<HTMLDivElement, StepCardProps>(
  (
    {
      children,
      onDelete,
      onDuplicate,
      footer,
      matching,
      onChangeMatching,
      texts,
      headerRightSide,
      isHeaderVisible = true,
      readOnly = false,
    },
    ref
  ): JSX.Element => {
    const { formatMessage } = useIntl();
    const text = React.useMemo(
      () => ({
        matching: formatMessage({ id: 'DS.MATCHING.PERFORMED' }),
        notMatching: formatMessage({ id: 'DS.MATCHING.NOT-PERFORMED' }),
        conditionType: formatMessage({ id: 'DS.STEP-CARD.CONDITION-TYPE' }),
        notConditionType: formatMessage({ id: 'DS.STEP-CARD.NOT-CONDITION-TYPE' }),
        namePlaceholder: formatMessage({ id: 'DS.STEP-CARD.NAME-PLACEHOLDER' }),
        moveTooltip: formatMessage({ id: 'DS.STEP-CARD.MOVE' }),
        deleteTooltip: formatMessage({ id: 'DS.STEP-CARD.DELETE' }),
        duplicateTooltip: formatMessage({ id: 'DS.STEP-CARD.DUPLICATE' }),
        ...texts,
      }),
      [formatMessage, texts]
    );

    const renderRightSide = (): JSX.Element => {
      return (
        <>
          {!readOnly && (
            <S.CrudsWrapper>
              <Cruds
                deleteTooltip={text.deleteTooltip}
                onDelete={onDelete}
                duplicateTooltip={text.duplicateTooltip}
                onDuplicate={onDuplicate}
              />
            </S.CrudsWrapper>
          )}
          {headerRightSide}
        </>
      );
    };

    return (
      <S.Container ref={ref}>
        {isHeaderVisible && (
          <S.Header className="step-card-drag-handler">
            <S.LeftSide readOnly={readOnly}>
              {!readOnly && <S.DragIcon component={<DragHandleM />} />}
              <Matching
                matching={matching}
                onChange={onChangeMatching}
                texts={{ matching: text.matching, notMatching: text.notMatching }}
                readOnly={readOnly}
              />
              <Title withoutMargin level={4}>
                {matching ? text.conditionType : text.notConditionType}
              </Title>
            </S.LeftSide>
            {(!readOnly || headerRightSide) && (
              <S.RightSide className="step-card-right-side">{renderRightSide()}</S.RightSide>
            )}
          </S.Header>
        )}

        <S.Body>{children}</S.Body>
        {footer && <S.Footer>{footer}</S.Footer>}
      </S.Container>
    );
  }
);
export default StepCard;
