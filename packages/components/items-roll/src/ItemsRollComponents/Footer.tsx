import React, { useMemo } from 'react';
import Popconfirm from '@synerise/ds-popconfirm';
import Icon, { ArrowDownCircleM, ArrowUpCircleM, CloseS, WarningFillM } from '@synerise/ds-icon';

import * as S from '../ItemsRoll.styles';
import { ShowLessButtonProps, ShowMoreButtonProps, FooterProps } from './Footer.types';

const ShowLessButton = ({ showDefaultItemsAmount, showLessLabel }: ShowLessButtonProps) => (
  <S.ShowButton type="ghost" mode="icon-label" onClick={showDefaultItemsAmount}>
    <S.ArrowIcon component={<ArrowUpCircleM />} size={20} />
    <span className="bold-label">{showLessLabel}</span>
  </S.ShowButton>
);

const ShowMoreButton = ({ showLabel, moreLabel, showAdditionalItems, getShowMoreNumber }: ShowMoreButtonProps) => (
  <S.ShowButton type="ghost" mode="icon-label" onClick={showAdditionalItems}>
    <S.ArrowIcon component={<ArrowDownCircleM />} size={20} />
    <S.ShowButtonLabel>
      {showLabel}
      {` `}
      <span className="bold-label">{getShowMoreNumber}</span>
      {` `}
      {moreLabel}
    </S.ShowButtonLabel>
  </S.ShowButton>
);

const Footer = ({
  allTexts,
  itemsCount,
  maxToShowItems = 10,
  onClearAll,
  showAdditionalItems,
  showDefaultItemsAmount,
  showMoreStep = 10,
  visibleItemsCount,
  searchMode,
}: FooterProps) => {
  const getShowMoreNumber = useMemo(
    () => (visibleItemsCount + showMoreStep < itemsCount ? showMoreStep : itemsCount - visibleItemsCount),
    [itemsCount, showMoreStep, visibleItemsCount]
  );

  const showDivider = useMemo(() => {
    return !searchMode || (searchMode && itemsCount > maxToShowItems);
  }, [searchMode, maxToShowItems, itemsCount]);

  const buttonsConfiguration = useMemo(() => {
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
      <S.ShowButtonsWrapper>
        <ShowMoreButton
          getShowMoreNumber={getShowMoreNumber}
          moreLabel={allTexts.moreLabel}
          showLabel={allTexts.showLabel}
          showAdditionalItems={showAdditionalItems}
        />
        <ShowLessButton showLessLabel={allTexts.showLessLabel} showDefaultItemsAmount={showDefaultItemsAmount} />
      </S.ShowButtonsWrapper>
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
      {showDivider && <S.Divider dashed footer />}
      <S.ContainerSpaceBetween data-testid="items-roll-footer">
        {itemsCount > maxToShowItems && buttonsConfiguration}
        {onClearAll && !searchMode && (
          <Popconfirm
            onConfirm={onClearAll}
            icon={<S.WarningIcon component={<WarningFillM />} />}
            cancelText={allTexts.popconfirmNoLabel}
            okText={allTexts.popconfirmYesLabel}
            title={allTexts.popconfirmTitleLabel}
          >
            <S.ClearButton type="custom-color-ghost" color="red" mode="icon-label">
              <Icon component={<CloseS />} size={22} />
              {allTexts.clearAllLabel}
            </S.ClearButton>
          </Popconfirm>
        )}
      </S.ContainerSpaceBetween>
    </>
  ) : null;
};

export default Footer;
