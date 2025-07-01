import React, {
  createRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';

import { InlineAlert } from '@synerise/ds-alert';
import Cruds from '@synerise/ds-cruds';
import { DragHandleM } from '@synerise/ds-icon';
import { Matching } from '@synerise/ds-logic';
import { Title } from '@synerise/ds-typography';

import * as S from './StepCard.styles';
import { type StepCardProps } from './StepCard.types';
import { useDefaultTexts } from './hooks/useDefaultTexts';

export const REORDER_THROTTLE = 1000;
const MOVE_SUCCESS_FEEDBACK_DURATION = 2000;

const StepCard = forwardRef<HTMLDivElement, StepCardProps>(
  (
    {
      children,
      onDelete,
      onDuplicate,
      onMove,
      expressionIndex,
      expressionMoved,
      expressionCount,
      footer,
      matching,
      onChangeMatching,
      texts,
      headerRightSide,
      renderHeaderRightSide,
      isHeaderVisible = true,
      readOnly = false,
      singleStepCondition = false,
      getMoveByLabel,
      isDraggable = true,
      isDragged,
      isDragOverlay,
      dragIndex,
      dropLabel,
      dragHandleProps,
      additionalFields,
    },
    ref,
  ) => {
    const allTexts = useDefaultTexts(texts);

    const [moveByOffset, setMoveByOffset] = useState(0);
    const moveUpInactive = expressionIndex + moveByOffset <= 0;
    const moveDownInactive =
      expressionIndex + moveByOffset >= expressionCount - 1;

    const timeoutMovedRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [recentlyMoved, setRecentlyMoved] = useState(expressionMoved);

    const spinnerRef = createRef<SVGCircleElement>();

    const countDownSpinnerElement = (
      <S.CountDownWrapper>
        <svg viewBox="0 0 24 24">
          <S.CountDownSpinner
            data-test={moveByOffset}
            duration={REORDER_THROTTLE / 1000}
            stroke-dashoffset="40"
            stroke-linecap="butt"
          >
            <circle
              ref={spinnerRef}
              r="5"
              cx="12"
              cy="12"
              fill="transparent"
              transform="rotate(-90,12,12)"
            />
          </S.CountDownSpinner>
        </svg>
      </S.CountDownWrapper>
    );

    const resetAnimation = () => {
      if (spinnerRef.current && spinnerRef.current.parentElement) {
        const svgGroupElem = spinnerRef.current.parentElement;
        svgGroupElem.style.transitionProperty = 'none';
        svgGroupElem.style.strokeDashoffset = '75';
      }
    };

    const startAnimation = () => {
      if (spinnerRef.current && spinnerRef.current.parentElement) {
        const svgGroupElem = spinnerRef.current.parentElement;
        svgGroupElem.style.transitionDuration = `${REORDER_THROTTLE / 1000}s`;
        svgGroupElem.style.transitionProperty = 'stroke-dashoffset';
        svgGroupElem.style.strokeDashoffset = '40';
      }
    };

    const onMoveUp = () => {
      if (!moveUpInactive) {
        resetAnimation();
        setMoveByOffset(moveByOffset - 1);
      }
    };

    const onMoveDown = () => {
      if (!moveDownInactive) {
        resetAnimation();
        setMoveByOffset(moveByOffset + 1);
      }
    };

    useEffect(() => {
      if (expressionMoved) {
        setRecentlyMoved(expressionMoved);
        timeoutMovedRef.current = setTimeout(
          () => setRecentlyMoved(false),
          MOVE_SUCCESS_FEEDBACK_DURATION,
        );
      }
      return resetMoveSuccess;
    }, [expressionMoved, expressionIndex]);

    const resetMoveSuccess = () => {
      timeoutMovedRef.current && clearTimeout(timeoutMovedRef.current);
      setRecentlyMoved(false);
    };

    useEffect(() => {
      let timer: ReturnType<typeof setTimeout>;
      let timer2: ReturnType<typeof setTimeout>;
      if (moveByOffset !== 0) {
        timer = setTimeout(() => {
          onMove(expressionIndex, moveByOffset);
          setMoveByOffset(0);
        }, REORDER_THROTTLE);
      }

      resetAnimation();

      if (moveByOffset) {
        timer2 = setTimeout(startAnimation, 0);
      }

      return () => {
        timer && clearTimeout(timer);
        timer2 && clearTimeout(timer2);
      };
    });

    const moveByOffsetLabel = getMoveByLabel
      ? getMoveByLabel(moveByOffset)
      : `Move ${Math.abs(moveByOffset)} ${moveByOffset < 0 ? 'up' : 'down'}...`;

    const renderRightSide = () => {
      return (
        <>
          {!readOnly && (
            <S.CrudsWrapper>
              <S.MoveByOffset offset={moveByOffset}>
                {countDownSpinnerElement}{' '}
                <S.MoveByOffsetLabel>{moveByOffsetLabel}</S.MoveByOffsetLabel>
              </S.MoveByOffset>
              <Cruds
                onMoveUp={onMoveUp}
                moveUpTooltip={allTexts.moveUpTooltip}
                moveUpInactive={moveUpInactive}
                onMoveDown={onMoveDown}
                moveDownTooltip={allTexts.moveDownTooltip}
                moveDownInactive={moveDownInactive}
                deleteTooltip={allTexts.deleteTooltip}
                onDelete={onDelete}
                duplicateTooltip={allTexts.duplicateTooltip}
                onDuplicate={onDuplicate}
              />
            </S.CrudsWrapper>
          )}
          {recentlyMoved && (
            <S.RecentlyMoved duration={MOVE_SUCCESS_FEEDBACK_DURATION}>
              <InlineAlert type="success" message="Moved" />
            </S.RecentlyMoved>
          )}

          {renderHeaderRightSide
            ? renderHeaderRightSide(dragIndex ?? expressionIndex)
            : headerRightSide}
        </>
      );
    };

    return (
      <S.Container
        isDragged={isDragged}
        isDragOverlay={isDragOverlay}
        ref={ref}
      >
        <S.DragPlaceholder>
          {dropLabel && (
            <S.DragPlaceholderContent>{dropLabel}</S.DragPlaceholderContent>
          )}
          <S.DragPlaceholderTag>
            {renderHeaderRightSide && dragIndex !== undefined
              ? renderHeaderRightSide(dragIndex, { placeholder: true })
              : headerRightSide}
          </S.DragPlaceholderTag>
        </S.DragPlaceholder>
        <S.Content>
          {isHeaderVisible && (
            <S.Header
              isDraggable={!readOnly && isDraggable}
              onMouseOver={resetMoveSuccess}
              onFocus={resetMoveSuccess}
            >
              <S.LeftSide isDraggable={!readOnly && isDraggable}>
                {!readOnly && isDraggable && (
                  <S.DragIcon
                    component={<DragHandleM />}
                    {...(!readOnly && isDraggable ? dragHandleProps : {})}
                  />
                )}
                {matching !== undefined && onChangeMatching && (
                  <S.StepCardTitle>
                    <Matching
                      matching={matching}
                      onChange={onChangeMatching}
                      texts={{
                        matching: allTexts.matching,
                        notMatching: allTexts.notMatching,
                      }}
                      readOnly={readOnly}
                    />
                    <Title withoutMargin level={4}>
                      {matching
                        ? allTexts.conditionType
                        : allTexts.notConditionType}
                    </Title>
                  </S.StepCardTitle>
                )}
              </S.LeftSide>
              {!readOnly && isDraggable && <S.Middle {...dragHandleProps} />}
              {(!readOnly || headerRightSide || renderHeaderRightSide) && (
                <S.RightSide className="step-card-right-side">
                  {renderRightSide()}
                </S.RightSide>
              )}
            </S.Header>
          )}

          <S.Body singleStepCondition={singleStepCondition}>{children}</S.Body>
          {additionalFields && (
            <S.AdditionalFields>{additionalFields}</S.AdditionalFields>
          )}
          {footer && <S.Footer>{footer}</S.Footer>}
        </S.Content>
      </S.Container>
    );
  },
);
export default StepCard;
