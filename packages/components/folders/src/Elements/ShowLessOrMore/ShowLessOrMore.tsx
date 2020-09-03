import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { ArrowDownCircleM, ArrowUpCircleM } from '@synerise/ds-icon/dist/icons';
import { Props } from './ShowLessOrMore.types';
import * as S from './ShowLessOrMore.styles';

const ShowLessOrMore: React.FC<Props> = ({
  onShowMore,
  onShowLess,
  totalItemsCount,
  visibleItemsCount,
  step,
  texts,
}: Props) => {
  const allItemsVisible = totalItemsCount === visibleItemsCount;
  const itemsOverLimit = React.useMemo((): number => {
    return totalItemsCount - visibleItemsCount;
  }, [totalItemsCount, visibleItemsCount]);

  const renderShowMoreButton = React.useCallback(() => {
    const more = itemsOverLimit > step ? step : itemsOverLimit;
    return (
      totalItemsCount > visibleItemsCount && (
        <Button
          type="ghost"
          mode="icon-label"
          onClick={(): void => {
            onShowMore(more);
          }}
          className="ds-folder-show-more"
        >
          <Icon component={<ArrowDownCircleM />} />
          <S.ShowMoreLabel>
            <span>{texts.showMoreLabel}</span>
            <strong>{more}</strong>
            <span>{texts.more}</span>
          </S.ShowMoreLabel>
        </Button>
      )
    );
  }, [texts, visibleItemsCount, totalItemsCount, step, itemsOverLimit, onShowMore]);

  const renderShowLessButton = React.useCallback(() => {
    return (
      <Button
        type="ghost"
        mode="icon-label"
        onClick={(): void => {
          onShowLess(step);
        }}
        className="ds-folder-show-less"
      >
        <Icon component={<ArrowUpCircleM />} />
        <S.ShowMoreLabel>
          <span>{texts.showMoreLabel}</span>
          <strong>{step}</strong>
          <span>{texts.less}</span>
        </S.ShowMoreLabel>
      </Button>
    );
  }, [texts, visibleItemsCount, totalItemsCount, step, onShowLess]);

  return (
    <S.Container>
      {!allItemsVisible && renderShowMoreButton()}
      {visibleItemsCount > step && renderShowLessButton()}
    </S.Container>
  );
};

export default ShowLessOrMore;
