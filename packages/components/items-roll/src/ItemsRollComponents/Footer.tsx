import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { ArrowDownCircleM, ArrowUpCircleM, CloseS } from '@synerise/ds-icon/dist/icons';

import * as S from '../ItemsRoll.styles';
import { Texts, ItemsRollProps } from '../ItemsRoll.types';

type FooterProps = Pick<ItemsRollProps, 'onClearAll' | 'maxToShowItems' | 'showMoreStep'> & {
  allTexts: { [k in Texts]: string | React.ReactNode };
  itemsCount: number;
  showAdditionalItems: () => void;
  showDefaultItemsAmount: () => void;
  visibleItemsCount: number;
};

type ShowLessButtonProps = {
  showDefaultItemsAmount: () => void;
  showLessLabel: string | React.ReactNode;
};

type ShowMoreButtonProps = {
  getShowMoreNumber: number;
  moreLabel: string | React.ReactNode;
  showAdditionalItems: () => void;
  showLabel: string | React.ReactNode;
};

const ShowLessButton: React.FC<ShowLessButtonProps> = ({ showDefaultItemsAmount, showLessLabel }) => (
  <S.ShowButton type="ghost" mode="icon-label" onClick={showDefaultItemsAmount}>
    <S.ArrowIcon component={<ArrowUpCircleM />} size={20} />
    <span className="bold-label">{showLessLabel}</span>
  </S.ShowButton>
);

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
  showLabel,
  moreLabel,
  showAdditionalItems,
  getShowMoreNumber,
}) => (
  <S.ShowButton type="ghost" mode="icon-label" onClick={showAdditionalItems}>
    <span>
      <S.ArrowIcon component={<ArrowDownCircleM />} size={20} />
      {showLabel}
      {` `}
      <span className="bold-label">{getShowMoreNumber}</span>
      {` `}
      {moreLabel}
    </span>
  </S.ShowButton>
);

const Footer: React.FC<FooterProps> = ({
  allTexts,
  itemsCount,
  maxToShowItems = 10,
  onClearAll,
  showAdditionalItems,
  showDefaultItemsAmount,
  showMoreStep = 10,
  visibleItemsCount,
}) => {
  const getShowMoreNumber = React.useMemo(
    () => (visibleItemsCount + showMoreStep < itemsCount ? showMoreStep : itemsCount - visibleItemsCount),
    [itemsCount, showMoreStep, visibleItemsCount]
  );

  const buttonsConfiguration = React.useMemo((): React.ReactElement => {
    if (visibleItemsCount === itemsCount)
      return <ShowLessButton showLessLabel={allTexts.showLessLabel} showDefaultItemsAmount={showDefaultItemsAmount} />;

    if (visibleItemsCount === maxToShowItems)
      return (
        <ShowMoreButton
          getShowMoreNumber={getShowMoreNumber}
          moreLabel={allTexts.moreLabel}
          showLabel={allTexts.showLabel}
          showAdditionalItems={showAdditionalItems}
        />
      );

    return (
      <>
        <ShowMoreButton
          getShowMoreNumber={getShowMoreNumber}
          moreLabel={allTexts.moreLabel}
          showLabel={allTexts.showLabel}
          showAdditionalItems={showAdditionalItems}
        />
        <ShowLessButton showLessLabel={allTexts.showLessLabel} showDefaultItemsAmount={showDefaultItemsAmount} />
      </>
    );
  }, [
    itemsCount,
    maxToShowItems,
    visibleItemsCount,
    getShowMoreNumber,
    showDefaultItemsAmount,
    showAdditionalItems,
    allTexts,
  ]);

  return visibleItemsCount !== 0 ? (
    <>
      <S.Divider dashed footer />
      <S.ContainerSpaceBetween data-testid="items-roll-footer">
        {itemsCount > maxToShowItems && buttonsConfiguration}
        {onClearAll && (
          <S.ClearButton type="ghost" mode="icon-label" onClick={onClearAll}>
            <Icon component={<CloseS />} size={22} />
            {allTexts.clearAllLabel}
          </S.ClearButton>
        )}
      </S.ContainerSpaceBetween>
    </>
  ) : null;
};

export default Footer;
