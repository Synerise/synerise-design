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
  step,
  texts,
  maxItemsToShow,
}: Props) => {
  const areAllItemsVisible = totalItemsCount === visibleItemsCount;
  const itemsOverLimit = totalItemsCount - visibleItemsCount;

  const itemsToHide = React.useMemo(() => {
    if (itemsOverLimit > step) {
      return visibleItemsCount - itemsOverLimit;
    }
    if (visibleItemsCount - maxItemsToShow < step) {
      return visibleItemsCount - maxItemsToShow;
    }
    return step;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsOverLimit, step, visibleItemsCount, maxItemsToShow, totalItemsCount]);

  const renderShowMoreButton = React.useCallback(() => {
    const more = itemsOverLimit > step ? step : itemsOverLimit;
    const onClick = (): void => onShowMore(more);

    return (
      totalItemsCount > visibleItemsCount && (
        <Button type="ghost" mode="icon-label" onClick={onClick} className="ds-tagslist-show-more" key={generateHash()}>
          <Icon component={<ArrowDownCircleM />} />
          <S.Label>
            <span>{texts?.showMoreLabel}</span>
            <strong>{more}</strong>
            <span>{texts?.more}</span>
          </S.Label>
        </Button>
      )
    );
  }, [texts, visibleItemsCount, totalItemsCount, step, itemsOverLimit, onShowMore]);

  const renderShowLessButton = React.useCallback(() => {
    const onClick = (): void => {
      onShowLess(itemsToHide);
    };

    return (
      <Button type="ghost" mode="icon-label" onClick={onClick} className="ds-folder-show-less" key={generateHash()}>
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
      {itemsToHide > 0 && visibleItemsCount > step && renderShowLessButton()}
    </S.Container>
  );
};

export default ShowLessOrMore;
