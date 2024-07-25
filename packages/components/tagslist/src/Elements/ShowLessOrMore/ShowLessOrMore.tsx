import React, { useCallback, useMemo } from 'react';
import Button from '@synerise/ds-button';
import Icon, { ArrowDownCircleM, ArrowUpCircleM } from '@synerise/ds-icon';
import { Props } from './ShowLessOrMore.types';
import * as S from './ShowLessOrMore.styles';

const ShowLessOrMore = ({
  onShowMore,
  onShowLess,
  totalItemsCount,
  visibleItemsCount,
  showMoreStep,
  texts,
  maxItemsToShow,
}: Props) => {
  const areAllItemsVisible = totalItemsCount === visibleItemsCount;
  const itemsOverLimit = totalItemsCount - visibleItemsCount;

  const itemsToHide = useMemo(() => {
    if (visibleItemsCount === maxItemsToShow) return 0;
    if (visibleItemsCount - maxItemsToShow < showMoreStep) return visibleItemsCount - maxItemsToShow;
    return showMoreStep;
  }, [showMoreStep, visibleItemsCount, maxItemsToShow]);

  const renderShowMoreButton = useCallback(() => {
    const more = itemsOverLimit > showMoreStep ? showMoreStep : itemsOverLimit;
    const onClick = () => onShowMore(more);

    return (
      totalItemsCount > visibleItemsCount && (
        <Button data-testid="ds-tagslist-show-more" type="ghost" mode="icon-label" onClick={onClick}>
          <Icon component={<ArrowDownCircleM />} />
          <S.Label>
            <span>{texts?.showMoreLabel}</span>
            <strong>{more}</strong>
            <span>{texts?.more}</span>
          </S.Label>
        </Button>
      )
    );
  }, [texts, visibleItemsCount, totalItemsCount, showMoreStep, itemsOverLimit, onShowMore]);

  const renderShowLessButton = useCallback(() => {
    const onClick = () => onShowLess(itemsToHide);

    return (
      <Button data-testid="ds-tagslist-show-less" type="ghost" mode="icon-label" onClick={onClick}>
        <Icon component={<ArrowUpCircleM />} />
        <S.Label>
          <span>{texts?.showMoreLabel}</span>
          <strong>{itemsToHide}</strong>
          <span>{texts?.less}</span>
        </S.Label>
      </Button>
    );
  }, [texts, onShowLess, itemsToHide]);

  return (
    <S.Container>
      {!areAllItemsVisible && renderShowMoreButton()}
      {itemsToHide > 0 && visibleItemsCount > showMoreStep && renderShowLessButton()}
    </S.Container>
  );
};

export default ShowLessOrMore;
