import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { ArrowDownCircleM, ArrowUpCircleM } from '@synerise/ds-icon/dist/icons';
import generateHash from 'random-hash';
import { Props } from './ShowLessOrMore.types';
import * as S from './ShowLessOrMore.styles';

const ShowLessOrMore: React.FC<Props> = ({
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

  const itemsToHide = React.useMemo(() => {
    if (visibleItemsCount === maxItemsToShow) return 0;
    if (visibleItemsCount - maxItemsToShow < showMoreStep) return visibleItemsCount - maxItemsToShow;
    return showMoreStep;
  }, [showMoreStep, visibleItemsCount, maxItemsToShow]);

  const renderShowMoreButton = React.useCallback(() => {
    const more = itemsOverLimit > showMoreStep ? showMoreStep : itemsOverLimit;
    const onClick = (): void => onShowMore(more);

    return (
      totalItemsCount > visibleItemsCount && (
        <Button type="ghost" mode="icon-label" onClick={onClick} key={generateHash()}>
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

  const renderShowLessButton = React.useCallback(() => {
    const onClick = (): void => {
      onShowLess(itemsToHide);
    };

    return (
      <Button type="ghost" mode="icon-label" onClick={onClick} key={generateHash()}>
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
